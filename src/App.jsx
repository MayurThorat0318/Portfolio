import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection("home")}>
            {/* 🔁 Change this to your initials */}
            <span className="logo-badge">MT</span>
            <span className="logo-text">Mayuresh Thorat</span>
          </div>

          {/* Desktop Menu */}
          <nav className="nav-links">
            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("skills")}>Skills</button>
            <button onClick={() => scrollToSection("projects")}>Projects</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="menu-line" />
            <span className="menu-line" />
            <span className="menu-line" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("skills")}>Skills</button>
            <button onClick={() => scrollToSection("projects")}>Projects</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="section hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <p className="hero-tag">Fresher • Frontend / React Developer</p>
              <h1>
                Hi, I&apos;m <span className="accent">Mayuresh</span>
              </h1>
              <p className="hero-subtitle">
                I&apos;m a passionate fresher developer who loves building clean,
                responsive web applications using React, JavaScript, HTML, and CSS.
              </p>
              <div className="hero-buttons">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                  className="btn primary"
                >
                  View Projects
                </a>
                {/* 🔁 Change href to your actual resume link when uploaded */}
                <a
                  href="https://example.com/my-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn secondary"
                >
                  Download Resume
                </a>
              </div>
            </div>
            <div className="hero-card">
              {/* You can replace this with your photo later */}
              <div className="avatar-circle">M</div>
              <p className="hero-role">Frontend & React Developer</p>
              <p className="hero-location">Based in India</p>
              <div className="hero-pill-row">
                <span className="pill">Open to Work</span>
                <span className="pill">Internships & Full-time</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            
            <div className="about-grid">
              <p>
              I am a motivated Frontend / MERN Stack Developer with strong fundamentals in React, JavaScript, Node.js, Express, and modern web development. I enjoy building clean, responsive, and user-friendly interfaces, and I continuously sharpen my skills through practical projects such as an Airbnb MERN clone, RTO chatbot, and productivity applications.
              </p>
              <p>
              I am a motivated Frontend / MERN Stack Developer with strong fundamentals in React, JavaScript, Node.js, Express, and modern web development. I enjoy building clean, responsive, and user-friendly interfaces, and I continuously sharpen my skills through practical projects such as an Airbnb MERN clone, RTO chatbot, and productivity applications.
              </p>
              <p>
              I am currently seeking a fresher software developer role where I can contribute to meaningful projects, collaborate with experienced developers, and grow as a professional in the tech industry.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section section-alt">
          <div className="container">
            <h2 className="section-title">Skills</h2>
            <p className="section-subtitle">
              Technologies and tools I&apos;ve worked with.
            </p>

            <div className="skills-grid">
              <SkillCard
                title="Frontend"
                skills={["HTML", "CSS", "JavaScript", "React", "Responsive Design"]}
              />
              <SkillCard
                title="Backend"
                skills={["C","Java (Core + OOP)","Node.js (Basics)", "Express (Basics)", "REST APIs"]}
              />
              <SkillCard
                title="Database & Tools"
                skills={[
                  "MongoDB / MySQL ",
                  "Git & GitHub",
                  "VS Code",
                  
                ]}
              />
              <SkillCard
                  title="Competitive Programming"
                  skills={[
                    "LeetCode: ",
                    "LeetCode Rating: ",
                    "HackerRank: ",
                    "HackerRank: ",
                  ]}
                />

            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section">
          <div className="container">
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">
              Some of the projects I&apos;ve built to practice and showcase my skills.
            </p>

            <div className="projects-grid">
            <ProjectCard
                title="Airbnb Clone – MERN Stack"
                tech={[
                  "React",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "JWT Auth",
                  "Axios",
                  "Cloudinary / Multer",
                ]}
                description="A full-stack Airbnb-like web application built using the MERN stack. Users can register, log in with JWT-based authentication, create and manage property listings, upload photos, view details of stays, and make bookings. Includes protected routes, API integration, and responsive UI for a real-world booking experience."
                github="https://github.com/yourusername/airbnb-mern"   // 🔁 change this
                demo="https://your-airbnb-clone-link.com"              // 🔁 change this if deployed
              />

              <ProjectCard
                title="RTO Chatbot – Smart Information Assistant"
                tech={[
                  "Python",
                  "Natural Language Processing (NLP)",
                  "Tkinter / Web UI",
                  "JSON / Dataset",
                  "Rule-based Chatbot Logic"
                ]}
                description="A mini AI chatbot designed to provide instant answers to common RTO (Regional Transport Office) queries such as driving license information, vehicle registration, fines, document requirements, and service booking details. Built using Python with NLP-like keyword matching and a clean UI. Helps users quickly find transport-related info without navigating large websites."
                github="https://github.com/yourusername/rto-chatbot"   // 🔁 add your repo link
                demo="#"                                                // optional, if you have a demo video/link
              />

              <ProjectCard
                title="Portfolio Website"
                tech={["React", "HTML", "CSS", "JavaScript"]}
                description="This portfolio website built to showcase my skills and projects to recruiters and hiring managers."
                github="https://github.com/yourusername/portfolio"
                demo="#"
              />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section section-alt">
          <div className="container contact-grid">
            <div>
              <h2 className="section-title">Contact</h2>
              <p className="section-subtitle">
                Feel free to reach out for opportunities, collaboration, or just a hello.
              </p>
              <ul className="contact-list">
                <li>
                  <span>Email:</span>{" "}
                  <a href="thoratmayuresh30@gmail.com">thoratmayuresh30@gmail.com</a>
                </li>
                <li>
                  <span>GitHub:</span>{" "}
                  <a
                    href="https://github.com/MayurThorat0318"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://github.com/MayurThorat0318
                  </a>
                </li>
                <li>
                  <span>LinkedIn:</span>{" "}
                  <a
                    href="https://www.linkedin.com/in/mayuresh-thorat-0987b3362/"
                    target="_blank"
                    rel="noreferrer"
                  >
                   https://www.linkedin.com/in/mayuresh-thorat-0987b3362/
                  </a>
                </li>
                <li>
                    <span>LeetCode:</span>
                    <a href="https://leetcode.com/u/MayureshThorat09/" target="_blank">
                    https://leetcode.com/u/MayureshThorat09/
                    </a>
                  </li>

                  <li>
                    <span>HackerRank:</span>
                    <a href="https://www.hackerrank.com/profile/thoratmayuresh30" target="_blank">
                    https://www.hackerrank.com/profile/thoratmayuresh30
                    </a>
                  </li>

              </ul>
            </div>

            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("This is a demo form. Connect with me via email or LinkedIn!");
              }}
            >
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Your Name" required />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="yourmail@example.com"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Write your message here..."
                  required
                />
              </div>
              <button type="submit" className="btn primary full-width">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-content">
          <p>© {currentYear} Mayuresh Thorat. All rights reserved.</p>
          <p className="footer-sub">
            Built with React • Clean & Responsive Portfolio for Fresher Placements
          </p>
        </div>
      </footer>
    </>
  );
}

function SkillCard({ title, skills }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <ul className="skill-list">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ title, tech, description, github, demo }) {
  return (
    <article className="card project-card">
      <h3>{title}</h3>
      <p className="project-desc">{description}</p>
      <div className="pill-row">
        {tech.map((t) => (
          <span key={t} className="pill small">
            {t}
          </span>
        ))}
      </div>
      <div className="project-links">
        {github && (
          <a href={github} target="_blank" rel="noreferrer" className="text-link">
            GitHub
          </a>
        )}
        {demo && demo !== "#" && (
          <a href={demo} target="_blank" rel="noreferrer" className="text-link">
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}

export default App;
