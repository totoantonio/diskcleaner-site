import { Suspense, lazy } from "react"
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
const EditorialPolicy = lazy(() => import("./pages/EditorialPolicy"))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
