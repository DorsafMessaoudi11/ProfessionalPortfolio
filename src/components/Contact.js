import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('lina.bensalem@email.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socials = [
    { label: 'GitHub', handle: '@lina-bensalem', href: 'https://github.com', symbol: '⌥' },
    { label: 'LinkedIn', handle: 'lina-bensalem', href: 'https://linkedin.com', symbol: '◫' },
    { label: 'Twitter', handle: '@lina_thinks', href: 'https://twitter.com', symbol: '◉' },
  ];

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="section-divider">
        <span className="divider-line" />
        <span className="divider-symbol">◈</span>
        <span className="divider-line" />
      </div>

      <div className="contact-container">
        <div className="contact-header" data-reveal>
          <p className="section-label">03 — Contact</p>
          <h2 className="section-title">Let's think<br /><em>together</em></h2>
        </div>

        <div className="contact-grid">
          <div className="contact-text" data-reveal>
            <p className="contact-intro">
              I'm drawn to problems that sit at the edge of what's currently understood —
              where the next step isn't obvious and the answer hasn't been written down yet.
            </p>
            <p className="contact-intro">
              Whether it's a research collaboration, an internship, or simply an interesting
              conversation about AI, I'm open to it. Reach out thoughtfully, and I'll respond
              in kind.
            </p>

            <div className="contact-availability">
              <span className="status-dot" />
              <span>Available for internships and research collaborations — Summer 2025</span>
            </div>
          </div>

          <div className="contact-actions" data-reveal>
            <div className="email-card" onClick={copyEmail} data-hover>
              <div className="email-label">
                <span className="email-icon">✉</span>
                <span>Email</span>
              </div>
              <p className="email-address">lina.bensalem@email.com</p>
              <span className="email-copy">{copied ? '✓ Copied' : 'Click to copy'}</span>
            </div>

            <div className="socials-grid">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-card"
                  data-hover
                >
                  <span className="social-symbol">{s.symbol}</span>
                  <div>
                    <p className="social-label">{s.label}</p>
                    <p className="social-handle">{s.handle}</p>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" data-reveal>
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-symbol">◈</span>
            <span className="footer-name">Lina Bensalem</span>
          </div>
          <p className="footer-copy">
            Designed & built with intention · {new Date().getFullYear()}
          </p>
          <p className="footer-credit">
            A thinking space, not a resume.
          </p>
        </div>
      </footer>
    </section>
  );
}
