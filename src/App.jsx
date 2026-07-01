import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESUME_FILENAME = "Mayuresh_Thorat_Resume.pdf";
const RESUME_DATA_URL = `/${RESUME_FILENAME}`;

/* ============================================================
   DATA
   ============================================================ */
const NAV_ITEMS = ["home", "about", "skills", "projects", "achievements", "certificates", "resume", "contact"];

const CERTIFICATES = [
  {
    id: "ai-cert",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    issuerLogo: "🤖",
    date: "2026",
    category: "AI / Machine Learning",
    categoryColor: "cyan",
    description: "Credential validating foundational knowledge in Artificial Intelligence concepts, tools, and real-world applications — covering ML workflows, neural networks, and AI ethics.",
    skills: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "AI Ethics", "Data Science"],
    file: "/AI_Certificate.png",
    fileType: "image",
    credentialId: null,
  },
  {
    id: "python-cert",
    title: "100 Days of Code: The Complete Python Bootcamp",
    issuer: "Udemy · Dr. Angela Yu",
    issuerLogo: "🐍",
    date: "2026",
    category: "Python · Programming",
    categoryColor: "emerald",
    description: "100-day immersive Python course covering core programming, automation, web scraping, data science, Flask web development, GUI apps, and professional best practices.",
    skills: ["Python", "Flask", "Web Scraping", "Automation", "Data Analysis", "APIs", "OOP"],
    file: "/Python_Udemy_Certificate.pdf",
    fileType: "pdf",
    credentialId: null,
  },
  {
    id: "completion-frontend",
    title: "Junior Frontend Developer",
    issuer: "Internship · Certificate of Completion",
    issuerLogo: "🖥️",
    date: "2026",
    category: "Frontend Development",
    categoryColor: "indigo",
    description: "Certificate of completion awarded for successfully fulfilling the responsibilities and deliverables of a Junior Frontend Developer internship — covering responsive UI development, JavaScript, and modern frontend workflows.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Frontend Development"],
    file: "/completion-letter-junior_frontend_dev.pdf",
    fileType: "pdf",
    credentialId: null,
  },
  {
    id: "completion-fullstack",
    title: "Junior Full Stack Developer",
    issuer: "Internship · Certificate of Completion",
    issuerLogo: "🚀",
    date: "2026",
    category: "Full Stack Development",
    categoryColor: "amber",
    description: "Certificate of completion awarded for successfully fulfilling the responsibilities and deliverables of a Junior Full Stack Developer internship — spanning frontend interfaces, backend APIs, and database integration.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Full Stack"],
    file: "/completion-letter-junior_full_stack_dev.pdf",
    fileType: "pdf",
    credentialId: null,
  },
];

