import React, { useEffect, useState } from 'react';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${baseURL}/report`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => setError('❌ Failed to load reports'));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '2rem' }}>
      <h2>📊 Submitted Reports</h2>
      {error && <p>{error}</p>}
      {reports.map((r, i) => (
        <div key={i} style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '8px',
          backgroundColor: '#f5f5f5'
        }}>
          <p><strong>📝 Description:</strong> {r.description}</p>
          <p><strong>📍 Location:</strong> {r.locationName}</p>
          <p><strong>📌 Coordinates:</strong> {r.coordinates.join(', ')}</p>
          <p><strong>🧑 Reporter:</strong> {r.reporterName}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportList;

