import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getDatabase, ref, onValue } from 'firebase/database';
import './CustomerDashboard.css';

export default function CustomerDashboard() {
  const { user, userProfile, logOut } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    if (!user) return;

    const projectsRef = ref(db, `customers/${user.uid}/projects`);
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const projectsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProjects(projectsList);
      } else {
        setProjects([]);
      }
    });

    return unsubscribe;
  }, [user, db]);

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

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={require('./logo.png')} alt="Logo" className="dashboard-logo" />
        <div className="header-right">
          <button className="share-btn" onClick={handleShare}>Share</button>
          <button className="logout-btn" onClick={handleLogOut}>Log Out</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="profile-section">
          <h1>Welcome, {userProfile?.displayName}!</h1>
          <div className="contact-info">
            <p><strong>Email:</strong> {userProfile?.contactInfo?.email}</p>
            <p><strong>Phone:</strong> {userProfile?.contactInfo?.phone || 'Not provided'}</p>
            <p><strong>Address:</strong> {userProfile?.contactInfo?.address || 'Not provided'}</p>
          </div>
        </div>

        <div className="projects-section">
          <h2>Your Projects</h2>
          <button className="add-project-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Project Request'}
          </button>

          {showForm && <ProjectForm onSubmit={() => setShowForm(false)} />}

          {projects.length === 0 && !showForm ? (
            <p className="no-projects">No projects yet. Create your first one!</p>
          ) : (
            <div className="projects-list">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.projectName}</h3>
                  <p><strong>Occasion:</strong> {project.occasion}</p>
                  <p><strong>Budget:</strong> ${project.budget}</p>
                  <p><strong>Status:</strong> {project.status || 'Pending'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectForm({ onSubmit }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    projectName: '',
    occasion: '',
    recipient: '',
    budget: '',
    shipDate: '',
    giftIdeas: '',
    style: '',
    colors: '',
    personalization: '',
    giftWrapping: 'Yes'
  });
  const db = getDatabase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectId = Date.now().toString();
    await import('firebase/database').then(({ ref, set }) => {
      set(ref(db, `customers/${user.uid}/projects/${projectId}`), {
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    });

    alert('Project request submitted!');
    onSubmit();
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Project Name</label>
        <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Occasion</label>
        <input type="text" name="occasion" value={formData.occasion} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Who is this for?</label>
        <input type="text" name="recipient" value={formData.recipient} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Budget</label>
        <input type="number" name="budget" value={formData.budget} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Ship Date</label>
        <input type="date" name="shipDate" value={formData.shipDate} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Gift Ideas</label>
        <textarea name="giftIdeas" value={formData.giftIdeas} onChange={handleChange}></textarea>
      </div>

      <div className="form-group">
        <label>Style/Aesthetic</label>
        <input type="text" name="style" value={formData.style} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Colors</label>
        <input type="text" name="colors" value={formData.colors} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Personalization</label>
        <textarea name="personalization" value={formData.personalization} onChange={handleChange}></textarea>
      </div>

      <div className="form-group">
        <label>Gift Wrapping?</label>
        <select name="giftWrapping" value={formData.giftWrapping} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Submit Project Request</button>
    </form>
  );
}