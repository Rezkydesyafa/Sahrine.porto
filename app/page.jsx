"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./portfolio.css";
import {
  PROFILE_DATA,
  ORGANIZATIONAL_EXPERIENCE,
  EDUCATION_DATA,
  SKILLS_DATA,
  PROJECTS_DATA,
  CERTIFICATIONS_DATA,
} from "./data/portfolioData";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: "", email: "", message: "" });

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${emailForm.name || "Pengunjung Website"}`);
    const body = encodeURIComponent(
      `Nama: ${emailForm.name}\nEmail: ${emailForm.email}\n\nPesan:\n${emailForm.message}`
    );
    window.location.href = `mailto:${PROFILE_DATA.email}?subject=${subject}&body=${body}`;
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className={`site-shell ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="top-pattern" aria-hidden="true" />

      <div className="page-wrap">
        <main>
          {/* HERO SECTION */}
          <section className="hero" id="home">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 variants={itemVariant}>{PROFILE_DATA.title}</motion.h1>
              <motion.p variants={itemVariant}>{PROFILE_DATA.tagline}</motion.p>
            </motion.div>

            <motion.div
              className="avatar has-photo"
              aria-label={PROFILE_DATA.name}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <img
                src={PROFILE_DATA.avatarSrc}
                alt={PROFILE_DATA.name}
              />
            </motion.div>
          </section>

          {/* ABOUT SECTION */}
          <motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="section-stack compact">
              <h2>About</h2>
              <p className="about-copy">{PROFILE_DATA.about}</p>
            </div>
          </motion.section>

          {/* ORGANIZATIONAL EXPERIENCE SECTION */}
          <motion.section
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="section-stack">
              <h2>Organizational Experience</h2>
              <motion.div className="resume-list" variants={staggerContainer}>
                {ORGANIZATIONAL_EXPERIENCE.map((exp) => (
                  <motion.article
                    key={exp.id}
                    className="resume-item no-logo"
                    variants={itemVariant}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  >
                    <div className="resume-copy">
                      <h3>{exp.organization}</h3>
                      <p>{exp.role}</p>
                    </div>
                    <time>{exp.date}</time>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* EDUCATION SECTION WITH IMAGE LOGOS */}
          <motion.section
            id="education"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="section-stack">
              <h2>Education</h2>
              <motion.div className="resume-list education-list" variants={staggerContainer}>
                {EDUCATION_DATA.map((edu) => (
                  <motion.article
                    key={edu.id}
                    className="resume-item"
                    variants={itemVariant}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="resume-logo custom-logo"
                      whileHover={{ scale: 1.15, rotate: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img src={edu.logoSrc} alt={edu.institution} />
                    </motion.div>
                    <div className="resume-copy">
                      <h3>{edu.institution}</h3>
                      <p>{edu.degree}</p>
                    </div>
                    <time>{edu.period}</time>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* SKILLS SECTION */}
          <motion.section
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="section-stack compact">
              <h2>Skills</h2>
              <motion.div
                className="chips"
                aria-label="Technical and professional skills"
                variants={staggerContainer}
              >
                {SKILLS_DATA.map((skill) => (
                  <motion.span
                    key={skill.name}
                    className="skill"
                    variants={itemVariant}
                    whileHover={{
                      scale: 1.1,
                      y: -3,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className={`skill-logo ${skill.category}`}>
                      <RenderSkillIcon skillName={skill.name} />
                    </span>
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* PROJECTS SECTION */}
          <motion.section
            className="showcase"
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="showcase-heading">
              <div className="eyebrow-rule">
                <i />
                <span>My Projects</span>
                <i />
              </div>
              <h2>Selected project experience</h2>
              <p>
                Proyek akademik dan kompetisi yang memadukan data, desain,
                pengembangan web, AI, dan koordinasi tim.
              </p>
            </div>

            <motion.div className="project-grid" variants={staggerContainer}>
              {PROJECTS_DATA.map((project) => (
                <motion.article
                  key={project.id}
                  className={`project-card ${project.wide ? "project-card-wide" : ""}`}
                  variants={itemVariant}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`project-cover ${project.coverClass}`}>
                    <RenderProjectGraphic projectId={project.id} />
                    <span className="media-badge">{project.badge}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-title-row">
                      <div>
                        <h3>{project.title}</h3>
                        <time>{project.period}</time>
                      </div>
                      <span className="project-arrow" aria-hidden="true">↗</span>
                    </div>
                    <p>{project.description}</p>
                    <div className="tech-list">
                      {project.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          {/* CERTIFICATIONS & ACHIEVEMENTS SECTION */}
          <motion.section
            className="showcase timeline-section"
            id="achievements"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="showcase-heading">
              <div className="eyebrow-rule">
                <i />
                <span>Programs</span>
                <i />
              </div>
              <h2>Certifications &amp; achievements</h2>
              <p>
                Program pembelajaran dan pencapaian yang memperkuat fondasi data,
                AI, pemrograman, serta inovasi digital.
              </p>
            </div>

            <motion.div className="timeline" variants={staggerContainer}>
              {CERTIFICATIONS_DATA.map((cert) => (
                <motion.article
                  key={cert.id}
                  className="timeline-item"
                  variants={itemVariant}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="timeline-dot"
                    whileHover={{ scale: 1.4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <time>{cert.year}</time>
                  <h3>{cert.title}</h3>
                  <p className="timeline-place">{cert.place}</p>
                  <p>{cert.description}</p>
                  <div className="timeline-links">
                    {cert.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          {/* CONTACT SECTION */}
          <motion.section
            className="contact"
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="eyebrow-rule">
              <i />
              <span>Contact</span>
              <i />
            </div>
            <h2>Get in Touch</h2>
            <p>
              Tertarik berdiskusi tentang data, AI, atau pengembangan produk?{" "}
              <a href={`mailto:${PROFILE_DATA.email}`}>Kirim email kepada saya</a>{" "}
              atau terhubung melalui{" "}
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </motion.section>
        </main>
      </div>

      {/* FLOATING DOCK NAVIGATION */}
      <motion.nav
        className="dock"
        aria-label="Primary navigation"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.a
          href="#home"
          aria-label="Home"
          whileHover={{ scale: 1.25, y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10.8 12 3l9 7.8V21h-6v-7H9v7H3Z" />
          </svg>
        </motion.a>
        <motion.a
          href="#projects"
          aria-label="Projects"
          whileHover={{ scale: 1.25, y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        </motion.a>
        <span className="dock-divider" aria-hidden="true" />
        <motion.a
          href={PROFILE_DATA.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.25, y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M8 10v7M8 7v.1M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
          </svg>
        </motion.a>
        <motion.button
          type="button"
          aria-label="Email"
          onClick={() => setIsEmailModalOpen(true)}
          whileHover={{ scale: 1.25, y: -4 }}
          whileTap={{ scale: 0.9 }}
          style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
        >
          <div className="theme-button" style={{ margin: 0 }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>
        </motion.button>
        <span className="dock-divider" aria-hidden="true" />
        <motion.button
          type="button"
          className="theme-button"
          aria-label="Toggle color theme"
          onClick={toggleTheme}
          whileHover={{ scale: 1.25, y: -4 }}
          whileTap={{ scale: 0.9, rotate: 180 }}
        >
          {isDarkMode ? (
            <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z" />
            </svg>
          ) : (
            <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          )}
        </motion.button>
      </motion.nav>

      {/* EMAIL POPUP MODAL */}
      <AnimatePresence>
        {isEmailModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEmailModalOpen(false)}
          >
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Hubungi Sahrine</h3>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsEmailModalOpen(false)}
                  aria-label="Tutup modal"
                >
                  ✕
                </button>
              </div>

              <div className="email-badge-row">
                <div className="email-badge-info">
                  <span>✉</span>
                  <span>{PROFILE_DATA.email}</span>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyEmail}
                >
                  {copiedEmail ? "✓ Tersalin!" : "Salin Email"}
                </button>
              </div>

              <form className="modal-form" onSubmit={handleSendEmail}>
                <div className="form-group">
                  <label htmlFor="modal-name">Nama Anda</label>
                  <input
                    id="modal-name"
                    type="text"
                    placeholder="Masukkan nama Anda..."
                    value={emailForm.name}
                    onChange={(e) =>
                      setEmailForm({ ...emailForm, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-email">Email Anda</label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={emailForm.email}
                    onChange={(e) =>
                      setEmailForm({ ...emailForm, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-message">Pesan Anda</label>
                  <textarea
                    id="modal-message"
                    rows={4}
                    placeholder="Tuliskan pesan atau ide kerja sama Anda di sini..."
                    value={emailForm.message}
                    onChange={(e) =>
                      setEmailForm({ ...emailForm, message: e.target.value })
                    }
                    required
                  />
                </div>

                <button type="submit" className="modal-submit-btn">
                  <span>Kirim Pesan</span>
                  <span>↗</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// HELPER COMPONENTS FOR SKILL ICONS & PROJECT GRAPHICS
function RenderSkillIcon({ skillName }) {
  switch (skillName) {
    case "Python":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 2c-5.1 0-4.8 2.2-4.8 2.2v2.3h4.9v.7H5.3S2 6.8 2 12s2.9 5 2.9 5h1.7v-2.4s-.1-2.9 2.8-2.9h4.8s2.7 0 2.7-2.7V4.7S17.3 2 12 2Zm-2.7 1.5a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
          <path d="M12 22c5.1 0 4.8-2.2 4.8-2.2v-2.3h-4.9v-.7h6.8S22 17.2 22 12s-2.9-5-2.9-5h-1.7v2.4s.1 2.9-2.8 2.9H9.8s-2.7 0-2.7 2.7v4.3S6.7 22 12 22Zm2.7-1.5a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
        </svg>
      );
    case "PHP":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 18l6-6-6-6M8 6L2 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "JavaScript":
      return (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#f7df1e" stroke="none" />
          <path d="M11 16.5v-5m7 5c-1 0-2-.5-2-2m2-3v5" stroke="#111" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Laravel":
      return (
        <svg viewBox="0 0 24 24">
          <path d="m3 4 6 2v12l-6-3V4Zm6 2 5-2 7 3v11l-7 3-5-3m5-14v17m-5-9 5 2 7-3" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M3 10c3-4 6-4 9 0 2 2 4 2 6 0 1-1 2-1 3-1-3 4-6 4-9 0-2-2-4-2-6 0-1 1-2 1-3 1Zm0 5c3-4 6-4 9 0 2 2 4 2 6 0 1-1 2-1 3-1-3 4-6 4-9 0-2-2-4-2-6 0-1 1-2 1-3 1Z" />
        </svg>
      );
    case "ReactJS":
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        </svg>
      );
    case "MySQL":
      return (
        <svg viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </svg>
      );
    case "Figma":
      return (
        <svg viewBox="0 0 24 24">
          <path className="f-red" d="M7 2h5v7H7a3.5 3.5 0 1 1 0-7Z" />
          <path className="f-orange" d="M12 2h5a3.5 3.5 0 1 1 0 7h-5V2Z" />
          <path className="f-purple" d="M7 9h5v7H7a3.5 3.5 0 1 1 0-7Z" />
          <circle className="f-blue" cx="15.5" cy="12.5" r="3.5" />
          <path className="f-green" d="M7 16h5v3.5A3.5 3.5 0 1 1 7 16Z" />
        </svg>
      );
    case "UI/UX Design":
      return (
        <svg viewBox="0 0 24 24">
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6m0 6v6M4 7.5l5.5 3M14.5 13l5.5 3.5" />
        </svg>
      );
    case "Prototyping":
      return (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M3 9h18M9 9v12" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "AI Fundamentals":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 2c.5 4.8 3.2 7.5 8 8-4.8.5-7.5 3.2-8 8-.5-4.8-3.2-7.5-8-8 4.8-.5 7.5-3.2 8-8Z" />
          <path d="M19 16c.2 2.1 1.4 3.3 3 3.5-1.6.2-2.8 1.4-3 3.5-.2-2.1-1.4-3.3-3-3.5 1.6-.2 2.8-1.4 3-3.5Z" />
        </svg>
      );
    case "Data Processing":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M4 19V9m5 10V5m5 14v-7m5 7V3" />
        </svg>
      );
    case "Project Management":
      return (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="17" rx="2" />
          <path d="M9 4V2h6v2M8 10h8M8 14h6M8 18h4" />
        </svg>
      );
    case "Team Coordination":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      );
    case "System Documentation":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.8" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "Communication":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      );
    case "Problem Solving":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M9 18h6m-4 3h2M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24">
          <path d="M6 2h8l4 4v16H6z" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      );
  }
}

function RenderProjectGraphic({ projectId }) {
  switch (projectId) {
    case "simrs":
      return (
        <div className="mini-browser">
          <div className="mini-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="store-ui">
            <div className="store-title">SIMRS Dashboard</div>
            <div className="store-grid">
              <b />
              <b />
              <b />
            </div>
            <div className="store-line" />
          </div>
        </div>
      );
    case "mentorize":
      return (
        <div className="dxp-board">
          <div className="dxp-sidebar">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="dxp-content">
            <div className="dxp-head" />
            <div className="metric-row">
              <b />
              <b />
              <b />
            </div>
            <div className="flow-line">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      );
    case "sampahin":
      return (
        <div className="chat-window">
          <div className="chat-top">
            <b />
            <span>SampahIn AI</span>
          </div>
          <div className="bubble left" />
          <div className="bubble right" />
          <div className="bubble left short" />
          <div className="chat-input" />
        </div>
      );
    case "leeboba":
      return (
        <div className="link-app">
          <div className="link-sidebar">
            <b>L</b>
            <i />
            <i />
            <i />
          </div>
          <div className="link-main">
            <div className="link-header">
              <b>Lee Boba</b>
              <i />
            </div>
            <div className="link-cards">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      );
    case "jendeladunia":
      return (
        <div className="book-app">
          <div className="book-nav">
            <b>Jendela Dunia</b>
            <i />
            <i />
            <i />
          </div>
          <div className="book-grid">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    default:
      return null;
  }
}
