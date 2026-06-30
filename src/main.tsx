import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"

const configurePlatformFonts = () => {
  const ua = navigator.userAgent || ""
  const platform = navigator.platform || ""
  const maxTouchPoints = navigator.maxTouchPoints || 0
  const isAppleDevice =
    /Mac|iPhone|iPad|iPod/i.test(platform) ||
    /iPhone|iPad|iPod|Macintosh/i.test(ua) ||
    (platform === "MacIntel" && maxTouchPoints > 1)

  document.documentElement.dataset.deviceFamily = isAppleDevice ? "apple" : "non-apple"

  if (isAppleDevice || document.querySelector("link[data-google-fonts='plus-jakarta']")) return

  const preconnectGoogle = document.createElement("link")
  preconnectGoogle.rel = "preconnect"
  preconnectGoogle.href = "https://fonts.googleapis.com"
  preconnectGoogle.dataset.googleFonts = "plus-jakarta"
  document.head.appendChild(preconnectGoogle)

  const preconnectStatic = document.createElement("link")
  preconnectStatic.rel = "preconnect"
  preconnectStatic.href = "https://fonts.gstatic.com"
  preconnectStatic.crossOrigin = ""
  preconnectStatic.dataset.googleFonts = "plus-jakarta"
  document.head.appendChild(preconnectStatic)

  const fontStylesheet = document.createElement("link")
  fontStylesheet.rel = "stylesheet"
  // Load a conservative set of weights to reduce payload: 400,600,700
  fontStylesheet.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
  fontStylesheet.dataset.googleFonts = "plus-jakarta"
  document.head.appendChild(fontStylesheet)
}

configurePlatformFonts()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
