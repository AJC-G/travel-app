import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch('/api/trips', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTrips(data);
    } catch (err) {
      setError('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const newTrip = await response.json();
        setTrips([...trips, newTrip]);
        setFormData({ title: '', destination: '', startDate: '', endDate: '', budget: '' });
        setShowForm(false);
      }
    } catch (err) {
      setError('Failed to create trip');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="container">
        <h1>Welcome, {user?.name}! 🎉</h1>
        <p>Plan and manage your travels</p>

        {error && <div className="alert alert-error">{error}</div>}

        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Trip'}
        </button>

        {showForm && (
          <div className="card" style={{ marginTop: '20px' }}>
            <h3 className="card-header">Create New Trip</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Budget ($)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Create Trip</button>
            </form>
          </div>
        )}

        <div className="trips-grid">
          {trips.map(trip => (
            <div key={trip._id} className="trip-card">
              <h3>{trip.title}</h3>
              <p><strong>📍 Destination:</strong> {trip.destination}</p>
              <p><strong>💰 Budget:</strong> ${trip.budget}</p>
              <div className="trip-dates">
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {trips.length === 0 && !showForm && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p>No trips yet. Create your first trip! ✈️</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
