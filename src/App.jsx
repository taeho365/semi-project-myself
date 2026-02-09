import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";

import Header from "./components/Header/Header";
import SlideBanner from "./components/SlideBanner/SlideBanner";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/footer";
import Login from './Login';
import InvitationMaker from "./components/InvitationMaker";

import Classic from "./pages/Classic";
import Modern from "./pages/Modern";
import Natural from "./pages/Natural";
import Romantic from "./pages/Romantic";
import Event from "./components/Event/Event";

import ScroolTopButton from "./ScroolTopButton";

export default function App() {

  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem('token');
  });

  return (
    <BrowserRouter>
      
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      
      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route path="/classic" element={<Classic />} />
        <Route path="/modern" element={<Modern />} />
        <Route path="/natural" element={<Natural />} />
        <Route path="/romantic" element={<Romantic />} />
        <Route path="/event" element={<Event />} />
        
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/invitation/maker" element={<InvitationMaker isLogin={isLogin} />} />
      
      </Routes>
      
      <ScroolTopButton />

      <Footer />
    </BrowserRouter>
  );
}

// Home 컴포넌트
function Home() {
  return (
    <>
      <SlideBanner />
      <Products />
    </>
  );
}

