"use client"

import { Suspense, useEffect, useLayoutEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useAnimations, useGLTF } from "@react-three/drei"
import * as THREE from "three"

const MODEL_PATH = "/models/fede.glb"

// Cuánto puede girar la cabeza hacia el cursor (radianes).
// Yaw asimétrico: el cuerpo está ~45° de perfil hacia la derecha del personaje,
// así que damos MÁS recorrido hacia su izquierda (mouse a la derecha de pantalla).
const YAW_RANGE_RIGHT = 0.5 // mouse a la izquierda de la pantalla (x < 0)
const YAW_RANGE_LEFT = 0.95 // mouse a la derecha de la pantalla (x >= 0)
const PITCH_RANGE = 0.32 // arriba-abajo (desktop)
const PITCH_DOWN_TOUCH = 0.55 // en mobile, mira más abajo al tocar (no afecta desktop)
// Suavizado del seguimiento: más bajo = más suave y fluido (evita lo nervioso/robótico)
const SMOOTHING = 0.055
// El cuello acompaña a la cabeza a una fracción, para una cadena natural
const NECK_FACTOR = 0.4
// Reacción al click sobre el avatar: un asentimiento CORTO y sutil que se suma
// al seguimiento del mouse y decae solo (no reemplaza la pose, la modula).
const REACTION_DURATION = 0.3 // segundos que dura el asentimiento (corto)
const REACTION_NOD = 0.2 // amplitud del asentimiento al click (radianes, sutil)
// Reacción al apagar el Live Mode: cabecea leve hacia abajo antes de deprimirse.
const REACTION_SLEEP = 0.2 // amplitud al salir de live (positivo = cabeza abajo)
// Pose "deprimida" cuando el Live Mode está apagado: la cabeza cuelga y deja de seguir el mouse
const DROOP_PITCH = 0.42 // cuánto baja la cabeza (radianes)
const DROOP_YAW = 0.12 // leve giro hacia un lado, como cabizbajo
// Secuencia de despertar al ENCENDER el Live Mode (3 fases encadenadas):
// 1) recomponerse mirando al frente, 2) sacudida espabilándose, 3) seguir al cursor.
const WAKE_RECOMPOSE = 1.2 // s: sube del droop y mira al frente (lento, deliberado)
const WAKE_LIFT_SMOOTHING = 0.02 // slerp lento al levantar la cabeza (más bajo = más lento)
const WAKE_SHAKE = 0.85 // s: dura la sacudida
const WAKE_SHAKE_FREQ = 12 // rad/s de la oscilación (menos = sacudidas más lentas)
const WAKE_SHAKE_AMP = 0.55 // amplitud de la sacudida en yaw (radianes)
const WAKE_SHAKE_SMOOTHING = 0.28 // slerp de la sacudida (ágil pero no brusco)

// Encuadre de cámara y posición del modelo (ajustables a ojo)
const CAMERA = { position: [0, 0, 1.2], fov: 28 }
const MODEL_Y = -1.58 // baja el cuerpo para centrar la cabeza en el origen

