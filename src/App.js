import React, { useState } from 'react';
import './App.css';
import { ref, push } from 'firebase/database';
import { db } from './firebase';
import Admin from './Admin';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    projectName: '',
    shipDate: '',
    shippingAddress: '',
    shippingPhone: '',
    occasion: '',
    giftIdeas: '',
    style: '',
    colors: '',
    budget: '',
    personalization: '',
    giftWrapping: 'Yes',
    cardText: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ordersRef = ref(db, 'orders');
    push(ordersRef, {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    });
    
    alert('Thank you! We will review your request and send suggestions within 72 hours.');
    
    setFormData({
      name: '',
      email: '',
      phonenumber: '',
      projectName: '',
      shipDate: '',
      shippingAddress: '',
      shippingPhone: '',
      occasion: '',
      giftIdeas: '',
      style: '',
      colors: '',
      budget: '',
      personalization: '',
      giftWraping: 'Yes',
      cardText: ''
    });
  };

  const isAdmin = window.location.pathname === '/admin';

  return isAdmin ? <Admin /> : (
    <div className="App">
      <header className="header">
  <img src={require('./logo.png')} alt="Stash Gift Co - Small Batch Handmade Heartfelt" className="logo-img" />
  <div className="header-text">
    <p>Allison, our founder, created this website for makers to use up their stash of supplies to create beautiful, custom handmade gifts and goodies on-demand!<br />Fill out the form below with your details, and you'll receive three personalized gift options. Pick the one you love, and once it ships, send payment as directed. Shipping can go to you or the recipient.<br />Making your life easier, one project at a time!</p>
  </div>
</header>
      
      <main className="container">
        <h2>Custom Gift Order Request</h2>
        <p className="note">Describe your gift, and you will receive three gift options to choose for your project. Expect the suggestions within 72 hours.</p>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Your Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Your Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Your Phone Number *</label>
            <input type="tel" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Project Name *</label>
            <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="e.g., Baby Shower, Teacher Gift" required />
          </div>

          <div className="form-group">
            <label>Date to Ship *</label>
            <input type="date" name="shipDate" value={formData.shipDate} onChange={handleChange} required />
          </div>

 <div className="form-group">
  <label>Shipping Label Information *</label>
  <textarea name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} placeholder="Recipient Name&#10;Street Address&#10;City, State ZIP" required />
</div>

          <div className="form-group">
            <label>Recipient's Phone Number *</label>
            <input type="tel" name="shippingPhone" value={formData.shippingPhone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Gift Occasion *</label>
            <input type="text" name="occasion" value={formData.occasion} onChange={handleChange} placeholder="e.g., Baby Shower, Birthday, Wedding" required />
          </div>

          <div className="form-group">
            <label>Gift Ideas</label>
            <textarea name="giftIdeas" value={formData.giftIdeas} onChange={handleChange} placeholder="e.g., Throw pillow, Fabric lovey, Baby blanket, Tote bag, Zipper pouch, Bunting banner, Stuffed animal, Hat, Catholic Discernment Deck Bundle, Wooden teether with lovey, Quilted wall art with name" />
          </div>

          <div className="form-group">
            <label>Style/Aesthetic</label>
            <input type="text" name="style" value={formData.style} onChange={handleChange} placeholder="e.g., Modern, Cozy, Whimsical, Minimalist" />
          </div>

          <div className="form-group">
            <label>Colors/Preferences</label>
            <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="e.g., Pastels, Neutrals, Bright, Rainbow" />
          </div>

          <div className="form-group">
            <label>Budget *</label>
            <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g., $50-75" required />
          </div>

          <div className="form-group">
            <label>Personalization</label>
            <textarea name="personalization" value={formData.personalization} onChange={handleChange} placeholder="Names, initials, special requests?" />
          </div>

<div className="form-group">
  <label>Do you want gift wrapping included?</label>
  <div className="radio-group">
    <label className="radio-label">
      <input type="radio" name="giftWrapping" value="Yes" checked={formData.giftWrapping === 'Yes'} onChange={handleChange} />
      Yes
    </label>
    <label className="radio-label">
      <input type="radio" name="giftWrapping" value="No" checked={formData.giftWrapping === 'No'} onChange={handleChange} />
      No
    </label>
  </div>
</div>

          <div className="form-group">
            <label>Card Message/Text (Optional with gift wrapping.)</label>
            <textarea name="cardText" value={formData.cardText} onChange={handleChange} placeholder="What would you like the card to say?" />
          </div>

          <button type="submit" className="submit-btn">Submit Order Request</button>
        </form>

  <p className="footer-note">All requests will be taken into consideration. No materials will be held until the order proposal is confirmed.<br /><br /><small>Created by Allison O'Dell</small></p>

<p className="footer-note" style={{marginTop: '30px', fontStyle: 'italic'}}>If you know a maker with a stash and a love of making gifts, have them contact <a href="mailto:Allison@AllisonODell.com" style={{color: '#f472b6', textDecoration: 'none'}}>Allison@AllisonODell.com</a> to apply to join Stash Gift Co.</p>
      </main>
    </div>
  );
}