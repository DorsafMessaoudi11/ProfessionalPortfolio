import React, { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const orbRef = useRef(null);

  useEffect(() => {
    let t = 0;
    let animId;
    const anim = () => {
      t += 0.008;
      if (orbRef.current) {
        const dx = Math.sin(t) * 18;
        const dy = Math.cos(t * 0.7) * 12;
        orbRef.current.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      }
      animId = requestAnimationFrame(anim);
    };
    anim();
    return () => cancelAnimationFrame(animId);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-orb-wrapper">
        <div ref={orbRef} className="hero-orb" />
        <div className="hero-orb-ring hero-orb-ring--1" />
        <div className="hero-orb-ring hero-orb-ring--2" />
        <div className="hero-orb-ring hero-orb-ring--3" />
      </div>

      <div className="hero-content">
        <div className="hero-label">
          <span className="hero-label-line" />
          <span className="hero-label-text">AI Engineering Student</span>
          <span className="hero-label-line" />
        </div>

        <h1 className="hero-name">
          <span className="hero-name-first">Dorsaf</span>
          <br />
          <span className="hero-name-last">Messaoudi</span>
        </h1>

        <p className="hero-tagline">
          I don't just build systems —<br />
          <em>I understand them, question them, and refine them.</em>
        </p>

        <div className="hero-philosophy">
          <p>Somewhere between logic and intuition, structure and flow,<br />
          lives the kind of thinking that makes systems feel alive.</p>
        </div>

        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToProjects} data-hover>
            <span>Explore My Work</span>
            <span className="btn-arrow">→</span>
          </button>
          <a href="#contact" className="btn-ghost" data-hover>
            Let's Connect
          </a>
        </div>

        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-num">04</span>
            <span className="hero-meta-label">Projects</span>
          </div>
          <div className="hero-meta-divider" />
          <div className="hero-meta-item">
            <span className="hero-meta-num">3+</span>
            <span className="hero-meta-label">Frameworks</span>
          </div>
          <div className="hero-meta-divider" />
          <div className="hero-meta-item">
            <span className="hero-meta-num">∞</span>
            <span className="hero-meta-label">Curiosity</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-text">scroll</span>
      </div>

      <div className="hero-corner hero-corner--tl">
        <span>37.2431° N</span>
      </div>
      <div className="hero-corner hero-corner--tr">
        <span>9.8738° E</span>
      </div>
    </section>
  );
}
