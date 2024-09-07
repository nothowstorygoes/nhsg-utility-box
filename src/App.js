import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JSON from "./components/pages/json";
import Manifest from "./components/pages/manifest";
import PNGtoICO from "./components/pages/pngtoico";
import LandingPage from "./components/pages/landing";

export default function App() {  
    
      return (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/JSON" element={<JSON />} />
            <Route path="/Manifest" element={<Manifest />} />
            <Route path="/PNGtoICO" element={<PNGtoICO />} />
          </Routes>
        </Router>
      );
    }