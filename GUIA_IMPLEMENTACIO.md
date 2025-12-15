# 🚀 Guia d'Implementació Pas a Pas

Aquesta guia et portarà des de zero fins a tenir l'aplicació Pasapalabra Educativa funcionant.

---

## 📋 Prerequisits

Abans de començar, assegura't de tenir instal·lat:
- **Node.js** (versió 14 o superior) - [Descarregar aquí](https://nodejs.org/)
- **npm** (s'instal·la automàticament amb Node.js)
- **Editor de codi** (recomanat: [Visual Studio Code](https://code.visualstudio.com/))
- **Git** - [Descarregar aquí](https://git-scm.com/)

### Comprovar Instal·lació

Obre una terminal i executa:
```bash
node --version
npm --version
git --version
```

Si tots mostren versions, estàs llest per començar!

---

## 🎯 Fase 0: Crear el Projecte React

### 1. Crear l'Aplicació Base

```bash
# Navega a la carpeta on vols crear el projecte
cd ~/Documents  # O la carpeta que prefereixis

# Crea el projecte amb Create React App
npx create-react-app pasapalabra-educativa

# Entra a la carpeta del projecte
cd pasapalabra-educativa
```

### 2. Crear l'Estructura de Carpetes

```bash
# Des de dins de la carpeta del projecte
mkdir -p src/components/auth
mkdir -p src/components/teacher
mkdir -p src/components/student
mkdir -p src/components/shared
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/styles
```

### 3. Iniciar el Servidor de Desenvolupament

```bash
npm start
```

Hauria d'obrir-se automàticament el navegador a `http://localhost:3000` amb la pàgina d'inici de React.

---

## 🎨 Fase 1: Implementar Autenticació i Rols

### Components a crear:

#### 1. `src/components/auth/Login.jsx`

```jsx
import React, { useState } from 'react';
import TeacherLogin from './TeacherLogin';
import StudentLogin from './StudentLogin';
import '../../styles/Auth.css';

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
```

#### 2. `src/components/auth/TeacherLogin.jsx`

```jsx
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
```

#### 3. `src/components/auth/StudentLogin.jsx`

```jsx
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
```

---

## 💾 Fase 2: Implementar storageService

#### `src/services/storageService.js`

Copia el codi complet de l'arxiu `ARQUITECTURA_PASAPALABRA.md` (secció "Exemple de Codi storageService.js")

**Punts clau:**
- Funcions per gestionar roscos (getRoscos, saveRosco, deleteRosco)
- Funcions per gestionar alumnes (getStudents, saveStudent)
- Funcions per gestionar puntuacions (getScores, saveScore, getLeaderboard)
- Verificació de contrasenya de professor

---

## 🎮 Fase 3: Implementar gameLogic

#### `src/services/gameLogic.js`

Copia el codi complet de l'arxiu `ARQUITECTURA_PASAPALABRA.md` (secció "Exemple de Codi gameLogic.js")

**Punts clau:**
- Lògica del joc (processAnswer, skipWord)
- Gestió d'estat del joc
- Sistema de puntuació
- Comptador de temps

---

## 🔧 Fase 4: Constants i Utils

#### `src/utils/constants.js`

```javascript
export const ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const LETTER_STATES = {
  PENDING: 'pending',
  SKIPPED: 'skipped',
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

export const ROLES = {
  TEACHER: 'teacher',
  STUDENT: 'student'
};

export const TIME_OPTIONS = {
  SHORT: 180,  // 3 minuts
  LONG: 300    // 5 minuts
};

export const POINTS = {
  CORRECT: 10,
  INCORRECT: -5,
  SKIPPED: 0
};
```

---

## 🖼️ Fase 5: Component Principal App.jsx

#### `src/App.jsx`

```jsx
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
```

---

## 🎨 Fase 6: Estils Bàsics

#### `src/styles/App.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  color: white;
}

.login-container h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.role-buttons {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.role-btn {
  padding: 2rem 3rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  font-weight: bold;
}

.role-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.role-btn.teacher {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.role-btn.student {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.form-group {
  margin: 1.5rem 0;
  width: 100%;
  max-width: 400px;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.9);
}

.submit-btn {
  padding: 1rem 3rem;
  font-size: 1.2rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  font-weight: bold;
}

.submit-btn:hover {
  background: #45a049;
}

.back-btn {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.2);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 2rem;
}

.error-message {
  color: #ff6b6b;
  background: rgba(255,255,255,0.9);
  padding: 0.5rem;
  border-radius: 5px;
  margin: 1rem 0;
}

.hint {
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
}
```

---

## 📝 Fase 7: Implementar Dashboards Bàsics

### TeacherDashboard (versió bàsica)

#### `src/components/teacher/TeacherDashboard.jsx`

```jsx
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
        <p style={{color: 'white', marginTop: '2rem'}}>
          Funcionalitats en desenvolupament...
        </p>
      </main>
    </div>
  );
}

export default TeacherDashboard;
```

### StudentDashboard (versió bàsica)

#### `src/components/student/StudentDashboard.jsx`

```jsx
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
        <p style={{color: 'white', marginTop: '2rem'}}>
          Funcionalitats en desenvolupament...
        </p>
      </main>
    </div>
  );
}

export default StudentDashboard;
```

---

## ✅ Comprovar que tot Funciona

Després d'implementar les fases 1-7, hauries de poder:

1. ✅ Iniciar l'aplicació (`npm start`)
2. ✅ Veure la pantalla de selecció de rol
3. ✅ Accedir com a professor amb contrasenya
4. ✅ Accedir com a alumne amb nom
5. ✅ Veure els dashboards bàsics
6. ✅ Tancar sessió i tornar al login

---

## 🎯 Pròxims Passos

Ara que tens la base funcionant, pots continuar amb:

### Fase 8: Gestió de Roscos (Professor)
- Component `RoscoManager` per llistar roscos
- Component `RoscoEditor` per crear/editar
- Component `WordForm` per afegir paraules

### Fase 9: Selector de Roscos (Alumne)
- Component `RoscoSelector` per triar rosco
- Component `GameSettings` per configurar temps

### Fase 10: Motor del Joc
- Component `GameBoard` amb el rosco visual
- Component `RoscoWheel` (cercle amb lletres)
- Component `Timer` (comptador)
- Lògica completa del joc

### Fase 11: Resultats i Rànquing
- Component `GameResults`
- Component `Leaderboard`
- Guardar puntuacions

---

## 🐛 Resolució de Problemes

### El servidor no s'inicia
```bash
# Elimina node_modules i torna a instal·lar
rm -rf node_modules
npm install
npm start
```

### Errors de localStorage
- Comprova que el navegador permeti localStorage
- Obre les Dev Tools (F12) → Application → Local Storage

### Components no es mostren
- Comprova que els imports siguin correctes
- Revisa la consola del navegador per errors

---

## 📚 Recursos Útils

- [Documentació React](https://react.dev/)
- [localStorage MDN](https://developer.mozilla.org/ca/docs/Web/API/Window/localStorage)
- [CSS Tricks](https://css-tricks.com/)
- [Stack Overflow](https://stackoverflow.com/) per dubtes

---

## 🎓 Consells per Aprendre

1. **Implementa pas a pas:** No facis tot de cop
2. **Prova sovint:** Executa `npm start` després de cada canvi important
3. **Usa console.log():** Per debugar i entendre el flux
4. **Consulta la documentació:** Els enllaços de recursos són molt útils
5. **Experimenta:** Canvia colors, textos, funcionalitats

---

## 🔄 Git i GitHub

### Inicialitzar Repositori

```bash
# Des de la carpeta del projecte
git init
git add .
git commit -m "Inicialització del projecte Pasapalabra Educativa"
```

### Crear Repositori a GitHub

1. Vés a [GitHub](https://github.com)
2. Crea un nou repositori
3. Segueix les instruccions per connectar el teu projecte local

```bash
git remote add origin https://github.com/el-teu-usuari/pasapalabra-educativa.git
git branch -M main
git push -u origin main
```

### Commits Regulars

```bash
# Després de cada funcionalitat completada
git add .
git commit -m "Descripció del que has fet"
git push
```

---

**Molt d'èxit amb el projecte! 🚀**

Si tens dubtes o problemes durant la implementació, consulta la documentació o busca ajuda a comunitats de desenvolupadors.
