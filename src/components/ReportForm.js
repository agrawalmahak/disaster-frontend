import React, { useState } from 'react';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    locationName: '',
    latitude: '',
    longitude: '',
    reporterName: ''
  });

  const [message, setMessage] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { description, locationName, latitude, longitude, reporterName } = formData;

    try {
      const payload = {
        description,
        locationName,
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
        reporterName
      };

      console.log('Submitting:', payload); // ✅ Debug log

      const response = await fetch(`${baseURL}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('Response:', data); // ✅ Debug log

      if (response.ok) {
        setMessage('✅ Report submitted successfully!');
        setFormData({
          description: '',
          locationName: '',
          latitude: '',
          longitude: '',
          reporterName: ''
        });
      } else {
        setMessage(`❌ Error: ${data.message || 'Failed to submit report'}`);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setMessage('❌ Network error or server not responding.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>📋 Submit a Disaster Report</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Description:</label>
        <input type="text" name="description" placeholder="e.g. Flood in city" value={formData.description} onChange={handleChange} required />

        <label>Location Name:</label>
        <input type="text" name="locationName" placeholder="e.g. Patna, Bihar" value={formData.locationName} onChange={handleChange} required />

        <label>Latitude:</label>
        <input type="number" step="any" name="latitude" placeholder="e.g. 25.60" value={formData.latitude} onChange={handleChange} required />

        <label>Longitude:</label>
        <input type="number" step="any" name="longitude" placeholder="e.g. 85.15" value={formData.longitude} onChange={handleChange} required />

        <label>Your Name:</label>
        <input type="text" name="reporterName" placeholder="e.g. Mahak" value={formData.reporterName} onChange={handleChange} required />

        <button type="submit">📨 Submit Report</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 0px 8px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
};

export default ReportForm;
