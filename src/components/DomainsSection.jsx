import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DATA = {
  aiml: {
    wall: ["python", "pytorch", "huggingface", "openai", "fastapi", "googlecloud"],
    tiles: [
      { name: "Python", slug: "python" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "Hugging Face", slug: "huggingface" },
      { name: "OpenAI", slug: "openai" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "GCP", slug: "googlecloud" },
    ]
  },
  fullstack: {
    wall: ["react", "nextdotjs", "nodedotjs", "postgresql", "docker", "amazonaws"],
    tiles: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Docker", slug: "docker" },
      { name: "AWS", slug: "amazonaws" },
    ]
  },
  datascience: {
    wall: ["pandas", "numpy", "scikitlearn", "jupyter", "apachehadoop", "apachekafka"],
    tiles: [
      { name: "Pandas", slug: "pandas" },
      { name: "NumPy", slug: "numpy" },
      { name: "Scikit-learn", slug: "scikitlearn" },
      { name: "Jupyter", slug: "jupyter" },
      { name: "Hadoop", slug: "apachehadoop" },
      { name: "Kafka", slug: "apachekafka" },
    ]
  },
  devops: {
    wall: ["docker", "kubernetes", "terraform", "githubactions", "prometheus", "grafana"],
    tiles: [
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Terraform", slug: "terraform" },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "Prometheus", slug: "prometheus" },
      { name: "Grafana", slug: "grafana" },
    ]
  },
  qa: {
    wall: ["selenium", "cypress", "playwright", "postman", "jest", "linux"],
    tiles: [
      { name: "Selenium", slug: "selenium" },
      { name: "Cypress", slug: "cypress" },
      { name: "Playwright", slug: "playwright" },
      { name: "Postman", slug: "postman" },
      { name: "Jest", slug: "jest" },
      { name: "Linux", slug: "linux" },
    ]
  }
};

const ICON = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;

const DomainsSection = () => {
  const [activeTab, setActiveTab] = useState("aiml");
  const tabsRef = useRef(null);

  const currentData = DATA[activeTab];

  const scrollTabs = (dir) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  const tileStyle = {
    padding: "34px",
    objectFit: "contain",
    background:
      "radial-gradient(120% 80% at 30% 20%, rgba(0,255,230,0.10), rgba(0,0,0,0) 58%)," +
      "radial-gradient(120% 90% at 80% 70%, rgba(140,170,255,0.10), rgba(0,0,0,0) 60%)," +
      "rgba(255,255,255,0.03)",
    filter: "invert(1) brightness(1.2) contrast(1.1) drop-shadow(0 0 18px rgba(0,255,230,0.20))"
  };

  const wallLogoStyle = {
    filter: "invert(1) brightness(1.25) drop-shadow(0 0 14px rgba(0,255,230,0.18))"
  };

  return (
    <section className="domains" id="domains">
      <div className="domains-shell">
        <div className="domains-glow"></div>

        <div className="stats-row">
          <div className="stat-pill"><span className="dot"></span> 3 Million+ <small>Talent Network</small></div>
          <div className="stat-pill"><span className="dot"></span> 1 Million+ <small>Followers</small></div>
          <div className="stat-pill"><span className="dot"></span> 126+ <small>Reviews</small></div>
        </div>

        <div className="dom-top">
          <div className="dom-title">
            <h3>Explore Domains</h3>
            <p>Hover a category to instantly preview the tech stack.</p>
          </div>

          <div className="dom-arrows">
            <button className="dom-arrow" onClick={() => scrollTabs(-1)} aria-label="Scroll left"><ChevronLeft /></button>
            <button className="dom-arrow" onClick={() => scrollTabs(1)} aria-label="Scroll right"><ChevronRight /></button>
          </div>
        </div>

        <div className="dom-tabs" ref={tabsRef} aria-label="Domains">
          {Object.keys(DATA).map(key => (
            <button 
              key={key}
              className={`dom-tab ${activeTab === key ? 'active' : ''}`}
              onMouseEnter={() => setActiveTab(key)}
              onClick={() => setActiveTab(key)}
              type="button"
            >
              {key === 'aiml' ? 'AI/ML Engineers' : 
               key === 'fullstack' ? 'Full Stack' : 
               key === 'datascience' ? 'Data Scientist' : 
               key.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="logo-wall" id="logoWall">
          {currentData.wall.map(slug => (
            <div className="logo" key={slug} title={slug}>
              <img src={ICON(slug)} alt={slug} style={wallLogoStyle} />
            </div>
          ))}
        </div>

        <div className="dom-grid" id="domGrid">
          {currentData.tiles.map(tile => (
            <div className="dom-tile" key={tile.slug} tabIndex="0" aria-label={tile.name}>
              <img src={ICON(tile.slug)} alt={tile.name} style={tileStyle} />
              <div className="dom-label">{tile.name} <small>tech</small></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
