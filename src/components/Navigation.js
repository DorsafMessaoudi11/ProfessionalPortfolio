import React, { useEffect, useState } from 'react';
import './Navigation.css';

const links = ['about', 'projects', 'contact'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = links.map(id => document.getElementById(id));
      const found = sections.find(s => {
        if (!s) return false;
        const rect = s.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });
      setActive(found ? found.id : '');
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="nav-logo-symbol">◈</span>
        <span className="nav-logo-text">DM</span>
      </div>
      <ul className="nav-links">
        {links.map(link => (
          <li key={link}>
            <button
              className={`nav-link ${active === link ? 'nav-link--active' : ''}`}
              onClick={() => scrollTo(link)}
              data-hover
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
      <div className="nav-status">
        <span className="status-dot" />
        <span className="status-text">Available for work</span>
      </div>
    </nav>
  );
}