const PROJECTS = [
  {
    id: 1,
    featured: true,
    badge: "Healthcare · Full Stack · AI",
    badgeColor: "cyan",
    year: "2026",
    title: "UPHI — Unified Patient Healthcare Interface",
    desc: "A production-grade healthcare platform serving four distinct user roles — patient, doctor, receptionist, and admin — across three separate interfaces: a React patient web portal, a hospital dashboard, and a cross-platform mobile app. Designed and integrated 20+ RESTful APIs using Spring Boot and MongoDB, covering patient records, scheduling, pharmacy, consent management, and AI-generated clinical summaries via Gemini API. JWT-based auth with role-based access control, QR-based patient verification, and full Docker Compose containerisation.",
    tech: ["React.js", "Spring Boot", "MongoDB", "Docker Compose", "JWT Auth", "Gemini API", "REST APIs", "Role-based Access Control"],
    github: "https://github.com/MayurThorat0318/UPHI",
    demo: null,
    stats: [
      { num: "20+", label: "APIs Built" },
      { num: "3", label: "Interfaces" },
      { num: "4", label: "User Roles" },
    ],
  },
  {
    id: 2,
    featured: false,
    badge: "ML · Data Analytics",
    badgeColor: "amber",
    year: "2026",
    title: "NIQ Media Analytics — Ad Impression Predictor",
    desc: "Analysed 50,000 real streaming sessions across subscription tiers, age groups, and devices to uncover ad engagement patterns for NIQ Media Analytics (Team DataGrinders, Fergusson College). Engineered 5 custom features, benchmarked 3 ML models — Random Forest achieved 99.8% prediction accuracy with error < 0.01 ads/session, projected to unlock +119K additional ad impressions. Team shortlisted for the Final Round.",
    tech: ["Python", "Random Forest", "Scikit-learn", "Pandas", "NumPy", "Feature Engineering", "ML / DL"],
    github: "https://github.com/MayurThorat0318/NIQ_Media_Analytics",
    demo: null,
  },
  {
    id: 3,
    featured: false,
    badge: "AI · NLP · Python",
    badgeColor: "indigo",
    year: "2026",
    title: "RTO Chatbot — Smart Information Assistant",
    desc: "AI-powered conversational assistant providing instant answers to RTO (Regional Transport Office) queries — driving licenses, vehicle registration, fines, document requirements, and service booking. Built with Python and NLP-based keyword-intent matching, structured JSON knowledge base, and a clean interactive UI.",
    tech: ["Python", "NLP", "Intent Classification", "JSON Knowledge Base", "Tkinter", "Rule-based AI"],
    github: "https://github.com/MayurThorat0318/RTO_CHATBOT",
    demo: null,
  },
  {
    id: 4,
    featured: false,
    badge: "Full Stack · MERN",
    badgeColor: "emerald",
    year: "2025",
    title: "Airbnb Clone — MERN Stack",
    desc: "Full-stack Airbnb-style booking application using the MERN stack. Includes JWT authentication, property listing management, photo uploads via Cloudinary/Multer, protected routes, and a fully responsive UI delivering a real-world booking experience.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Cloudinary", "Multer"],
    github: "https://github.com/MayurThorat0318/Airbnb_09",
    demo: null,
  },
  {
    id: 5,
    featured: false,
    badge: "Frontend · React",
    badgeColor: "indigo",
    year: "2026",
    title: "Personal Portfolio Website",
    desc: "Fully responsive personal portfolio built with React.js, featuring smooth Framer Motion page transitions, reusable component architecture, and an optimized Vite production build. Deployed on Netlify.",
    tech: ["React.js", "Framer Motion", "Vite", "CSS3", "Netlify"],
    github: "https://github.com/MayurThorat0318/Portfolio",
    demo: null,
  },
];

const SKILLS = [
  { icon: "⚛", title: "Frontend", tags: ["React.js", "JavaScript", "HTML5", "CSS3", "Framer Motion", "Vite", "Responsive Design"] },
  { icon: "⚙", title: "Backend & APIs", tags: ["Spring Boot", "Flask", "Node.js", "Express.js", "REST APIs", "JWT Auth", "Docker"] },
  { icon: "🤖", title: "AI / Machine Learning", tags: ["Python", "Machine Learning", "Deep Learning", "Random Forest", "Scikit-learn", "Pandas", "NumPy", "Feature Engineering", "EDA"] },
  { icon: "🧠", title: "NLP & GenAI", tags: ["Natural Language Processing", "Intent Classification", "Gemini API", "Computer Vision", "GenAI", "LLM Prompting"] },
  { icon: "🗄", title: "Databases", tags: ["MongoDB", "MySQL", "Mongoose ODM"] },
  { icon: "💻", title: "Languages & Tools", tags: ["Python", "JavaScript", "Java (Basics)", "SQL", "Git & GitHub", "VS Code", "Postman", "Linux", "Docker Compose"] },
];

const CONTACT_LINKS = [
  { icon: "✉", label: "Email",      value: "thoratmayuresh30@gmail.com",        href: "https://mail.google.com/mail/?view=cm&to=thoratmayuresh30@gmail.com" },
  { icon: "📞", label: "Phone",      value: "+91 8010130633",                    href: "tel:+918010130633" },
  { icon: "🐙", label: "GitHub",     value: "github.com/MayurThorat0318",        href: "https://github.com/MayurThorat0318" },
  { icon: "💼", label: "LinkedIn",   value: "linkedin/mayuresh-thorat",          href: "https://www.linkedin.com/in/mayuresh-thorat-0987b3362/" },
  { icon: "💡", label: "LeetCode",   value: "leetcode/MayureshThorat09",         href: "https://leetcode.com/u/MayureshThorat09/" },
  { icon: "🏆", label: "HackerRank", value: "hackerrank/thoratmayuresh30",       href: "https://www.hackerrank.com/profile/thoratmayuresh30" },
];

/* ============================================================
   ICONS
   ============================================================ */
