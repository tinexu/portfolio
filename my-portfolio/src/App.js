import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import AOS from 'aos';
import Particles from 'react-tsparticles';
// import TechIcon from './TechIcon'
import 'aos/dist/aos.css';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [active, setActive] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [scrolled, setScrolled] = useState(false);
  const typedRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Initialize Typed.js with a small delay to ensure DOM is ready
    let typed;
    const initTyped = setTimeout(() => {
      if (typedRef.current) {
        typed = new Typed(typedRef.current, {
          strings: ['Full Stack Developer.', 'UI/UX Designer.', 'Problem Solver.', 'Creative Thinker.'],
          typeSpeed: 80,
          backSpeed: 40,
          loop: true,
          showCursor: true,
          cursorChar: '|',
        });
      }
    }, 100);

    // Enhanced mouse tracking with cursor states
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');
    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Parallax scroll effect
    const handleParallax = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-element');

      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    };

    // Scroll spy and navbar effect
    const onScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPos = window.scrollY + 100;

      // Update active section
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActive(id);
          }
        }
      });

      // Navbar scroll effect
      setScrolled(window.scrollY > 50);

      // Parallax effect
      handleParallax();

      // Reveal elements on scroll
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementBottom = el.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
          el.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', onScroll);

    // Magnetic button effect
    const magneticButtons = document.querySelectorAll('.magnetic-button');
    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });

    // Magnetic button effect
    const applyMagneticEffect = () => {
      const magneticButtons = document.querySelectorAll('.magnetic-button');

      magneticButtons.forEach(button => {
        const handleMouseMove = (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          // Limit the movement
          const moveX = x * 0.3;
          const moveY = y * 0.3;

          button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        const handleMouseLeave = () => {
          button.style.transform = 'translate(0, 0)';
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup
        return () => {
          button.removeEventListener('mousemove', handleMouseMove);
          button.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    };

    // Apply magnetic effect after a short delay to ensure DOM is ready
    setTimeout(applyMagneticEffect, 100);

    return () => {
      clearTimeout(initTyped);
      if (typed) {
        typed.destroy();
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const experiences = [
    {
      title: 'Software Engineering & App Intern',
      company: 'CuesHub',
      period: 'July 2025 – Present',
      location: 'Memphis, TN',
      bullets: [
        'Designed a modular Flutter app with dynamic calendar integration and local-first storage for real-time health tracking',
        'Developed an AI insights engine that increased engagement by 40 percent through personalized health prompts',
        'Simulated future user states using task trends and input data to model lifestyle trajectories',
        'Built a habit forecasting engine using time series patterns to recommend high-impact nudges'
      ],
      tech: ['Flutter', 'On-device Machine Learning', 'Time Series Analysis', 'Behavioral Modeling'],
      /* icon: ''*/
    },
    {
      title: 'App Development Intern & Lead',
      company: 'Oracode',
      period: 'July 2025 – Present',
      location: 'Remote',
      bullets: [
        'Led Flutter dev for an offline-first educational app with full routing, state, and theming',
        'Built game and sandbox modes using custom Blockly-based simulation logic',
        'Developed on-device NLP for multilingual interactions and AI feedback',
        'Designed real-time features with local storage to support interactive learning'
      ],
      tech: ['Flutter', 'Blockly/Visual Programming', 'On-device NLP', 'State Management'],
      /* icon: ''*/
    },
    {
      title: 'Marketing and Membership Coordinator',
      company: 'Fitness Project',
      period: 'May 2025 – August 2025',
      location: 'The Woodlands, TX',
      bullets: [
        'Managed CRM operations using ABC Fitness and GymSales to track memberships, automate outreach, and optimize client pipelines',
        'Operated Ignite Sales platform for lead generation and performance tracking across marketing campaigns',
        'Used data dashboards and reporting tools to monitor KPIs and improve member engagement',
        'UStreamlined communication workflows between departments through platform integrations and digital tools'
      ],
      tech: ['CRM Management', 'Marketing Automation', 'Data Reporting', 'Lead Pipeline Optimization'],
      icon: ''
    }
  ];

  const projects = [
    {
      title: "Fluffi",
      description: "An AI assistant that simulates memory decay using behavioral embeddings and on-device NLP to proactively resurface relevant past experiences.",
      tech: ["Flutter", "Dart", "Hive", "On-device NLP", "Semantic Search", "Behavioral Embeddings"],
      image: "/fluffi.png",
      demo: "#",
      github: "https://github.com/tinexu/cm-aug-system"
    },
    {
      title: "AURA",
      description: "A ML-powered dashboard integrating FRED and FX APIs to analyze macro trends, credit risks, and user alerts across 50K+ daily data points, alongside an autonomous, modular AI system for explainable credit and compliance decisions, reducing manual review time by 60%.",
      tech: ["Machine Learning", "API Integration", "Explainable AI", "Agentic AI", "Credit Risk Modeling"],
      image: "/AURA.png",
      demo: "#",
      github: "https://github.com/tinexu/aura"
    },
    {
      title: "CAD-Driven XR Simulation Engine for NASA Missions",
      description: "Built a real-time XR astronaut training simulation in Unreal Engine for NASA, optimizing CAD assets and scripting procedures in Blueprints with <5% frame drop. Published in IEEE SMC-ITSCC 2025 for work on Gateway and lunar mission visualization tools. (Source code and materials protected under NDA).",
      tech: ["Unreal Engine/Blueprints", "XR Simulation Development", "3D Asset Optimization", "Performance Tuning", "Scientific Visualization"],
      image: "/GVT-Image.png",
      demo: "#",
      github: "#",
      private: true
    },
    /*{
      title: "Social Media App",
      description: "Full-featured social platform with real-time messaging, stories, and content sharing.",
      tech: ["React Native", "Firebase", "Node.js", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      demo: "#",
      github: "#"
    }*/
  ];

  const skills = [
    { name: "Python", level: 90, color: "#537efcff" },
    { name: "React", level: 85, color: "#66bfff" },
    { name: "Flutter", level: 80, color: "#8457f7ff" },
    { name: "TensorFlow Lite", level: 75, color: "#ff51c5ff" },
    { name: "Multi-Agent Systems", level: 85, color: "#ff88c2" },
    { name: "On-device ML", level: 80, color: "#bf9bf8ff" }
  ]


  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Morphing Blob Background */}
      <div className="morphing-blob" style={{ top: '20%', left: '10%' }} />
      <div className="morphing-blob" style={{ bottom: '20%', right: '10%', animationDelay: '4s' }} />

      {/* Enhanced Custom Cursor */}
      <motion.div
        className={`custom-cursor ${cursorVariant}`}
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: cursorVariant === 'hover' ? 1.5 : cursorVariant === 'click' ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
          mass: 0.5,
        }}
      />

      {/* Animated Background Elements */}
      <div className="animated-bg">
        <div className="morphing-blob blob-1" />
        <div className="morphing-blob blob-2" />
        <div className="morphing-blob blob-3" />
      </div>

      {/* Particles Background */}
      <Particles
        className="particles"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: darkMode ? "#ffffff" : "#000000" },
            opacity: { value: 0.1 },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              outModes: { default: "out" }
            },
            links: {
              enable: true,
              distance: 150,
              color: darkMode ? "#ffffff" : "#000000",
              opacity: 0.05,
              width: 1
            }
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" }
            },
            modes: {
              grab: { distance: 140, links: { opacity: 0.2 } },
              push: { quantity: 4 }
            }
          },
        }}
      />

      {/* Theme Toggle */}
      {/* <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Dark Mode"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: darkMode ? 0 : 180 }}
          transition={{ duration: 0.5 }}
        >
          {darkMode ? '🌙' : '☀️'}
        </motion.div>
      </button>*/}

      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <motion.div
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="gradient-text">Portfolio</span>
          </motion.div>
          <div className="nav-links">
            {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((sec, i) => (
              <motion.a
                key={sec}
                href={`#${sec.toLowerCase()}`}
                className={`${active === sec.toLowerCase() ? 'active' : ''} magnetic-button`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sec}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.header
        id="home"
        className="header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <div className="hero-inner">
            {/* 3D icon 
            <motion.div
              className="hero-icon floating"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <TechIcon />
            </motion.div>*/}

            {/* Text block */}
            <div className="hero-text">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Hi, I’m <span className="gradient-text animated-gradient">Christine Xu</span>
              </motion.h1>

              <motion.div
                className="typed-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                I am a <span ref={typedRef}></span>
              </motion.div>

              <motion.div
                className="social-links stagger-animation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {/* social icons… */}
              </motion.div>
            </div>
          </div>

          {/* Sprinkle of 3D Icons */}
          <div className="floating-icons">
            <img src="/3d/computer3d.png" className="floating-icon computer" alt="Computer" />
            <img src="/3d/duck3d.png" className="floating-icon duck" alt="Duck" />
            <img src="/3d/robot3d.png" className="floating-icon robot" alt="Robot" />
            <img src="/3d/phone3d.png" className="floating-icon phone" alt="Phone" />
            <img src="/3d/heartstar3d.png" className="floating-icon heartstar" alt="HeartStar" />
            <img src="/3d/wifi3d.png" className="floating-icon wifi" alt="WiFi" />
            <img src="/3d/tiger3d.png" className="floating-icon tiger" alt="Tiger" />
            <img src="/3d/mooncloud3d.png" className="floating-icon mooncloud" alt="MoonCloud" />
            <img src="/3d/pinkcomputer3d.png" className="floating-icon pinkcomputer" alt="PinkComputer" />
            <img src="/3d/headphone3d.png" className="floating-icon headphone" alt="Headphone" />
            <img src="/3d/eggtoast3d.png" className="floating-icon eggtoast" alt="EggToast" />
            <img src="/3d/dog3d.png" className="floating-icon dog" alt="Dog" />
            <img src="/3d/ribbon3d.png" className="floating-icon ribbon" alt="Ribbon" />
          </div>

          {/* scroll indicator stays below */}
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <i className="fas fa-chevron-down"></i>
          </motion.div>
        </div>

      </motion.header>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <span className="gradient-text">About Me</span>
          </motion.h2>

          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p>
                I’m a full-stack developer and AI enthusiast with a strong foundation in software engineering, on-device intelligence, and 
                intuitive UX. During my internships at CuesHub and Oracode, I’ve built cross-platform apps, led scalable Flutter development 
                for large teams, and developed multilingual NLP systems that deliver smart, real-time feedback.
              </p>
              <p>
                I’ve created Fluffi, an AI-powered memory assistant that predicts future memory needs using behavioral embeddings. I also 
                built AURA, an autonomous financial dashboard with explainable agents for credit and compliance decisions, and Elevatr, a 
                career pivot platform that recommends personalized project paths based on a user’s goals and evolving job market trends. I 
                co-authored an IEEE-published XR training system for NASA, where I worked on real-time astronaut simulation in Unreal Engine.
              </p>
              <p>
                Beyond building software, I love writing stories. I’m drawn to ideas that blend creativity and technology, and I enjoy 
                crafting experiences that are not only functional but also emotionally resonant. Whether I’m exploring new tools, contributing 
                to open-source, or refining an interface, I focus on making digital experiences intelligent, transparent, and meaningful.
              </p>

              <div className="about-tags">
                <span className="tag">
                  <i className="fas fa-code"></i> Intelligent Systems
                </span>
                <span className="tag">
                  <i className="fas fa-palette"></i> Purposeful Design
                </span>
                <span className="tag">
                  <i className="fas fa-rocket"></i> Systems Thinking
                </span>
              </div>
            </motion.div>

            <motion.div
              className="skills-section"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Skills & Expertise</h3>
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  className="skill-item"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      style={{ background: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              className="timeline-item"
              key={exp.title + exp.company}
              initial={{ opacity: 0, x: i % 2 ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="timeline-marker">{exp.icon}</div>
              <div className="timeline-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <div className="meta">
                  <time>{exp.period}</time> • <span>{exp.location}</span>
                </div>
                <ul className="bullets">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="skills">
                  {exp.tech.map(s => (
                    <span key={s} className="skill-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <motion.h2
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <span className="gradient-text">Featured Projects</span>
          </motion.h2>

          <div className="projects-grid">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="project-card hover-3d reveal-on-scroll"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  y: -15,
                  transition: { duration: 0.3 }
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  {!project.private && (
                    <div className="project-overlay">
                      <motion.a
                        href={project.demo}
                        className="project-link liquid-button"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="View Demo"
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </motion.a>
                      <motion.a
                        href={project.github}
                        className="project-link liquid-button"
                        whileHover={{ scale: 1.2, rotate: -90 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="View Code"
                      >
                        <i className="fab fa-github"></i>
                      </motion.a>
                    </div>)}
                </div>
                <div className="project-content">
                  <h3 className="text-reveal">{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, j) => (
                      <motion.span
                        key={j}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + j * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <span className="gradient-text">Get In Touch</span>
          </motion.h2>

          <div className="contact-content">
            <motion.p
              className="contact-intro"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </motion.p>

            <motion.form
              className="contact-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks for reaching out! I\'ll get back to you soon.');
              }}
            >
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <textarea rows="5" placeholder="Your Message" required />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-submit magnetic-button liquid-button ripple"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0) scale(1)';
                }}
              >
                Send Message
              </motion.button>
            </motion.form>

            <motion.div
              className="contact-info"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a href="mailto:cxu627@gmail.com" className="contact-link">
                <i className="fas fa-envelope"></i>
                cxu627@gmail.com
              </a>
              <a href="tel:+12815705118" className="contact-link">
                <i className="fas fa-phone"></i>
                +1 (281) 570-5118
              </a>
              <a href="#" className="contact-link">
                <i className="fas fa-map-marker-alt"></i>
                The Woodlands, TX
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Christine Xu</p>
          <div className="footer-links">
            <a href="/Christine_Xu_Resume_AppleAI.pdf" target="_blank" rel="noopener noreferrer" aria-label="Featured">
              <i className="fas fa-star"></i>
            </a>
            <a href="https://github.com/tinexu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/christinexu1211/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;