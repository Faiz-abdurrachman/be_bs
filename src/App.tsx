import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Dashboard } from "./pages/Dashboard"

function Landing() {
  return (
    <div className="w-full bg-[#0A3FFF] min-h-screen selection:bg-white/20 selection:text-white">
      <Navbar />
      <Hero />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
