import React from 'react';
import './LandingPage.css';

export default function LandingPage() {
  const handleShare = () => {
    const shareText = `Check out Stash Gift Co! Custom handmade gifts made-to-order. ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: 'Stash Gift Co',
        text: shareText,
        url: window.location.href
      });
    } else {
      alert('Share link: ' + window.location.href);
    }
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <button className="share-btn-landing" onClick={handleShare}>Share</button>
      </header>

      <div className="landing-content">
        <div className="logo-section">
          <img src={require('./logo.png')} alt="Stash Gift Co Logo" className="landing-logo" />
        </div>

        <div className="info-section">
          <p className="tagline">Small Batch · Handmade · Heartfelt</p>
          
          <div className="description">
            <h2>Welcome to the best kept secret for handmade goods!</h2>
            <p>We’re a different kind of online marketplace.</p>
            <br />
            <p>Here, you share details of your gifting need by adding a Project Request. You can specify a maker or open it up to all our makers. Creativity takes over and suggestions are prepared for you to consider. When you accept a suggestion, it’s made for you to give (or keep)!</p>
            <br />
            <p>Small batch. Handmade. Heartfelt.</p>
          </div>


          <div className="auth-buttons">
            <a href="/signin" className="btn btn-primary">Sign In</a>
            <a href="/signup" className="btn btn-secondary">Create Account</a>
          </div>

          <div className="disclaimer">
            <p><strong>Stash Gift Co</strong> is created and operated by <strong>Allison O'Dell</strong>.</p>
            <br />
            <p>If you know a maker with a stash and a love of making gifts, have them contact <a href="mailto:Allison@AllisonODell.com">Allison@AllisonODell.com</a> to apply to join Stash Gift Co.</p>
          </div>
        </div>
      </div>
    </div>
  );
}