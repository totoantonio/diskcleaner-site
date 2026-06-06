import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import About from "./pages/About"
import DiskCleanProAlternative from "./pages/DiskCleanProAlternative"
import Trust from "./pages/Trust"
import Security from "./pages/Security"
import Changelog from "./pages/Changelog"
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
            <Route path="/disk-clean-pro-alternative" element={<DiskCleanProAlternative />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/security" element={<Security />} />
            <Route path="/changelog" element={<Changelog />} />
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
