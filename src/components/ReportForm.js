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
      const response = await fetch(`${baseURL}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description,
          locationName,
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
          reporterName
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('✅ Report submitted successfully!');
        console.log(data);
      } else {
        setMessage('❌ Failed to submit report');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
      <input type="text" name="locationName" placeholder="Location Name" onChange={handleChange} required />
      <input type="number" name="latitude" placeholder="Latitude" onChange={handleChange} required />
      <input type="number" name="longitude" placeholder="Longitude" onChange={handleChange} required />
      <input type="text" name="reporterName" placeholder="Your Name" onChange={handleChange} required />
      <button type="submit">Submit Report</button>
      <p>{message}</p>
    </form>
  );
};

export default ReportForm;
