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
          
      <div className="description">
            <h2 className="main-heading">Hey, who told you about us?</h2>
            <h3 className="sub-heading">Yeah, we do gifts different.</h3>
            <p>Here, you share information about the type of gift you need, and we pass along some ideas.<br />It's all hush-hush.<br />When you agree, it's made for you to give (or keep)!</p>
            <br />
            <p>Let's just keep this between us.</p>
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