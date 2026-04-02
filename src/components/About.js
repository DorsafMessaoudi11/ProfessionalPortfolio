import React, { useEffect, useRef } from 'react';
import './About.css';

const traits = [
  { symbol: '◯', label: 'Systems Thinker', desc: 'I see the whole before the parts. Every component exists in relation to something larger.' },
  { symbol: '△', label: 'Pattern Seeker', desc: 'Complexity reveals its structure to those patient enough to observe without imposing order.' },
  { symbol: '◇', label: 'Careful Builder', desc: 'I write code the way I think: deliberately, with consideration for what comes after.' },
  { symbol: '□', label: 'Quiet Learner', desc: 'The most important questions are the ones I haven\'t asked yet. I stay curious by design.' },
];

const skills = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'C++', 'SQL','PHP','java'] },
  { category: 'AI / ML', items: ['PyTorch', 'TensorFlow'] },
  { category: 'Web', items: ['React', 'Node.js'] },
  { category: 'Tools', items: ['Git', 'Linux', 'Jupyter'] },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="section-divider">
        <span className="divider-line" />
        <span className="divider-symbol">◈</span>
        <span className="divider-line" />
      </div>

      <div className="about-container">
        <div className="about-header" data-reveal>
          <p className="section-label">01 — Philosophy</p>
          <h2 className="section-title">A mind that <em>thinks</em><br />before it builds</h2>
        </div>

        <div className="about-grid">
          <div className="about-text" data-reveal>
            <p className="about-para">
              I study artificial intelligence not as a toolkit, but as a lens — a way of understanding
              how intelligence itself works, fails, and grows. Every model I build starts with a question,
              not a dataset.
            </p>
            <p className="about-para">
              My background sits at the intersection of mathematical structure and human intuition.
              I find myself drawn to the moments where a system behaves unexpectedly — because that's
              where the real understanding begins.
            </p>
            <p className="about-para">
              I believe great engineering is fundamentally an act of empathy: understanding the problem
              deeply enough that the solution becomes obvious, then having the discipline to keep it simple.
            </p>

            <div className="about-quote">
              <span className="quote-mark">"</span>
              <p>The goal is not to eliminate uncertainty, but to<br />navigate it with precision and grace.</p>
            </div>
          </div>

          <div className="about-traits" data-reveal>
            {traits.map((t, i) => (
              <div key={i} className="trait-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="trait-symbol">{t.symbol}</div>
                <div className="trait-content">
                  <h4 className="trait-label">{t.label}</h4>
                  <p className="trait-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-section" data-reveal>
          <p className="skills-title">Technical Vocabulary</p>
          <div className="skills-grid">
            {skills.map((group, i) => (
              <div key={i} className="skill-group">
                <p className="skill-category">{group.category}</p>
                <div className="skill-tags">
                  {group.items.map((item, j) => (
                    <span key={j} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
