import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Menu from './components/Menu.jsx'
import Profile from './components/Profile.jsx'
import Search from "./components/Search.jsx";

function App() {
  return (
    <>
      <Router>
            <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
            </Routes>
            {/* background */}
            <div className="absolute inset-0 -z-10 min-h-screen w-full bg-[#ECE8D9] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <Menu />

            {/* home icon, just click the N in the top right corner to return to homepage*/}
            <a href="/" className="absolute top-4 left-4 p-2 text-[#494949] text-2xl font-[Stretch]">N .</a>

            {/* my name! and link to my website */}
            <p className="absolute bottom-2 left-2 p-2 text-[#494949] text-sm">
              made by <a href="https://meicib.vercel.app/" className="hover:bg-[#494949] hover:text-[#FFFDF6] transition duration-200">meicib</a>
            </p>
        </Router>
    </>
  )
}

export default App
