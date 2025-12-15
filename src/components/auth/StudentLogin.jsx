import React, { useState } from 'react';
import { saveStudent } from '../../services/storageService';

function StudentLogin({ onLogin, onBack }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('El nom ha de tenir almenys 2 caràcters');
      return;
    }
    const student = saveStudent({ name: name.trim() });
    onLogin({ role: 'student', user: student });
  };

  return (
    <div className="login-container">
      <button className="back-btn" onClick={onBack}>← Tornar</button>
      <h2>🎓 Accés Alumne/a</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>El teu nom:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Introdueix el teu nom"
            autoFocus
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">Començar</button>
      </form>
    </div>
  );
}

export default StudentLogin;
