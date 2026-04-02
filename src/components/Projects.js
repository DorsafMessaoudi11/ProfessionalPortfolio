import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';

const projects = [
  {
    id: "01",
    title: "Algorithm Visualizer",
    subtitle: "Interactive Learning System",
    description:
      "A visual tool for exploring how classical algorithms evolve step by step.",
    longDesc:
      "This project was designed to make algorithm behavior observable rather than abstract. It provides real-time visualizations of search and sorting algorithms, allowing users to track state changes, decision points, and execution flow. The focus was on clarity — transforming algorithmic logic into something intuitive and interactive.",
    tags: ["React", "JavaScript", "Data Structures"],
    status: "Completed",
    insight:
      "Understanding an algorithm visually often reveals inefficiencies that are not obvious in code.",
    github: "https://github.com/DorsafMessaoudi11/algorithm-visualizer",
    year: "2026",
  },

  {
    id: "02",
    title: "Library Management System",
    subtitle: "Structured Data System",
    description:
      "A desktop application for managing books, users, and borrowing workflows.",
    longDesc:
      "This system models the internal structure of a library by organizing books, users, and transactions into a consistent and efficient workflow. It supports borrowing, returning, and inventory tracking while maintaining data integrity. The project emphasizes clean architecture and structured data handling using C++ and SQLite.",
    tags: ["C++", "SQLite", "wxWidgets"],
    status: "Completed",
    insight:
      "Well-structured data systems reduce complexity more effectively than adding new features.",
    github: "https://github.com/DorsafMessaoudi11/libraryManagementsystem",
    year: "2025",
  },

  {
    id: "03",
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Web Application",
    description:
      "A complete online store with product management, cart logic, and user interaction.",
    longDesc:
      "This project implements the core structure of an e-commerce system, including product browsing, cart management, and transactional logic. The focus was on building a seamless user flow while maintaining a clear separation between frontend interaction and backend logic. It reflects the complexity of real-world systems in a simplified but functional form.",
    tags: ["React", "PHP", "MySQL"],
    status: "Completed",
    insight:
      "User experience depends more on flow consistency than on visual complexity.",
    github: "https://github.com/DorsafMessaoudi11/Ecommercestore",
    year: "2025",
  },

  {
    id: "04",
    title: "Rendez-vous Manager",
    subtitle: "Scheduling System",
    description:
      "A system for organizing and managing appointments efficiently.",
    longDesc:
      "The Rendez-vous Manager focuses on structuring time as a resource. It allows users to create, manage, and track appointments while avoiding conflicts and overlaps. The system emphasizes simplicity in interaction while maintaining logical consistency in scheduling operations.",
    tags: ["JavaScript", "React"],
    status: "Completed",
    insight:
      "Time management systems fail when they ignore human behavior and unpredictability.",
    github: "https://github.com/DorsafMessaoudi11/rendez-vous",
    year: "2026",
  },

  {
    id: "05",
    title: "Sport League Scheduler",
    subtitle: "Constraint Optimization System",
    description:
      "A system that generates fair match schedules under multiple constraints.",
    longDesc:
      "This project tackles the complexity of scheduling in competitive environments. It generates match fixtures while respecting constraints such as fairness, home/away balance, and repetition avoidance. The system demonstrates how combinatorial problems can be structured and solved through algorithmic thinking.",
    tags: ["Python", "Algorithms", "Optimization"],
    status: "ongoing",
    insight:
      "Fairness in scheduling is not intuitive — it must be explicitly modeled.",
    github: "https://github.com/YourUsername/scheduler",
    year: "2026",
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
