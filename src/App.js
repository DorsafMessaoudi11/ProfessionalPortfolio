import React, { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';
import Navigation from './components/Navigation';
import './App.css';

export default function App() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let glowX = 0, glowY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }
      if (glowRef.current) {
        glowRef.current.style.left = glowX + 'px';
        glowRef.current.style.top = glowY + 'px';
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    const raf = requestAnimationFrame(animate);

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="app">
      <div className="noise-overlay" />
      <Background />

      {/* Custom Cursor */}
      <div className="cursor">
        <div ref={glowRef} className="cursor cursor-glow" style={{ position: 'fixed' }} />
        <div ref={ringRef} className="cursor cursor-ring" style={{ position: 'fixed', ...(isHovering ? { width: '48px', height: '48px', borderColor: 'rgba(230,211,179,0.6)' } : {}) }} />
        <div ref={dotRef} className="cursor cursor-dot" style={{ position: 'fixed' }} />
      </div>

      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
