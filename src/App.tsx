import { Suspense, lazy, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"

const Blog = lazy(() => import("./pages/Blog"))
const Article = lazy(() => import("./pages/Article"))
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"))
const TermsOfService = lazy(() => import("./pages/TermsOfService"))
const Help = lazy(() => import("./pages/Help"))
const About = lazy(() => import("./pages/About"))
const Trust = lazy(() => import("./pages/Trust"))
const Security = lazy(() => import("./pages/Security"))
const Changelog = lazy(() => import("./pages/Changelog"))
const EditorialPolicy = lazy(() => import("./pages/EditorialPolicy"))
const DiskCleanProAlternative = lazy(() => import("./pages/DiskCleanProAlternative"))

function WallRedirect() {
  useEffect(() => {
    window.location.replace("/#community")
  }, [])

  return null
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wall" element={<WallRedirect />} />
        <Route element={<Layout />}>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
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
  )
}
