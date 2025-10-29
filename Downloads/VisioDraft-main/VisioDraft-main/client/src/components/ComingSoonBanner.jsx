import React, { useState, useEffect } from "react";

/**
 * ComingSoonBanner with Countdown
 * ------------------------------------------------------------
 * Shows a go‑live banner for PYQs with a live countdown timer until launch.
 * 
 * Features:
 * - Responsive design with smooth animations
 * - Accessible ARIA labels and roles
 * - Customizable styling through CSS variables
 * - Automatic hiding when live (configurable)
 * - Graceful error handling
 * 
 * Usage:
 * <ComingSoonBanner />
 * 
 * Override defaults:
 * <ComingSoonBanner 
 *   message="PYQs will be live soon" 
 *   goLiveAt="2025-09-04T10:00:00+05:30" 
 *   autoHideWhenLive={false}
 * />
 */

const CONFIG = {
  goLiveAt: "2025-09-05T10:00:00+05:30", // default go live time
  message: "More PYQs will be live from friday 10 AM 🚀",
  autoHideWhenLive: true,
};

// Format date in IST with proper error handling
function formatISTDateTime(isoString) {
  try {
    const dt = new Date(isoString);
    // Check if date is valid
    if (isNaN(dt.getTime())) {
      throw new Error("Invalid date");
    }
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(dt);
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Invalid date";
  }
}

// Calculate remaining time with validation
function getRemaining(goLiveAtISO) {
  try {
    const now = new Date();
    const goLive = new Date(goLiveAtISO);
    
    // Validate date
    if (isNaN(goLive.getTime())) {
      throw new Error("Invalid goLiveAt date");
    }
    
    const diff = goLive.getTime() - now.getTime();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  } catch (e) {
    console.error("Error calculating remaining time:", e);
    return null;
  }
}

export default function ComingSoonBanner({ 
  message, 
  goLiveAt, 
  autoHideWhenLive,
  className = "" 
}) {
  const finalGoLiveAt = goLiveAt || CONFIG.goLiveAt;
  const finalMessage = message || CONFIG.message;
  const finalAutoHide = autoHideWhenLive ?? CONFIG.autoHideWhenLive;

  const [remaining, setRemaining] = useState(() => getRemaining(finalGoLiveAt));
  const [isVisible, setIsVisible] = useState(true);
  const live = !remaining;

  useEffect(() => {
    // If we should auto-hide and we're live, don't set up the interval
    if (finalAutoHide && live) {
      const timer = setTimeout(() => setIsVisible(false), 5000); // Fade out after 5 seconds
      return () => clearTimeout(timer);
    }
    
    if (live) return;
    
    const timer = setInterval(() => {
      setRemaining(getRemaining(finalGoLiveAt));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [finalGoLiveAt, remaining, finalAutoHide, live]);

  // Don't render if we're hidden or if we should auto-hide and we're live
  if (!isVisible || (finalAutoHide && live)) return null;

  return (
    <div 
      className={`coming-soon-banner ${className} ${!isVisible ? 'fade-out' : 'fade-in'}`}
      role="status"
      aria-live="polite"
    >
      <div className="banner-container">
        <div className="banner-content">
          <div className="status-indicator-content">
            <span
              className={`status-indicator ${live ? "live" : "coming-soon"}`}
              aria-hidden="true"
            />
            <div className="message-container">
              <p className="main-message">{finalMessage}</p>
              <p className="go-live-info">
                Planned go‑live: <span className="go-live-time">{formatISTDateTime(finalGoLiveAt)} IST</span>
              </p>
              {!live && remaining && (
                <p className="countdown">
                  ⏳ {remaining.days > 0 ? `${remaining.days}d ` : ''}
                  {remaining.hours}h {remaining.minutes}m {remaining.seconds}s left
                </p>
              )}
            </div>
          </div>
          <div className="status-badge-container">
            {live ? (
              <span className="status-badge live">
                Live now
              </span>
            ) : (
              <span className="status-badge coming-soon">
                Coming soon
              </span>
            )}
            {live && finalAutoHide && (
              <button 
                className="close-button"
                onClick={() => setIsVisible(false)}
                aria-label="Close banner"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .coming-soon-banner {
          width: 100%;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-out {
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
        }
        
        .banner-container {
          margin: 0 auto;
          max-width: 72rem;
          border-radius: 1rem;
          border: 1px solid #e5e7eb;
          background-color: white;
          padding: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        
        .banner-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        @media (min-width: 640px) {
          .banner-content {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        
        .status-indicator-content {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .status-indicator {
          flex-shrink: 0;
          margin-top: 0.25rem;
          height: 0.75rem;
          width: 0.75rem;
          border-radius: 9999px;
        }
        
        .status-indicator.coming-soon {
          background-color: #f59e0b;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .status-indicator.live {
          background-color: #10b981;
        }
        
        .message-container {
          flex: 1;
        }
        
        .main-message {
          font-size: 1rem;
          line-height: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }
        
        .go-live-info {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #4b5563;
          margin: 0;
          margin-top: 0.25rem;
        }
        
        .go-live-time {
          font-weight: 500;
        }
        
        .countdown {
          font-size: 0.75rem;
          line-height: 1rem;
          color: #6b7280;
          margin: 0;
          margin-top: 0.5rem;
        }
        
        .status-badge-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        @media (min-width: 640px) {
          .status-badge-container {
            margin-top: 0;
          }
        }
        
        .status-badge {
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          font-weight: 500;
        }
        
        .status-badge.coming-soon {
          background-color: #fffbeb;
          color: #b45309;
          border: 1px solid #fcd34d;
        }
        
        .status-badge.live {
          background-color: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.25rem;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-button:hover {
          background-color: #f3f4f6;
          color: #374151;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}