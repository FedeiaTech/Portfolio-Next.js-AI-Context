import { useRef } from "react"

// 3D tilt on mouse move. Mutates the element transform directly through a ref
// (no state, no re-renders) so the follow stays smooth. Reset on leave lets the
// element's own CSS transition ease it back to rest.
export function useTilt(max = 6) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return { ref, onMouseMove, onMouseLeave }
}
