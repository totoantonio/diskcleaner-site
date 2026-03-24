import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Trust from "./pages/Trust"
import EditorialPolicy from "./pages/EditorialPolicy"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsOfService from "./pages/TermsOfService"
import Help from "./pages/Help"

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Suspense fallback="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/help" element={<Help />} />
          </Route>
        </Routes>
      </Suspense>
    </StaticRouter>
  )
}