function AvatarModel({ isLive, onReady }) {
  const group = useRef(null)
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { actions } = useAnimations(animations, group)

  // Huesos a controlar y sus rotaciones de reposo (pose neutra)
  const head = useRef(null)
  const neck = useRef(null)
  const headRest = useRef(new THREE.Quaternion())
  const neckRest = useRef(new THREE.Quaternion())
  // Rotación persistente que acumula el giro frame a frame (nuestro estado real,
  // independiente de lo que el mixer escriba en el hueso)
  const headCurrent = useRef(new THREE.Quaternion())
  const neckCurrent = useRef(new THREE.Quaternion())

  // Objetos reutilizados por frame para no generar basura en el GC
  const targetQuat = useRef(new THREE.Quaternion())
  const tmpEuler = useRef(new THREE.Euler(0, 0, 0, "XYZ"))
  const tmpQuat = useRef(new THREE.Quaternion())

  // Posición del mouse normalizada a -1..1 sobre TODA la ventana
  const mouse = useRef({ x: 0, y: 0 })
  // Dispositivo táctil: para dar más recorrido hacia abajo sin tocar desktop
  const isTouch = useRef(false)
  // Reacción (click o apagado): tiempo actual, inicio y amplitud del movimiento
  const elapsed = useRef(0)
  const reactionStart = useRef(-1)
  const reactionAmp = useRef(REACTION_NOD)
  // Secuencia de despertar al encender el Live Mode (-1 = no está despertando)
  const wakeStart = useRef(-1)

  // Localiza los huesos y guarda su pose de reposo antes de animar
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.name === "Head") head.current = obj
      if (obj.name === "Neck") neck.current = obj
    })
    if (head.current) {
      headRest.current.copy(head.current.quaternion)
      headCurrent.current.copy(head.current.quaternion)
    }
    if (neck.current) {
      neckRest.current.copy(neck.current.quaternion)
      neckCurrent.current.copy(neck.current.quaternion)
    }
    onReady?.()
  }, [scene, onReady])

  // Reproduce la animación idle (respiración/balanceo del cuerpo).
  // La cabeza la pisamos cada frame, así que su canal de la animación se ignora.
  useEffect(() => {
    const idle = Object.values(actions)[0]
    if (idle) idle.reset().fadeIn(0.4).play()
    return () => {
      if (idle) idle.fadeOut(0.2)
    }
  }, [actions])

  // Seguimiento global del mouse, no solo sobre el canvas
  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  // Live Mode: encender lanza la secuencia de despertar; apagar cabecea y deprime.
  // Se salta el montaje inicial comparando contra el valor previo.
  const isLiveRef = useRef(isLive)
  const prevLive = useRef(isLive)
  useEffect(() => {
    isLiveRef.current = isLive
    if (prevLive.current !== isLive) {
      if (isLive) {
        // Encender: arranca la secuencia de despertar (frente → sacudida → cursor)
        wakeStart.current = elapsed.current
      } else {
        // Apagar: cancela un despertar en curso y cabecea antes de deprimirse
        wakeStart.current = -1
        reactionAmp.current = REACTION_SLEEP
        reactionStart.current = elapsed.current
      }
      prevLive.current = isLive
    }
  }, [isLive])

  // Corre DESPUÉS del mixer de animación (registrado antes por useAnimations),
  // así sobreescribimos la rotación de la cabeza con el objetivo del mouse.
  useFrame((state) => {
    elapsed.current = state.clock.elapsedTime
    const { x, y } = mouse.current
    // Más recorrido cuando gira hacia su izquierda (compensa el cuerpo de perfil)
    const yawRange = x >= 0 ? YAW_RANGE_LEFT : YAW_RANGE_RIGHT
    // Solo en mobile: más recorrido hacia abajo (y >= 0). Desktop intacto.
    const pitchDown = isTouch.current ? PITCH_DOWN_TOUCH : PITCH_RANGE
    const pitch = y >= 0 ? y * pitchDown : y * PITCH_RANGE

    // Objetivo de la cabeza según el estado. El slerp de abajo suaviza todo.
    // El smoothing cambia por fase: lento al levantar, ágil en la sacudida.
    let targetPitch
    let targetYaw
    let smoothing = SMOOTHING
    if (!isLiveRef.current) {
      // Apagado: cabeza cabizbaja, no sigue el mouse.
      targetPitch = DROOP_PITCH
      targetYaw = DROOP_YAW
    } else if (wakeStart.current >= 0) {
      // Encendido, despertando: secuencia de 3 fases antes de seguir el cursor.
      const wt = elapsed.current - wakeStart.current
      if (wt < WAKE_RECOMPOSE) {
        // Fase 1: recomponerse mirando al frente, lento y deliberado
        targetPitch = 0
        targetYaw = 0
        smoothing = WAKE_LIFT_SMOOTHING
      } else if (wt < WAKE_RECOMPOSE + WAKE_SHAKE) {
        // Fase 2: sacudida espabilándose (oscilación en yaw que se amortigua)
        const st = wt - WAKE_RECOMPOSE
        const decay = 1 - st / WAKE_SHAKE
        targetPitch = 0
        targetYaw = Math.sin(st * WAKE_SHAKE_FREQ) * WAKE_SHAKE_AMP * decay
        smoothing = WAKE_SHAKE_SMOOTHING
      } else {
        // Fase 3: despertar terminado → activar seguimiento del cursor
        wakeStart.current = -1
        targetPitch = pitch
        targetYaw = x * yawRange
      }
    } else {
      // Encendido y despierto: sigue el mouse.
      targetPitch = pitch
      targetYaw = x * yawRange
    }

    // Reacción (click o apagado): arco suave sin(0..PI) que decae solo.
    let nod = 0
    if (reactionStart.current >= 0) {
      const t = elapsed.current - reactionStart.current
      if (t <= REACTION_DURATION) {
        nod = Math.sin((t / REACTION_DURATION) * Math.PI) * reactionAmp.current
      } else {
        reactionStart.current = -1
      }
    }


    if (head.current) {
      tmpEuler.current.set(targetPitch + nod, targetYaw, 0)
      tmpQuat.current.setFromEuler(tmpEuler.current)
      targetQuat.current.copy(headRest.current).multiply(tmpQuat.current)
      // Acumulamos en nuestro quaternion y pisamos del todo lo que dejó el mixer
      headCurrent.current.slerp(targetQuat.current, smoothing)
      head.current.quaternion.copy(headCurrent.current)
    }

    if (neck.current) {
      tmpEuler.current.set(
        targetPitch * NECK_FACTOR + nod * NECK_FACTOR,
        targetYaw * NECK_FACTOR,
        0
      )
      tmpQuat.current.setFromEuler(tmpEuler.current)
      targetQuat.current.copy(neckRest.current).multiply(tmpQuat.current)
      neckCurrent.current.slerp(targetQuat.current, smoothing)
      neck.current.quaternion.copy(neckCurrent.current)
    }
  })

  // Click sobre el mesh (R3F hace raycast real: solo cuenta si pegás al avatar)
  const handleClick = (e) => {
    e.stopPropagation()
    reactionAmp.current = REACTION_NOD
    reactionStart.current = elapsed.current
  }
  const setHover = (hovered) => {
    document.body.style.cursor = hovered ? "pointer" : ""
  }

  return (
    <primitive
      ref={group}
      object={scene}
      position={[0, MODEL_Y, 0]}
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    />
  )
}

export default function HeroAvatar3D({ isLive, onReady }) {
  return (
    <Canvas
      camera={CAMERA}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[1, 2, 3]} intensity={isLive ? 1.6 : 0.9} />
      <directionalLight position={[-2, 0, 1]} intensity={0.4} />
      {/* Realce esmeralda que "energiza" al avatar cuando el Live Mode está activo */}
      <directionalLight position={[0, 1, 2]} color="#10b981" intensity={isLive ? 0.7 : 0} />
      <Suspense fallback={null}>
        <AvatarModel isLive={isLive} onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}

// Precarga el modelo para que esté listo cuando se monte el canvas
useGLTF.preload(MODEL_PATH)
