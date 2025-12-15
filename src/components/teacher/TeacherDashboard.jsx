import React from 'react';

function TeacherDashboard({ onLogout }) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>👨‍🏫 Panel de Professor/a</h1>
        <button onClick={onLogout} className="logout-btn">Tancar Sessió</button>
      </header>
      <main className="dashboard-content">
        <div className="dashboard-menu">
          <button className="menu-btn">📚 Gestionar Roscos</button>
          <button className="menu-btn">🏆 Veure Rànquing</button>
          <button className="menu-btn">⚙️ Configuració</button>
        </div>
        <p style={{color: 'white', marginTop: '2rem', textAlign: 'center'}}>
          Funcionalitats en desenvolupament...
        </p>
      </main>
    </div>
  );
}

export default TeacherDashboard;
