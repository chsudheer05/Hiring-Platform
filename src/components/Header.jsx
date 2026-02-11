
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="topbar" id="heroNav">
      <div className="topbar__inner">
        <Link className="brand" to="/" aria-label="Home">
          <span className="brand__logo"></span>
          <span className="brand__text">
            <span className="brand__name">
              <span className="brand__accent"> V hire U</span>
              <span className="brand__dot">.</span>
              <span className="brand__rest">tech</span>
            </span>
            <span className="brand__tag">The Premium Tech-Job Specialist</span>
          </span>
        </Link>

        <div className="topbar__actions">
          <Link className="tbtn tbtn--ghost" to="/recruiter">Recruiter</Link>
          <Link className="tbtn tbtn--solid" to="/jobseeker">Jobseeker</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
