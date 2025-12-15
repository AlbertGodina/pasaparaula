import React from 'react';

function StudentDashboard({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🎓 Hola, {user.name}!</h1>
        <button onClick={onLogout} className="logout-btn">Tancar Sessió</button>
      </header>
      <main className="dashboard-content">
        <div className="dashboard-menu">
          <button className="menu-btn">🎮 Jugar Rosco</button>
          <button className="menu-btn">🏆 El meu Rànquing</button>
          <button className="menu-btn">📊 Les meves Estadístiques</button>
        </div>
        <p style={{color: 'white', marginTop: '2rem', textAlign: 'center'}}>
          Funcionalitats en desenvolupament...
        </p>
      </main>
    </div>
  );
}

export default StudentDashboard;