function IconGithub() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.95 10.95 0 0 1 12 6.84c.97.005 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.79.55C20.22 21.4 23.5 17.09 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>;
}
function IconExternal() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
}
function IconDownload() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function IconArrow() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
}
function IconLinkedIn() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z"/></svg>;
}
function IconLeetCode() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>;
}

/* ============================================================
   MODAL for viewing PDF in browser
   ============================================================ */
function ResumeModal({ onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="modal-header">
          <span className="modal-title">📄 Mayuresh Thorat — Resume</span>
          <div className="modal-actions">
            <a href={RESUME_DATA_URL} download={RESUME_FILENAME} className="modal-dl-btn">
              <IconDownload /> Download
            </a>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>
        <div className="modal-body">
          <iframe
            src={RESUME_DATA_URL}
            title="Mayuresh Thorat Resume"
            className="resume-iframe"
            type="application/pdf"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   MODAL for viewing Certificates
   ============================================================ */
function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} certificate viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="modal-box cert-modal-box"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="modal-header">
          <span className="modal-title">{cert.issuerLogo} {cert.title}</span>
          <div className="modal-actions">
            <a href={cert.file} download className="modal-dl-btn">
              <IconDownload /> Download
            </a>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>
        <div className="modal-body">
          {cert.fileType === "image" ? (
            <img
              src={cert.file}
              alt={cert.title}
              className="cert-modal-img"
            />
          ) : (
            <iframe
              src={cert.file}
              title={cert.title}
              className="resume-iframe"
              type="application/pdf"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   APP ANIMATIONS
   ============================================================ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.4 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ============================================================
   APP
   ============================================================ */
function CopyEmailBtn({ email }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };
  return (
    <button className="copy-email-btn" onClick={copy} title="Copy email address">
      {copied ? "✓ Copied!" : "Copy"}
    </button>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [active, setActive]             = useState("home");
  const [showResume, setShowResume]     = useState(false);
  const [activeCert, setActiveCert]     = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = [...NAV_ITEMS].reverse();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 100 >= el.offsetTop) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Background */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-orb bg-orb-1" aria-hidden="true" />
      <div className="bg-orb bg-orb-2" aria-hidden="true" />
      <div className="bg-orb bg-orb-3" aria-hidden="true" />

      <AnimatePresence>
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {activeCert && <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />}
      </AnimatePresence>

      <div className="page-wrap">
        {/* ── NAVBAR ── */}
        <header className={`navbar${scrolled ? " scrolled" : ""}`}>
          <div className="nav-inner">
            <button className="nav-logo" onClick={() => scrollTo("home")} aria-label="Go to top">
              <span className="nav-logo-badge">MT</span>
              <span className="nav-logo-text">Mayuresh Thorat</span>
            </button>

            <nav className="nav-links" aria-label="Primary navigation">
              {NAV_ITEMS.map((id) => (
                <button key={id} className={`nav-link${active === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <a href={RESUME_DATA_URL} download={RESUME_FILENAME} className="nav-resume-btn">
                <IconDownload /> Resume
              </a>
            </nav>

            <button className="hamburger" onClick={() => setMenuOpen((p) => !p)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
              <span className={menuOpen ? "hbar hbar-open-1" : "hbar"} />
              <span className={menuOpen ? "hbar hbar-open-2" : "hbar"} />
              <span className={menuOpen ? "hbar hbar-open-3" : "hbar"} />
            </button>
          </div>

          {menuOpen && (
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {NAV_ITEMS.map((id) => (
                <button key={id} className={`mobile-nav-link${active === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <a href={RESUME_DATA_URL} download={RESUME_FILENAME} className="mobile-resume-btn">⬇ Download Resume</a>
            </nav>
          )}
        </header>

        <main>
          {/* ── HERO ── */}
          {/* ── HERO ── */}
          <section id="home" className="hero-section">
            <div className="container">
              <div className="hero-wrap">
                <motion.div
                  className="hero-left"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="hero-status" variants={itemVariants}>
                    <span className="status-dot" />
                    Open to Internships &amp; Full-time Roles
                  </motion.div>
                  <motion.h1 className="hero-heading" variants={itemVariants}>
                    Hi, I&apos;m <span className="hero-name">Mayuresh</span>
                  </motion.h1>
                  <motion.p className="hero-role" variants={itemVariants}>Full-Stack Developer &amp; AI / ML Engineer</motion.p>
                  <motion.p className="hero-desc" variants={itemVariants}>
                    M.Sc. Computer Science student who builds across the full spectrum — production
                    full-stack platforms with 20+ REST APIs, and ML models achieving 99.8% accuracy
                    on 50K real sessions. I enjoy solving real problems with clean code, whether
                    that means a Spring Boot backend or a Random Forest pipeline.
                  </motion.p>
                  <motion.div className="hero-cta" variants={itemVariants}>
                    <button className="btn-primary" onClick={() => scrollTo("projects")}>
                      View Projects <IconArrow />
                    </button>
                    <button className="btn-outline" onClick={() => setShowResume(true)}>
                      <IconDownload /> View Resume
                    </button>
                  </motion.div>
                  <motion.div className="hero-socials" variants={itemVariants}>
                    <motion.a whileHover={{ y: -3, color: "var(--cyan)" }} href="https://github.com/MayurThorat0318" target="_blank" rel="noreferrer" className="social-link"><IconGithub /> GitHub</motion.a>
                    <motion.a whileHover={{ y: -3, color: "var(--cyan)" }} href="https://www.linkedin.com/in/mayuresh-thorat-0987b3362/" target="_blank" rel="noreferrer" className="social-link"><IconLinkedIn /> LinkedIn</motion.a>
                    <motion.a whileHover={{ y: -3, color: "var(--cyan)" }} href="https://leetcode.com/u/MayureshThorat09/" target="_blank" rel="noreferrer" className="social-link"><IconLeetCode /> LeetCode</motion.a>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="hero-right"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="hero-card"
                    whileHover={{ y: -6, boxShadow: "0 25px 60px rgba(6,182,212,0.15)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="hero-avatar">M</div>
                    <div className="hero-card-name">Mayuresh Rajendra Thorat</div>
                    <div className="hero-card-title">Full-Stack Developer &amp; AI / ML Engineer</div>
                    <div className="hero-card-loc">📍 Pune, Maharashtra, India</div>
                    <div className="hero-stats">
                      <div className="stat-item"><span className="stat-num">20+</span><span className="stat-label">APIs Built</span></div>
                      <div className="stat-item"><span className="stat-num">99.8%</span><span className="stat-label">ML Accuracy</span></div>
                      <div className="stat-item"><span className="stat-num">5+</span><span className="stat-label">Projects</span></div>
                    </div>
                    <div className="card-tags">
                      <span className="card-tag">M.Sc. CS · Fergusson</span>
                      <span className="card-tag">Pursuing 2025–26</span>
                      <span className="card-tag">NIQ Challenge Finalist 🏆</span>
                    </div>
                    <div className="card-exploring">
                      <span className="exploring-label">⚡ Currently exploring</span>
                      <div className="exploring-tags">
                        <span className="exploring-tag">LangChain</span>
                        <span className="exploring-tag">RAG Pipelines</span>
                        <span className="exploring-tag">System Design</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── ABOUT ── */}
          {/* ── ABOUT ── */}
          <motion.section
            id="about"
            className="section about-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="container">
              <div className="sec-eyebrow">About Me</div>
              <h2 className="sec-heading">Who I Am</h2>
              <div className="about-grid">
                <div className="about-paras">
                  <p className="about-para">I&apos;m a Computer Science student pursuing my <strong>M.Sc. at Fergusson College, Pune</strong>, with a strong B.Sc. foundation (CGPA 8.98) from Sangamner College. My work spans two equally strong tracks — <strong>full-stack development</strong> and <strong>AI / Machine Learning</strong> — and I enjoy working across both depending on what the problem needs.</p>
                  <p className="about-para">On the ML side, my NIQ project achieved <strong>99.8% Random Forest accuracy</strong> on 50,000 real streaming sessions, projected to unlock +119K ad impressions. On the development side, UPHI is a production healthcare platform with <strong>20+ Spring Boot APIs</strong>, three interfaces, JWT auth, Docker deployment, and Gemini AI integration — built and shipped end-to-end.</p>
                </div>
                <div>
                  <div className="edu-stack">
                    <motion.div
                      className="edu-card primary"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="edu-label">Current</div>
                      <div className="edu-degree">Master of Computer Science (M.Sc.)</div>
                      <div className="edu-college">Fergusson College, Pune</div>
                      <div className="edu-meta"><span className="edu-year">2025 – 2026</span><span className="edu-grade">Pursuing · 1st Year CGPA: 8.55</span></div>
                    </motion.div>
                    <motion.div
                      className="edu-card"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="edu-label">Undergraduate</div>
                      <div className="edu-degree">Bachelor of Computer Science (B.Sc.)</div>
                      <div className="edu-college">Sangamner College, Sangamner</div>
                      <div className="edu-meta"><span className="edu-year">2022 – 2025</span><span className="edu-grade">CGPA: 8.98</span></div>
                    </motion.div>

                  </div>

                </div>
              </div>
            </div>
          </motion.section>

          {/* ── SKILLS ── */}
          {/* ── SKILLS ── */}
          <motion.section
            id="skills"
            className="section skills-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="container">
              <div className="sec-eyebrow">Skills</div>
              <h2 className="sec-heading">Technologies I Work With</h2>
              <p className="sec-sub">Full-stack development and AI / ML — two equally strong tracks. React frontends, Spring Boot APIs, Random Forest models, NLP pipelines, GenAI integrations.</p>
              <div className="skills-grid">
                {SKILLS.map((cat) => (
                  <motion.div
                    className="skill-card"
                    key={cat.title}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="skill-card-header">
                      <motion.div
                        className="skill-icon"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {cat.icon}
                      </motion.div>
                      <span className="skill-card-title">{cat.title}</span>
                    </div>
                    <div className="skill-tags">
                      {cat.tags.map((t) => (
                        <motion.span
                          className="skill-tag"
                          key={t}
                          whileHover={{ scale: 1.08 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── PROJECTS ── */}
          {/* ── PROJECTS ── */}
          <motion.section
            id="projects"
            className="section projects-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="container">
              <div className="sec-eyebrow">Projects</div>
              <h2 className="sec-heading">Things I&apos;ve Built</h2>
              <p className="sec-sub">Real-world projects across both tracks — production full-stack platforms, ML pipelines, AI chatbots, and data analytics. Built and shipped end-to-end.</p>
              <div className="projects-grid">
                {PROJECTS.map((p) =>
                  p.featured ? (
                    <motion.article
                      className="proj-card featured"
                      key={p.id}
                      whileHover={{ y: -6, scale: 1.01, boxShadow: "0 20px 40px rgba(6,182,212,0.12)" }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <div className="proj-featured-content">
                        <div className="proj-top">
                          <span className={`proj-badge ${p.badgeColor}`}>{p.badge}</span>
                          <span className="proj-year">{p.year}</span>
                        </div>
                        <h3 className="proj-title">{p.title}</h3>
                        <p className="proj-desc">{p.desc}</p>
                        <div className="proj-tech">{p.tech.map((t) => <span className="proj-tech-tag" key={t}>{t}</span>)}</div>
                        <div className="proj-links">
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-github"><IconGithub /> View on GitHub</a>
                          {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="proj-link accent"><IconExternal /> Live Demo</a>}
                        </div>
                      </div>
                      <div className="proj-featured-aside">
                        {p.stats.map((s) => (
                          <div className="proj-stat-box" key={s.label}>
                            <span className="proj-stat-num">{s.num}</span>
                            <span className="proj-stat-label">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.article>
                  ) : (
                    <motion.article
                      className="proj-card"
                      key={p.id}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <div className="proj-top">
                        <span className={`proj-badge ${p.badgeColor}`}>{p.badge}</span>
                        <span className="proj-year">{p.year}</span>
                      </div>
                      <h3 className="proj-title">{p.title}</h3>
                      <p className="proj-desc">{p.desc}</p>
                      <div className="proj-tech">{p.tech.map((t) => <span className="proj-tech-tag" key={t}>{t}</span>)}</div>
                      <div className="proj-links" style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-github"><IconGithub /> GitHub</a>
                        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="proj-link accent"><IconExternal /> Live Demo</a>}
                      </div>
                    </motion.article>
                  )
                )}
              </div>
            </div>
          </motion.section>

          {/* ── ACHIEVEMENTS & EXTRACURRICULARS ── */}
          {/* ── ACHIEVEMENTS & EXTRACURRICULARS ── */}
          <motion.section
            id="achievements"
            className="section achievements-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="container">
              <div className="sec-eyebrow">Beyond Code</div>
              <h2 className="sec-heading">Achievements &amp; Extracurriculars</h2>
              <p className="sec-sub">Recognition, leadership, and real-world impact outside the classroom.</p>

              <div className="achievements-grid">
                {/* Achievement */}
                <motion.div
                  className="ach-card ach-card-highlight"
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="ach-card-top">
                    <span className="ach-icon">🏆</span>
                    <span className="ach-badge">Achievement</span>
                  </div>
                  <h3 className="ach-title">NIQ Media Analytics Challenge 2025</h3>
                  <p className="ach-desc">Team DataGrinders shortlisted for the Final Round, Fergusson College M.Sc. CS. Achieved 99.8% Random Forest model accuracy on 50,000 real streaming sessions — projected to unlock +119K additional ad impressions for NIQ.</p>
                  <div className="ach-tags">
                    <span className="ach-tag">99.8% Accuracy</span>
                    <span className="ach-tag">Final Round</span>
                    <span className="ach-tag">Team DataGrinders</span>
                  </div>
                </motion.div>

                {/* Extracurriculars */}
                <motion.div
                  className="ach-card"
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="ach-card-top">
                    <span className="ach-icon">⭐</span>
                    <span className="ach-badge">Leadership</span>
                  </div>
                  <h3 className="ach-title">Event Management &amp; Leadership</h3>
                  <ul className="ach-list">
                    <li>Independently planned and managed the B.Sc. Second Year class trip to Konkan — coordinated transport, accommodation, itinerary, and budget for the full batch.</li>
                    <li>Co-organised and managed <strong>TechnoFest</strong>, the annual Science Department festival — event scheduling, stall coordination, team management, and execution of technical and cultural activities.</li>
                    <li>Organised the <strong>Farewell ceremony</strong> for B.Sc. Third Year students — end-to-end coordination including venue, programme flow, décor, and student participation.</li>
                    <li>Managed the <strong>Freshers&apos; Party</strong> for incoming B.Sc. First Year students — event schedule, volunteers coordination, and welcoming experience for new students.</li>
                  </ul>
                </motion.div>

                {/* Interests */}
                <motion.div
                  className="ach-card ach-card-interests"
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="ach-card-top">
                    <span className="ach-icon">✨</span>
                    <span className="ach-badge">Interests</span>
                  </div>
                  <h3 className="ach-title">What I Enjoy</h3>
                  <div className="interests-grid">
                    {["🧩 Solving complex problems", "🎙 Event management & leadership", "🤝 Talking with new people", "🏏 Playing cricket", "🎵 Listening to music"].map((itemText, i) => {
                      const icon = itemText.split(" ")[0];
                      const labelText = itemText.substring(icon.length + 1);
                      return (
                        <motion.div
                          key={i}
                          className="interest-item"
                          whileHover={{ scale: 1.05, borderColor: "var(--cyan)" }}
                        >
                          <span>{icon}</span> {labelText}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* ── CERTIFICATES ── */}
          <motion.section
            id="certificates"
            className="section certificates-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="container">
              <div className="sec-eyebrow">Certificates</div>
              <h2 className="sec-heading">Credentials &amp; Certifications</h2>
              <p className="sec-sub">Industry-recognised certifications validating my skills across AI, machine learning, and software development.</p>

              <div className="certs-grid">
                {CERTIFICATES.map((cert) => (
                  <motion.div
                    key={cert.id}
                    className="cert-card"
                    whileHover={{ y: -6, scale: 1.01, boxShadow: "0 20px 50px rgba(6,182,212,0.12)" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {/* Top accent line */}
                    <div className="cert-card-accent" />

                    {/* Header */}
                    <div className="cert-card-header">
                      <div className="cert-issuer-logo">{cert.issuerLogo}</div>
                      <div className="cert-header-info">
                        <span className={`cert-category-badge cert-badge-${cert.categoryColor}`}>{cert.category}</span>
                        <span className="cert-year">{cert.date}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="cert-card-body">
                      <h3 className="cert-title">{cert.title}</h3>
                      <div className="cert-issuer-name">{cert.issuer}</div>
                      <p className="cert-desc">{cert.description}</p>
                      <div className="cert-skills">
                        {cert.skills.map((s) => (
                          <span className="cert-skill-tag" key={s}>{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="cert-card-actions">
                      <motion.button
                        className="cert-btn cert-btn-primary"
                        onClick={() => setActiveCert(cert)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <IconExternal /> View Certificate
                      </motion.button>
                      <motion.a
                        href={cert.file}
                        download
                        className="cert-btn cert-btn-outline"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <IconDownload /> Download
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── RESUME ── */}
          {/* ── RESUME ── */}
          <motion.section
            id="resume"
            className="section resume-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="container">
              <div className="sec-eyebrow">Resume</div>
              <h2 className="sec-heading">My Resume</h2>
              <p className="sec-sub" style={{ margin: "0 auto 0" }}>View or download my latest resume — updated with all projects, skills, and achievements.</p>
              <motion.div
                className="resume-cta-box"
                whileHover={{ scale: 1.01, boxShadow: "0 25px 60px rgba(6,182,212,0.12)" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="resume-icon">📄</div>
                <h3 className="resume-cta-title">Mayuresh Rajendra Thorat</h3>
                <p className="resume-cta-desc">Full-Stack Developer &amp; AI / ML Engineer · M.Sc. CS at Fergusson College, Pune · B.Sc. CS CGPA 8.98 · NIQ Analytics Challenge Finalist</p>
                <div className="resume-btn-row">
                  <button className="btn-primary" onClick={() => setShowResume(true)}>
                    <IconExternal /> View Resume
                  </button>
                  <a href={RESUME_DATA_URL} download={RESUME_FILENAME} className="btn-outline">
                    <IconDownload /> Download PDF
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* ── CONTACT ── */}
          {/* ── CONTACT ── */}
          <motion.section
            id="contact"
            className="section contact-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="container">
              <div className="sec-eyebrow">Contact</div>
              <h2 className="sec-heading">Let&apos;s Connect</h2>
              <p className="sec-sub">Open to full-stack, AI/ML, or hybrid roles — internships, collaborations, or full-time. I respond within 24 hours.</p>
              <div className="contact-layout contact-layout-wide">
                <div className="contact-links">
                  {CONTACT_LINKS.map((item) => {
                    const isEmail = item.href.includes("mail.google.com");
                    const isTel   = item.href.startsWith("tel:");
                    const isExt   = !isEmail && !isTel;
                    if (isEmail) {
                      return (
                        <motion.div
                          key={item.label}
                          className="contact-email-row"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <a
                            href="https://mail.google.com/mail/?view=cm&to=thoratmayuresh30@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                            className="contact-email-anchor"
                          >
                            <div className="contact-link-icon">{item.icon}</div>
                            <div>
                              <div className="contact-link-label">{item.label}</div>
                              <div className="contact-link-val">{item.value}</div>
                            </div>
                          </a>
                          <CopyEmailBtn email={item.value} />
                        </motion.div>
                      );
                    }
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target={isExt ? "_blank" : undefined}
                        rel={isExt ? "noreferrer" : undefined}
                        className="contact-link-item"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="contact-link-icon">{item.icon}</div>
                        <div>
                          <div className="contact-link-label">{item.label}</div>
                          <div className="contact-link-val">{item.value}</div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
                <motion.div
                  className="contact-reach"
                  whileHover={{ scale: 1.01, boxShadow: "0 25px 60px rgba(6,182,212,0.12)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="reach-title">Prefer to reach out directly?</div>
                  <p className="reach-desc">
                    I&apos;m always open to a conversation — whether it&apos;s a job opportunity,
                    a collaboration, or just a hello. Pick whichever way works best for you.
                  </p>
                  <motion.a
                    href="https://mail.google.com/mail/?view=cm&to=thoratmayuresh30@gmail.com" target="_blank" rel="noreferrer"
                    className="reach-btn reach-btn-primary"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <span>✉</span> Send me an Email
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/mayuresh-thorat-0987b3362/" target="_blank" rel="noreferrer"
                    className="reach-btn reach-btn-secondary"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <IconLinkedIn /> Connect on LinkedIn
                  </motion.a>
                  <motion.a
                    href="tel:+918010130633"
                    className="reach-btn reach-btn-secondary"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <span>📞</span> Call / WhatsApp
                  </motion.a>
                  <div className="reach-note">
                    ⚡ Typically responds within 24 hours
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-left">
              <div className="footer-logo-sm">MT</div>
              <span>© {new Date().getFullYear()} Mayuresh Rajendra Thorat. All rights reserved.</span>
            </div>
            <span>Built with React · Vite · Deployed on Netlify</span>
          </div>
        </footer>
      </div>
    </>
  );
}