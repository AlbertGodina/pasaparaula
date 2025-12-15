import React, { useState } from 'react';
import TeacherLogin from './TeacherLogin';
import StudentLogin from './StudentLogin';
import '../../styles/App.css';

function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);

  if (!selectedRole) {
    return (
      <div className="login-container">
        <h1>🎓 Pasapalabra Educativa</h1>
        <p>Selecciona el teu rol per començar</p>
        <div className="role-buttons">
          <button 
            className="role-btn teacher"
            onClick={() => setSelectedRole('teacher')}
          >
            👨‍🏫 Sóc Professor/a
          </button>
          <button 
            className="role-btn student"
            onClick={() => setSelectedRole('student')}
          >
            🎓 Sóc Alumne/a
          </button>
        </div>
      </div>
    );
  }

  if (selectedRole === 'teacher') {
    return <TeacherLogin onLogin={onLogin} onBack={() => setSelectedRole(null)} />;
  }

  return <StudentLogin onLogin={onLogin} onBack={() => setSelectedRole(null)} />;
}

export default Login;
