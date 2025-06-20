import React, { useState, useEffect } from 'react';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    latitude: '',
    longitude: '',
    reporterName: ''
  });

  const [disasters, setDisasters] = useState([]);
  const [selectedDisasterId, setSelectedDisasterId] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  // ✅ Load disasters from backend
  useEffect(() => {
    fetch(`${baseURL}/api/disasters`)
      .then(res => res.json())
      .then(data => setDisasters(data))
      .catch(err => console.error('❌ Failed to load disasters:', err));
  }, [baseURL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { description, latitude, longitude, reporterName } = formData;

    if (!selectedDisasterId) {
      setMessage('❌ Please select a disaster');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        disaster_id: selectedDisasterId,
        user_id: reporterName || 'guest',
        content: description,
        image_url: ''
      };

      const response = await fetch(`${baseURL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Report submitted successfully!');
        setFormData({
          description: '',
          latitude: '',
          longitude: '',
          reporterName: ''
        });
        setSelectedDisasterId('');
      } else {
        setMessage(`❌ Error: ${data.message || 'Failed to submit report'}`);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setMessage('❌ Network error or server not responding.');
    }

    setSubmitting(false);
  };

  return (
    <div style={styles.container}>
      <h2>📋 Submit a Disaster Report</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Select Disaster:</label>
        <select
          required
          value={selectedDisasterId}
          onChange={(e) => setSelectedDisasterId(e.target.value)}
        >
          <option value="">-- Choose Disaster --</option>
          {disasters.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title} ({d.location_name})
            </option>
          ))}
        </select>

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Your Name:</label>
        <input
          type="text"
          name="reporterName"
          value={formData.reporterName}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : '📨 Submit Report'}
        </button>
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
