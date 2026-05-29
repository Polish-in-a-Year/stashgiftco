import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CustomerDashboard from './CustomerDashboard';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{textAlign: 'center', padding: '50px'}}>Loading...</div>;
  }

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </>
      ) : (
        <>
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}

function Admin() {
  const { isPrimaryAdmin } = useAuth();

  if (!isPrimaryAdmin) {
    return <div style={{textAlign: 'center', padding: '50px'}}>Access Denied</div>;
  }

  return <div style={{padding: '20px'}}>Admin Dashboard (coming soon)</div>;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}