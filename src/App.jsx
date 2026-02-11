import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuroraBg from './components/AuroraBg';
import TreeLayer from './components/TreeLayer';
import Header from './components/Header';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import DomainsSection from './components/DomainsSection';
import HireUFooter from './components/HireUFooter';

import JobSeeker from './components/JobSeeker'
import Recruiter from './components/Recruiter'

const Home = () => (
  <>
    <TreeLayer />
    <Header />
    <main>
      <Hero />
      <StorySection />

      <DomainsSection />
      <HireUFooter />
    </main>
  </>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <AuroraBg />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobseeker" element={<JobSeeker />} />
          <Route path="/recruiter" element={<Recruiter />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
