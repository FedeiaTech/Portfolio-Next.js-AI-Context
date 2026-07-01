import { useRef } from "react"

// Magnetic pull: the element drifts toward the cursor while hovered, then eases
// back on leave. Transform is written directly through a ref (no re-renders).
// strength 0..1 = how far it follows relative to cursor distance from center.
export function useMagnetic(strength = 0.4) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return { ref, onMouseMove, onMouseLeave }
}
