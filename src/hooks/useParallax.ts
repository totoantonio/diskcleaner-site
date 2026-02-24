import { useEffect } from "react"

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const elements = document.querySelectorAll("[data-parallax]")

      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute("data-parallax") || "0")
        ;(el as HTMLElement).style.transform =
          `translateY(${scrolled * speed}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
}