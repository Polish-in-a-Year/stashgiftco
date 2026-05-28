import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from './firebase';
import './Admin.css';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(['', '', '']);
  const [savingSuggestions, setSavingSuggestions] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      const ordersRef = ref(db, 'orders');
      const unsubscribe = onValue(ordersRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const ordersList = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
          }));
          setOrders(ordersList);
        } else {
          setOrders([]);
        }
        setLoading(false);
      }, (error) => {
        console.error('Firebase error:', error);
        setLoading(false);
      });
      
      return () => unsubscribe();
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'aodelladmin26' && password === 'Admin4stash26') {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedOrder(null);
    setSuggestions(['', '', '']);
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    if (order.suggestions) {
      setSuggestions([
        order.suggestions.suggestion1 || '',
        order.suggestions.suggestion2 || '',
        order.suggestions.suggestion3 || ''
      ]);
    } else {
      setSuggestions(['', '', '']);
    }
  };

  const handleSuggestionChange = (index, value) => {
    const newSuggestions = [...suggestions];
    newSuggestions[index] = value;
    setSuggestions(newSuggestions);
  };

  const handleSaveSuggestions = async () => {
    if (!selectedOrder) return;
    
    setSavingSuggestions(true);
    try {
      const updates_data = {};
      updates_data[`orders/${selectedOrder.id}/suggestions`] = {
        suggestion1: suggestions[0],
        suggestion2: suggestions[1],
        suggestion3: suggestions[2],
        savedAt: new Date().toISOString()
      };
      
      await update(ref(db), updates_data);
      alert('Suggestions saved!');
      setSavingSuggestions(false);
    } catch (error) {
      console.error('Error saving suggestions:', error);
      alert('Error saving suggestions');
      setSavingSuggestions(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h1>🎁 Stash Gift Co. Admin</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>📋 Order Management Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <main className="admin-main">
        <div className="orders-list">
          <h2>Incoming Orders ({orders.length})</h2>
          {loading ? (
            <p>Loading...</p>
          ) : orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li
                  key={order.id}
                  className={`order-item ${selectedOrder?.id === order.id ? 'active' : ''}`}
                  onClick={() => handleSelectOrder(order)}
                >
                  <div className="order-summary">
                    <strong>{order.projectName}</strong>
                    <span className="order-date">{new Date(order.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <small>{order.name}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="order-details">
          {selectedOrder ? (
            <div>
              <h2>{selectedOrder.projectName}</h2>
              <div className="order-info">
                <p><strong>Name:</strong> {selectedOrder.name}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.phonenumber}</p>
                <p><strong>Ship Date:</strong> {selectedOrder.shipDate}</p>
                <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
                <p><strong>Recipient Phone:</strong> {selectedOrder.shippingPhone}</p>
                <p><strong>Occasion:</strong> {selectedOrder.occasion}</p>
                <p><strong>Gift Ideas:</strong> {selectedOrder.giftIdeas}</p>
                <p><strong>Style:</strong> {selectedOrder.style}</p>
                <p><strong>Colors:</strong> {selectedOrder.colors}</p>
                <p><strong>Budget:</strong> {selectedOrder.budget}</p>
                <p><strong>Personalization:</strong> {selectedOrder.personalization}</p>
                <p><strong>Wrapping Style:</strong> {selectedOrder.wrappingStyle}</p>
                <p><strong>Card Message:</strong> {selectedOrder.cardText}</p>
              </div>
              <div className="suggestions-area">
                <h3>Add Your 3 Suggestions</h3>
                <div className="suggestion-form">
                  <div className="suggestion-input">
                    <label>Suggestion 1</label>
                    <textarea
                      value={suggestions[0]}
                      onChange={(e) => handleSuggestionChange(0, e.target.value)}
                      placeholder="Describe your first option..."
                      rows="4"
                    />
                  </div>
                  <div className="suggestion-input">
                    <label>Suggestion 2</label>
                    <textarea
                      value={suggestions[1]}
                      onChange={(e) => handleSuggestionChange(1, e.target.value)}
                      placeholder="Describe your second option..."
                      rows="4"
                    />
                  </div>
                  <div className="suggestion-input">
                    <label>Suggestion 3</label>
                    <textarea
                      value={suggestions[2]}
                      onChange={(e) => handleSuggestionChange(2, e.target.value)}
                      placeholder="Describe your third option..."
                      rows="4"
                    />
                  </div>
                  <button
                    onClick={handleSaveSuggestions}
                    disabled={savingSuggestions}
                    className="save-btn"
                  >
                    {savingSuggestions ? 'Saving...' : 'Save Suggestions'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select an order to view details</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}