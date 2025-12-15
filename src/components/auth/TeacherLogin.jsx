import React, { useState } from 'react';
import { verifyTeacherPassword } from '../../services/storageService';

function TeacherLogin({ onLogin, onBack }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyTeacherPassword(password)) {
      onLogin({ role: 'teacher' });
    } else {
      setError('Contrasenya incorrecta');
    }
  };

  return (
    <div className="login-container">
      <button className="back-btn" onClick={onBack}>← Tornar</button>
      <h2>👨‍🏫 Accés Professor/a</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Contrasenya:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introdueix la contrasenya"
            autoFocus
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">Entrar</button>
      </form>
      <p className="hint">Contrasenya per defecte: admin123</p>
    </div>
  );
}

export default TeacherLogin;
