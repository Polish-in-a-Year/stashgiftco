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
            <p>I'm using up my stash of supplies to create beautiful, custom handmade gifts and goodies on-demand!</p>
            <br />
            <p>Fill out the form below with your details, and I'll suggest three personalized gift options. Pick the one you love, and once it ships, send payment via Venmo or Zelle.</p>
            <br />
            <p>Shipping can go to you or the recipient. You know it'll be so well done!</p>
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