import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Building2, Globe, Image as ImageIcon, CheckCircle } from 'lucide-react';
import '../styles/Registrations.css';

const Recruiter = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyEmail: '',
    companyName: '',
    companyWebsite: '',
    teamSize: '',
    hiringNeeds: '',
    companyLogo: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, companyLogo: e.target.files[0] }));
    }
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate MongoDB integration
    console.log('Recruiter registration data:', formData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const progress = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-card"
          >
            <div className="step-header">
              <h1>How can we reach you? *</h1>
            </div>
            <div className="input-group">
              <div className="input-row">
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="Enter your first name" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  autoFocus
                />
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Enter your last name" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <input 
                type="email" 
                name="companyEmail" 
                placeholder="Enter your company email" 
                value={formData.companyEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-footer">
              <div className="helper-text">
                Already hiring on HireU? <a href="#">Log in</a>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-card"
          >
            <div className="step-header">
              <h1>Tell us about your company *</h1>
            </div>
            <div className="input-group">
              <div className="input-row" style={{ alignItems: 'center' }}>
                <Building2 size={24} color="#888" />
                <input 
                  type="text" 
                  name="companyName" 
                  placeholder="Company Name" 
                  value={formData.companyName}
                  onChange={handleInputChange}
                  autoFocus
                />
              </div>
              <div className="input-row" style={{ alignItems: 'center' }}>
                <Globe size={24} color="#888" />
                <input 
                  type="text" 
                  name="companyWebsite" 
                  placeholder="Company Website (URL)" 
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                />
              </div>
              <input 
                type="text" 
                name="teamSize" 
                placeholder="Team Size (e.g. 10-50)" 
                value={formData.teamSize}
                onChange={handleInputChange}
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-card"
          >
            <div className="step-header">
              <h1>What roles are you looking to fill? *</h1>
            </div>
            <div className="input-group">
              <textarea 
                name="hiringNeeds" 
                placeholder="Describe the positions you're currently hiring for..." 
                rows="4"
                value={formData.hiringNeeds}
                onChange={handleInputChange}
                autoFocus
                style={{ resize: 'none' }}
              />
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-card"
          >
            <div className="step-header">
              <h1>Company Branding *</h1>
            </div>
            <p className="helper-text" style={{ marginBottom: '1rem' }}>Upload your company logo to help job seekers recognize you.</p>
            <div className="input-group">
              <label className="file-upload-container">
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                />
                <div className="file-upload-icon">
                  <ImageIcon size={48} />
                </div>
                <h3>{formData.companyLogo ? 'Change Logo' : 'Upload Company Logo'}</h3>
                <p className="helper-text">PNG, JPG, SVG up to 5MB</p>
                {formData.companyLogo && (
                  <div className="file-name" style={{ color: '#ff6a00' }}>
                     {formData.companyLogo.name}
                  </div>
                )}
              </label>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="registration-container">
        <div className="form-content">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="step-card"
            style={{ textAlign: 'center' }}
          >
            <div style={{ color: '#4CAF50', marginBottom: '2rem' }}>
              <CheckCircle size={80} style={{ margin: '0 auto' }} />
            </div>
            <h1>Welcome to the Network!</h1>
            <p className="helper-text" style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
              Your company profile has been created. Start finding top talent today.
            </p>
            <button 
              className="next-button" 
              style={{ margin: '2rem auto 0' }}
              onClick={() => navigate('/')}
            >
              Go to Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%`, backgroundColor: '#ff6a00' }}
        ></div>
      </div>

      {step > 1 ? (
        <button className="back-button" onClick={prevStep}>
          <ArrowLeft size={18} /> Back
        </button>
      ) : (
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Exit
        </button>
      )}

      <div className="form-content">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="form-footer">
          <div className="helper-text">
            {step === 1 ? (
              <>Looking for a job? <a href="/jobseeker">Apply here</a></>
            ) : null}
          </div>
          
          <div className="next-action">
            <span className="press-enter">Press enter ↵ or</span>
            <button 
              className="next-button" 
              onClick={nextStep}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : step === totalSteps ? 'Complete' : 'Next'}
              <div className="button-icon">
                <ChevronRight size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
