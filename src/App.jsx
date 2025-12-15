import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import { initStorage } from './services/storageService';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Inicialitzar localStorage en carregar l'app
    initStorage();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role === 'teacher') {
    return <TeacherDashboard onLogout={handleLogout} />;
  }

  return <StudentDashboard user={user.user} onLogout={handleLogout} />;
}

export default App;
