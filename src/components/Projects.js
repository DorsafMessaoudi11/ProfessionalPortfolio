import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';

const projects = [
  {
    id: '01',
    title: 'NeuralLens',
    subtitle: 'Interpretability Framework',
    description: 'A visualization toolkit for understanding what neural networks have actually learned — not what we hoped they\'d learn.',
    longDesc: 'NeuralLens emerged from a fundamental question: when a model makes a decision, can we trace exactly why? This project builds a layer-by-layer interpretability framework that extracts and visualizes attention patterns, feature activations, and gradient flows in transformer-based models. The goal was not just explanation, but actionable understanding.',
    tags: ['PyTorch', 'Python', 'D3.js', 'Transformers'],
    status: 'Research',
    insight: 'Discovered that 68% of spurious correlations in test data were traceable to 3 attention heads.',
    github: 'https://github.com',
    year: '2024',
  },
  {
    id: '02',
    title: 'Mosaic',
    subtitle: 'Adaptive Learning System',
    description: 'An intelligent curriculum engine that adapts in real-time to a student\'s knowledge gaps, not their performance scores.',
    longDesc: 'Traditional adaptive learning systems optimize for performance metrics. Mosaic takes a different approach: it models the latent structure of knowledge itself, identifying not just what a student got wrong, but the underlying conceptual gap that caused the error. Built on a knowledge graph with Bayesian inference for belief updating.',
    tags: ['Python', 'Neo4j', 'FastAPI', 'React', 'Bayesian Networks'],
    status: 'Production',
    insight: 'A student\'s next optimal concept is rarely adjacent to their last failure.',
    github: 'https://github.com',
    year: '2024',
  },
  {
    id: '03',
    title: 'Veritas',
    subtitle: 'Claim Verification Engine',
    description: 'A multi-source reasoning system that evaluates factual claims by constructing evidence graphs, not just retrieving matching sentences.',
    longDesc: 'Veritas treats fact-checking as a reasoning problem, not a retrieval problem. Given a claim, the system constructs a structured evidence graph from multiple sources, then applies logical inference to determine consistency. It outputs not just a verdict, but a traceable reasoning path that a human can audit.',
    tags: ['Python', 'spaCy', 'LangChain', 'Neo4j', 'GPT-4'],
    status: 'In Progress',
    insight: 'The most misleading claims are technically true — their falsehood lives in what they omit.',
    github: 'https://github.com',
    year: '2025',
  },
  {
    id: '04',
    title: 'Strata',
    subtitle: 'Multi-Agent Reasoning',
    description: 'An experimental architecture where specialized AI agents debate and refine answers through structured adversarial dialogue.',
    longDesc: 'Strata explores whether disagreement between specialized agents produces more reliable outputs than consensus. A proposer agent generates an answer; a critic agent constructs targeted counterarguments; a synthesis agent weighs both and produces a final response. The architecture is inspired by academic peer review and Hegelian dialectics.',
    tags: ['Python', 'OpenAI API', 'LangGraph', 'FastAPI', 'WebSockets'],
    status: 'Experimental',
    insight: 'Productive disagreement requires more structural constraint, not less.',
    github: 'https://github.com',
    year: '2025',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeModal !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal]);

  const statusColor = (status) => {
    if (status === 'Production') return '#6dbd7b';
    if (status === 'Research') return '#7ab3d4';
    if (status === 'In Progress') return '#d4b87a';
    return '#8a6a5a';
  };

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="section-divider">
        <span className="divider-line" />
        <span className="divider-symbol">◈</span>
        <span className="divider-line" />
      </div>

      <div className="projects-container">
        <div className="projects-header" data-reveal>
          <p className="section-label">02 — Work</p>
          <h2 className="section-title">Ideas made <em>concrete</em></h2>
          <p className="projects-sub">Each project begins with a question worth asking.</p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="project-card"
              data-reveal
              style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={() => setActiveModal(p)}
              data-hover
            >
              <div className="card-header">
                <span className="card-id">{p.id}</span>
                <span className="card-status" style={{ color: statusColor(p.status) }}>
                  <span className="status-pip" style={{ background: statusColor(p.status) }} />
                  {p.status}
                </span>
              </div>

              <h3 className="card-title">{p.title}</h3>
              <p className="card-subtitle">{p.subtitle}</p>
              <p className="card-desc">{p.description}</p>

              <div className="card-tags">
                {p.tags.slice(0, 3).map((tag, j) => (
                  <span key={j} className="card-tag">{tag}</span>
                ))}
                {p.tags.length > 3 && <span className="card-tag card-tag--more">+{p.tags.length - 3}</span>}
              </div>

              <div className="card-footer">
                <span className="card-year">{p.year}</span>
                <span className="card-cta">Open case file →</span>
              </div>

              <div className="card-glow" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-id-block">
                <span className="modal-id">{activeModal.id}</span>
                <span className="modal-status" style={{ color: statusColor(activeModal.status) }}>
                  <span className="status-pip" style={{ background: statusColor(activeModal.status) }} />
                  {activeModal.status}
                </span>
              </div>
              <button className="modal-close" onClick={() => setActiveModal(null)} data-hover>✕</button>
            </div>

            <div className="modal-body">
              <h2 className="modal-title">{activeModal.title}</h2>
              <p className="modal-subtitle">{activeModal.subtitle}</p>

              <div className="modal-divider" />

              <div className="modal-section">
                <p className="modal-section-label">Overview</p>
                <p className="modal-text">{activeModal.longDesc}</p>
              </div>

              <div className="modal-insight">
                <span className="insight-icon">◉</span>
                <div>
                  <p className="insight-label">Key Insight</p>
                  <p className="insight-text">"{activeModal.insight}"</p>
                </div>
              </div>

              <div className="modal-section">
                <p className="modal-section-label">Technologies</p>
                <div className="modal-tags">
                  {activeModal.tags.map((tag, i) => (
                    <span key={i} className="card-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <a href={activeModal.github} target="_blank" rel="noreferrer" className="btn-primary" data-hover>
                  <span>View on GitHub</span>
                  <span className="btn-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
