
import React from 'react';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>🌐 Disaster Response Platform</h1>
      <ReportForm />
      <hr style={{ margin: '2rem 0' }} />
      <ReportList />
    </div>
  );
}

export default App;


