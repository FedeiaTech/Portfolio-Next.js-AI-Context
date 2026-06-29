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
// Suavizado del seguimiento: más bajo = más suave y lento (evita lo robótico)
const SMOOTHING = 0.1
// El cuello acompaña a la cabeza a una fracción, para una cadena natural
const NECK_FACTOR = 0.4

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

  // Corre DESPUÉS del mixer de animación (registrado antes por useAnimations),
  // así sobreescribimos la rotación de la cabeza con el objetivo del mouse.
  useFrame(() => {
    const { x, y } = mouse.current
    // Más recorrido cuando gira hacia su izquierda (compensa el cuerpo de perfil)
    const yawRange = x >= 0 ? YAW_RANGE_LEFT : YAW_RANGE_RIGHT
    // Solo en mobile: más recorrido hacia abajo (y >= 0). Desktop intacto.
    const pitchDown = isTouch.current ? PITCH_DOWN_TOUCH : PITCH_RANGE
    const pitch = y >= 0 ? y * pitchDown : y * PITCH_RANGE

    if (head.current) {
      tmpEuler.current.set(pitch, x * yawRange, 0)
      tmpQuat.current.setFromEuler(tmpEuler.current)
      targetQuat.current.copy(headRest.current).multiply(tmpQuat.current)
      // Acumulamos en nuestro quaternion y pisamos del todo lo que dejó el mixer
      headCurrent.current.slerp(targetQuat.current, SMOOTHING)
      head.current.quaternion.copy(headCurrent.current)
    }

    if (neck.current) {
      tmpEuler.current.set(
        pitch * NECK_FACTOR,
        x * yawRange * NECK_FACTOR,
        0
      )
      tmpQuat.current.setFromEuler(tmpEuler.current)
      targetQuat.current.copy(neckRest.current).multiply(tmpQuat.current)
      neckCurrent.current.slerp(targetQuat.current, SMOOTHING)
      neck.current.quaternion.copy(neckCurrent.current)
    }
  })

  return <primitive ref={group} object={scene} position={[0, MODEL_Y, 0]} />
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
      <Suspense fallback={null}>
        <AvatarModel isLive={isLive} onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}

// Precarga el modelo para que esté listo cuando se monte el canvas
useGLTF.preload(MODEL_PATH)
