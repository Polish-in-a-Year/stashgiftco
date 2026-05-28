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
    wrappingStyle: '',
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
      wrappingStyle: '',
      cardText: ''
    });
  };

  const isAdmin = window.location.pathname === '/admin';

  return isAdmin ? <Admin /> : (
    <div className="App">
      <header className="header">
        <img src="/logo.png" alt="Stash Gift Co Logo" className="logo-img" />
<h1>Stash Gift Co.</h1>
        <p>Small Batch · Handmade · Heartfelt</p>
      </header>
      
      <main className="container">
        <h2>Custom Gift Order Request</h2>
        <p className="note">Tell us about your gift, and we'll curate 3 beautiful options from our stash. Expect our suggestions within 72 hours.</p>
        
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
            <label>Shipping Address *</label>
            <textarea name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} placeholder="Street, City, State, ZIP" required />
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
            <label>Wrapping Style</label>
            <input type="text" name="wrappingStyle" value={formData.wrappingStyle} onChange={handleChange} placeholder="e.g., Elegant, Fun, Minimalist" />
          </div>

          <div className="form-group">
            <label>Card Message/Text</label>
            <textarea name="cardText" value={formData.cardText} onChange={handleChange} placeholder="What would you like the card to say?" />
          </div>

          <button type="submit" className="submit-btn">Submit Order Request</button>
        </form>

        <p className="footer-note">All requests will be taken into consideration. No materials will be held until the order proposal is confirmed.</p>
      </main>
    </div>
  );
}