import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    performance: false,
    targeting: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookie-consent");
    if (!cookieChoice) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(cookieChoice);
      setPreferences(saved);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      performance: true,
      targeting: true
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setShowBanner(false);
    // In production, load analytics scripts here
  };

  const handleEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      performance: false,
      targeting: false
    };
    localStorage.setItem("cookie-consent", JSON.stringify(essentialOnly));
    setPreferences(essentialOnly);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
  };

  const togglePreference = (key) => {
    if (key !== "essential") { // Essential can't be toggled off
      setPreferences(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="cookie-banner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cookie-content">
              <div className="cookie-text">
                <h3>We value your privacy</h3>
                <p>
                  Emmanuel Solutions uses cookies to enhance your experience, analyze site usage, and deliver relevant content. 
                  <button 
                    className="cookie-details-link"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    Learn about our cookies →
                  </button>
                </p>

                {showDetails && (
                  <motion.div 
                    className="cookie-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="cookie-type">
                      <div className="cookie-type-header">
                        <input 
                          type="checkbox" 
                          checked={preferences.essential}
                          disabled
                          id="essential-check"
                        />
                        <label htmlFor="essential-check">
                          <strong>Essential Cookies</strong> (Always Active)
                        </label>
                      </div>
                      <p className="cookie-type-desc">
                        Necessary for the site to function and provide a secure experience. These are always enabled.
                      </p>
                    </div>

                    <div className="cookie-type">
                      <div className="cookie-type-header">
                        <input 
                          type="checkbox" 
                          checked={preferences.performance}
                          onChange={() => togglePreference("performance")}
                          id="performance-check"
                        />
                        <label htmlFor="performance-check">
                          <strong>Performance Cookies</strong>
                        </label>
                      </div>
                      <p className="cookie-type-desc">
                        Help us understand how you interact with our content so we can provide more relevant insights and articles.
                      </p>
                    </div>

                    <div className="cookie-type">
                      <div className="cookie-type-header">
                        <input 
                          type="checkbox" 
                          checked={preferences.targeting}
                          onChange={() => togglePreference("targeting")}
                          id="targeting-check"
                        />
                        <label htmlFor="targeting-check">
                          <strong>Advertising Cookies</strong>
                        </label>
                      </div>
                      <p className="cookie-type-desc">
                        Used to show you relevant content across our site and partner platforms. Don't store personal information.
                      </p>
                    </div>

                    <a href="/privacy-policy" className="cookie-privacy-link">
                      View our full Privacy Policy →
                    </a>
                  </motion.div>
                )}
              </div>

              <div className="cookie-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={handleEssentialOnly}
                >
                  Essential Only
                </button>
                {showDetails && (
                  <button 
                    className="btn btn-secondary"
                    onClick={handleSavePreferences}
                  >
                    Save Preferences
                  </button>
                )}
                <button 
                  className="btn btn-primary"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
