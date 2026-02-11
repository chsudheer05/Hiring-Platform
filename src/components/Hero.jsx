import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [experience, setExperience] = useState("");

  const locations = [
    "Hyderabad", "Bengaluru", "Chennai", "Pune", "Mumbai", "Delhi NCR", "Remote", "Hybrid"
  ];

  const handleLocationToggle = (loc) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const getLocationsLabel = () => {
    if (selectedLocations.length === 0) return "Locations";
    if (selectedLocations.length <= 2) return selectedLocations.join(", ");
    return `${selectedLocations.length} Locations`;
  };

  useEffect(() => {
    const handleClickOutside = () => setIsLocationOpen(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <section className="hero hero-search" id="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Handpicked Premium <span>Machine Learning</span> Jobs
        </h1>

        <div className="search-card" role="search" aria-label="Job search">
          <div className="search-field">
            <span className="icon" aria-hidden="true">
              <Search size={20} color="#fff" style={{ opacity: 0.75 }} />
            </span>
            <input type="text" placeholder="Search Jobs" aria-label="Search Jobs" />
          </div>

          <div className="divider"></div>

          <div 
            className={`search-field checkbox-dropdown ${isLocationOpen ? 'open' : ''}`} 
            id="locationDropdown"
            onClick={(e) => {
              e.stopPropagation();
              setIsLocationOpen(!isLocationOpen);
            }}
          >
            <button type="button" className="dropdown-toggle" id="locationBtn">
              <span id="locationLabel">{getLocationsLabel()}</span>
              <span className="chev"><ChevronDown size={16} /></span>
            </button>

            {isLocationOpen && (
              <div className="dropdown-menu" id="locationMenu" onClick={(e) => e.stopPropagation()}>
                {locations.map(loc => (
                  <label key={loc}>
                    <input 
                      type="checkbox" 
                      value={loc} 
                      checked={selectedLocations.includes(loc)}
                      onChange={() => handleLocationToggle(loc)}
                    /> {loc}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="divider"></div>

          <div className="search-field select">
            <select 
              id="expSelect" 
              aria-label="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="" disabled>Experience</option>
              <option value="fresher">Fresher</option>
              <option value="0-1">0 - 1 Years</option>
              <option value="1-2">1 - 2 Years</option>
              <option value="2-3">2 - 3 Years</option>
              <option value="3-5">3 - 5 Years</option>
              <option value="5-7">5 - 7 Years</option>
              <option value="7-10">7 - 10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
            <div className="select-arrow"></div>
          </div>

          <button className="search-btn" type="button">Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
