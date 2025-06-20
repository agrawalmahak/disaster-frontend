import React, { useEffect, useState } from 'react';

// Base URL from .env file
const baseURL = process.env.REACT_APP_API_BASE_URL;

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('📡 Fetching from:', baseURL);
    fetch(`${baseURL}/api/reports`)  // 🔁 Add correct API route
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(data => setReports(data))
      .catch(err => {
        console.error('❌ Fetch error:', err);
        setError('❌ Failed to load reports');
      });
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', marginTop: '2rem' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>📊 Submitted Reports</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {reports.length === 0 && !error && <p style={{ textAlign: 'center' }}>No reports submitted yet.</p>}

      {reports.map((r, i) => {
          console.log("📦 Report received from API:", r);
       return ( <div key={i} style={{
          border: '1px solid #e1e1e1',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '12px',
          backgroundColor: '#fdfefe',
          boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
        }}>
        
        <p><strong>📝 Report:</strong> {r.content}</p>
  <p><strong>🧑 Reporter:</strong> {r.user_id}</p>
  <p><strong>🖼️ Image URL:</strong> {r.image_url || 'N/A'}</p>
  <p><strong>✅ Status:</strong> {r.verification_status}</p>
  <p><strong>📅 Submitted:</strong> {r.created_at ? new Date(r.created_at).toLocaleString() : 'N/A'}</p>
        </div>
       );
})}
    </div>
  );
};

export default ReportList;
