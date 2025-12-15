# 🎯 ARQUITECTURA FUNCIONAL - PASAPALABRA EDUCATIVA

## 📋 Context del Projecte

### Objectiu
Aplicació web educativa tipus "Pasapalabra" per a alumnes d'ESO de la matèria **Tecnologia i Digitalització**, amb dos rols diferenciats: professorat i alumnat.

### Tecnologies
- **Frontend:** React (JavaScript, HTML, CSS)
- **Persistència:** localStorage (navegador)
- **Requisits:** Navegador modern, només per ordinador

---

## 👥 Rols d'Usuari

### 1. **Professor/a**
- Accés amb contrasenya mestra
- Pot crear, editar i eliminar roscos temàtics
- Pot gestionar paraules i definicions per cada lletra
- Pot visualitzar puntuacions i rànquing dels alumnes

### 2. **Alumne/a**
- Accés amb nom d'usuari (sense contrasenya)
- Pot seleccionar roscos disponibles
- Pot jugar i intentar superar la seva pròpia puntuació
- Apareix al rànquing general

---

## 🏗️ Arquitectura de Components (React)

```
src/
├── App.jsx                          # Component principal i router
├── components/
│   ├── auth/
│   │   ├── Login.jsx               # Pantalla inicial (selecció rol)
│   │   ├── TeacherLogin.jsx        # Login professor amb contrasenya
│   │   └── StudentLogin.jsx        # Login alumne (només nom)
│   │
│   ├── teacher/
│   │   ├── TeacherDashboard.jsx    # Panel principal professor
│   │   ├── RoscoManager.jsx        # Gestió de roscos temàtics
│   │   ├── RoscoEditor.jsx         # Editor de paraules/definicions
│   │   ├── Leaderboard.jsx         # Visualització de puntuacions
│   │   └── WordForm.jsx            # Formulari afegir/editar paraula
│   │
│   ├── student/
│   │   ├── StudentDashboard.jsx    # Panel principal alumne
│   │   ├── RoscoSelector.jsx       # Selector de roscos disponibles
│   │   ├── GameSettings.jsx        # Configuració de temps (3 o 5 min)
│   │   ├── GameBoard.jsx           # Tauler de joc amb rosco visual
│   │   ├── RoscoWheel.jsx          # Component visual del rosco circular
│   │   ├── GameControls.jsx        # Controls del joc (passar, enviar)
│   │   └── GameResults.jsx         # Pantalla resultats final
│   │
│   └── shared/
│       ├── Header.jsx              # Capçalera amb rol i logout
│       ├── Timer.jsx               # Comptador de temps
│       └── ScoreBoard.jsx          # Marcador de punts en temps real
│
├── services/
│   ├── storageService.js           # Gestió localStorage
│   ├── gameLogic.js                # Lògica del joc i puntuacions
│   └── validation.js               # Validació de dades
│
├── utils/
│   ├── constants.js                # Constants (lletres, puntuacions, etc.)
│   └── helpers.js                  # Funcions auxiliars
│
└── styles/
    ├── App.css                     # Estils globals
    ├── Teacher.css                 # Estils zona professor
    ├── Student.css                 # Estils zona alumne
    └── Rosco.css                   # Estils rosco visual
```

---

## 💾 Estructures de Dades (localStorage)

### 1. **Configuració del Sistema**
```javascript
// Key: "pasapalabra_config"
{
  teacherPassword: "contrasenya_mestra",
  createdAt: "2025-01-15T10:00:00Z"
}
```

### 2. **Roscos Temàtics**
```javascript
// Key: "pasapalabra_roscos"
[
  {
    id: "rosco_001",
    title: "Hardware i Components",
    description: "Vocabulari sobre components físics dels ordinadors",
    createdBy: "Professor Joan",
    createdAt: "2025-01-15T10:00:00Z",
    words: {
      A: {
        letter: "A",
        definition: "Memòria temporal que perd les dades quan s'apaga l'ordinador",
        answer: "RAM",
        startsWith: true  // true = "Comença per A", false = "Conté la A"
      },
      B: {
        letter: "B",
        definition: "Sistema binari que utilitzen els ordinadors per representar dades",
        answer: "BIT",
        startsWith: true
      },
      // ... fins la Z (26 lletres sense Ç)
    },
    isActive: true  // Visible per alumnes
  },
  {
    id: "rosco_002",
    title: "Programació Bàsica",
    description: "Conceptes fonamentals de programació",
    createdBy: "Professor Joan",
    createdAt: "2025-01-16T11:30:00Z",
    words: { /* ... */ },
    isActive: true
  }
]
```

### 3. **Alumnes**
```javascript
// Key: "pasapalabra_students"
[
  {
    id: "student_001",
    name: "Maria García",
    createdAt: "2025-01-15T12:00:00Z",
    lastLogin: "2025-01-20T09:15:00Z"
  },
  {
    id: "student_002",
    name: "Pau Martínez",
    createdAt: "2025-01-15T12:05:00Z",
    lastLogin: "2025-01-20T09:20:00Z"
  }
]
```

### 4. **Puntuacions/Historial**
```javascript
// Key: "pasapalabra_scores"
[
  {
    id: "score_001",
    studentId: "student_001",
    studentName: "Maria García",
    roscoId: "rosco_001",
    roscoTitle: "Hardware i Components",
    score: 180,  // Puntuació total
    correctAnswers: 20,
    incorrectAnswers: 3,
    skippedAnswers: 3,
    timeUsed: 240,  // segons utilitzats
    timeLimit: 300,  // segons totals (5 min)
    completedAt: "2025-01-20T09:30:00Z",
    details: {
      A: { answer: "RAM", correct: true, timeTaken: 5 },
      B: { answer: "BIT", correct: true, timeTaken: 4 },
      C: { answer: "CONTROLADORA", correct: false, timeTaken: 8 },
      D: { answer: "", correct: null, timeTaken: 0 },  // Passada
      // ... per cada lletra
    }
  }
]
```

---

## 🎮 Regles del Joc

### Configuració Inicial
- **Temps disponible:** Configurable abans de començar (3 o 5 minuts)
- **Lletres:** 26 lletres de l'abecedari català (sense Ç)
- **Modalitat:** Una sola ronda individual

### Sistema de Puntuació
| Acció | Punts |
|-------|-------|
| ✅ Resposta correcta | +10 punts |
| ❌ Resposta incorrecta | -5 punts |
| ⏭️ Passar paraula | 0 punts (pot tornar-hi) |

### Dinàmica del Joc
1. Es comença per la lletra **A**
2. Es mostra la definició (pot començar per o contenir la lletra)
3. L'alumne pot:
   - **Escriure la resposta** i prémer "Enviar"
   - **Passar paraula** (salta a la següent lletra disponible)
4. Després de respondre o passar, avança a la següent lletra no resolta
5. El joc acaba quan:
   - S'acaba el temps
   - Es resolen totes les paraules
   - L'alumne decideix acabar

### Estats de les Lletres (Visual)
- 🔵 **Blau:** No resolta (pendent)
- 🟡 **Groga:** Passada (pot tornar-hi)
- 🟢 **Verda:** Encertada
- 🔴 **Vermella:** Fallada

---

## 🔄 Flux d'Ús per Rols

### 📚 FLUX PROFESSOR/A

#### 1. Accés
```
[Pantalla Inicial]
    ↓
[Selecciona "Sóc Professor/a"]
    ↓
[Introdueix contrasenya mestra]
    ↓
[Dashboard Professor]
```

#### 2. Gestió de Roscos
```
[Dashboard Professor]
    ↓
[Botó "Gestionar Roscos"]
    ↓
┌─────────────────────────────────┐
│ • Llistat de roscos existents  │
│ • Botó "Crear Nou Rosco"       │
│ • Botons editar/eliminar/      │
│   activar/desactivar per rosco │
└─────────────────────────────────┘
```

#### 3. Crear/Editar Rosco
```
[Crear Nou Rosco]
    ↓
[Formulari: Títol, Descripció]
    ↓
[Guardar Rosco Buit]
    ↓
[Editor de Paraules - Vista Alfabètica]
    ↓
┌─────────────────────────────────────┐
│ Lletra A: [+ Afegir definició]     │
│ Lletra B: [+ Afegir definició]     │
│ ...                                 │
│ O bé:                               │
│ Lletra A: "Memòria temporal..."    │
│     Resposta: RAM                   │
│     [Editar] [Eliminar]            │
└─────────────────────────────────────┘
```

#### 4. Afegir Paraula a una Lletra
```
[Click "+ Afegir definició" en lletra X]
    ↓
[Formulari Modal]
├─ Lletra: X (no editable)
├─ Definició: [textarea]
├─ Resposta correcta: [input]
├─ Tipus: [○ Comença per X  ○ Conté la X]
└─ [Guardar] [Cancel·lar]
    ↓
[Actualitza vista editor]
```

#### 5. Visualitzar Puntuacions
```
[Dashboard Professor]
    ↓
[Botó "Veure Rànquing"]
    ↓
┌─────────────────────────────────────────┐
│ RÀNQUING GENERAL                        │
│ ════════════════════════════════════    │
│ 1. Maria García - 180 pts (Rosco 1)    │
│ 2. Pau Martínez - 150 pts (Rosco 2)    │
│ ...                                     │
│                                         │
│ Filtres:                                │
│ • Per rosco                             │
│ • Per alumne                            │
│ • Per data                              │
└─────────────────────────────────────────┘
    ↓
[Click en puntuació]
    ↓
[Detall: lletres encertades/fallades, temps]
```

---

### 🎓 FLUX ALUMNE/A

#### 1. Accés
```
[Pantalla Inicial]
    ↓
[Selecciona "Sóc Alumne/a"]
    ↓
[Introdueix nom]
    ↓
[Dashboard Alumne]
```

#### 2. Selecció de Rosco
```
[Dashboard Alumne]
    ↓
[Llistat de roscos disponibles]
├─ Rosco 1: Hardware (26/26 paraules)
│  Millor puntuació: 180 pts
├─ Rosco 2: Programació (26/26 paraules)
│  Millor puntuació: -- (no jugat)
└─ ...
    ↓
[Click en rosco]
    ↓
[Configuració de partida]
```

#### 3. Configuració de Partida
```
[Pantalla configuració]
    ↓
┌─────────────────────────────────┐
│ Rosco: Hardware i Components    │
│ 26 paraules                     │
│                                 │
│ Selecciona temps:               │
│ ○ 3 minuts                      │
│ ● 5 minuts                      │
│                                 │
│ [COMENÇAR JOC]                  │
└─────────────────────────────────┘
```

#### 4. Pantalla de Joc
```
[Començar Joc]
    ↓
┌─────────────────────────────────────────────┐
│  Header: Maria García | Temps: 4:58        │
│  Puntuació: 0 | Encerts: 0 | Errors: 0     │
├─────────────────────────────────────────────┤
│                                             │
│         [ROSCO VISUAL CIRCULAR]             │
│              A B C D E F                    │
│            Z         G H                    │
│          Y             I                    │
│          X             J                    │
│            W         K                      │
│              V U T S R Q P O N M L          │
│                                             │
│  Lletra actual: A                           │
│  "Memòria temporal que perd les dades       │
│   quan s'apaga l'ordinador"                 │
│                                             │
│  La teva resposta: [_________]              │
│                                             │
│  [PASSAR PARAULA]  [ENVIAR RESPOSTA]        │
│                                             │
└─────────────────────────────────────────────┘
```

#### 5. Lògica durant el Joc
```
[Escriu resposta "RAM"]
    ↓
[Prem "Enviar"]
    ↓
[Validació]
    ├─ Correcta → Lletra A es posa VERDA
    │             +10 punts
    │             Avança a lletra B
    │
    └─ Incorrecta → Lletra A es posa VERMELLA
                    -5 punts
                    Avança a lletra B

[Prem "Passar Paraula"]
    ↓
[Lletra A es posa GROGA]
[Avança a lletra B]
[Tornarà a la A quan doni la volta]
```

#### 6. Final del Joc
```
[Temps exhaurit O totes paraules resoltes]
    ↓
[Pantalla de Resultats]
    ↓
┌─────────────────────────────────────────┐
│  🎉 PARTIDA COMPLETADA!                 │
│                                         │
│  Puntuació final: 180 punts             │
│  ────────────────────────────────       │
│  ✅ Encerts: 20                         │
│  ❌ Errors: 3                           │
│  ⏭️  Passades: 3                        │
│  ⏱️  Temps utilitzat: 4:00 / 5:00      │
│                                         │
│  🏆 Nova millor puntuació!              │
│  (Anterior: 150 punts)                  │
│                                         │
│  [TORNAR A JUGAR]  [VEURE RÀNQUING]    │
│  [TORNAR AL MENÚ]                       │
└─────────────────────────────────────────┘
```

---

## 🎨 Disseny Visual del Rosco

### Característiques
- Disposició circular amb 26 lletres
- Colors segons estat (blau, groc, verd, vermell)
- Lletra actual destacada (més gran, borde marcat)
- Animació suau en transicions
- Font clara i llegible

### Exemple CSS/Layout
```css
.rosco-container {
  width: 500px;
  height: 500px;
  position: relative;
  margin: 0 auto;
}

.letter-circle {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  transition: all 0.3s ease;
}

/* Estats */
.letter-pending { background: #4A90E2; color: white; }
.letter-skipped { background: #F5A623; color: white; }
.letter-correct { background: #7ED321; color: white; }
.letter-incorrect { background: #D0021B; color: white; }
.letter-current { 
  transform: scale(1.3);
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.8);
  border-width: 5px;
}
```

---

## 🔒 Validacions i Seguretat

### Validacions de Dades
1. **Contrasenya professor:** Mínim 6 caràcters
2. **Nom alumne:** Obligatori, 2-50 caràcters
3. **Títol rosco:** Obligatori, 3-100 caràcters
4. **Definició:** Obligatori, 10-500 caràcters
5. **Resposta:** Obligatori, 1-50 caràcters, només lletres/números

### Comprovacions de Rosco
- No permetre activar un rosco amb lletres sense definició
- Avisar si falten lletres per completar
- Confirmar abans d'eliminar roscos (perdre dades)

### Gestió d'Errors
- Missatges d'error clars i en català
- localStorage no disponible → Avisar usuari
- Dades corruptes → Intentar recuperar o reinicialitzar

---

## 📊 Funcionalitats Addicionals (Opcionals)

### Per implementar en futures versions:
- [ ] Exportar/importar roscos (JSON)
- [ ] Estadístiques avançades (gràfics)
- [ ] Mode multijugador (competició)
- [ ] Sons i efectes visuals
- [ ] Temes de colors personalitzables
- [ ] Historial de partides per alumne
- [ ] Certificats de completació
- [ ] API per integrar amb plataformes educatives

---

## 🚀 Passos per Implementar

### 1. Setup Inicial
```bash
# Crear projecte React
npx create-react-app pasapalabra-educativa
cd pasapalabra-educativa

# Estructura de carpetes
mkdir -p src/components/auth
mkdir -p src/components/teacher
mkdir -p src/components/student
mkdir -p src/components/shared
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/styles
```

### 2. Desenvolupament per Fases

#### Fase 1: Autenticació i Rols
- Pantalla login
- Gestió de rols
- localStorage bàsic

#### Fase 2: Panel Professor
- CRUD roscos
- Editor de paraules
- Validacions

#### Fase 3: Panel Alumne
- Selector roscos
- Configuració temps
- Dashboard bàsic

#### Fase 4: Motor del Joc
- Rosco visual
- Lògica del joc
- Comptador temps
- Sistema puntuació

#### Fase 5: Resultats i Rànquing
- Pantalla resultats
- Guardar puntuacions
- Rànquing global
- Visualització professor

#### Fase 6: Poliment
- Estils finals
- Animacions
- Testing
- Documentació

---

## 📝 Exemple de Codi (storageService.js)

```javascript
// src/services/storageService.js

const KEYS = {
  CONFIG: 'pasapalabra_config',
  ROSCOS: 'pasapalabra_roscos',
  STUDENTS: 'pasapalabra_students',
  SCORES: 'pasapalabra_scores'
};

// Inicialitzar localStorage
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.CONFIG)) {
    localStorage.setItem(KEYS.CONFIG, JSON.stringify({
      teacherPassword: 'admin123',
      createdAt: new Date().toISOString()
    }));
  }
  if (!localStorage.getItem(KEYS.ROSCOS)) {
    localStorage.setItem(KEYS.ROSCOS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.STUDENTS)) {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.SCORES)) {
    localStorage.setItem(KEYS.SCORES, JSON.stringify([]));
  }
};

// ROSCOS
export const getRoscos = () => {
  return JSON.parse(localStorage.getItem(KEYS.ROSCOS) || '[]');
};

export const saveRosco = (rosco) => {
  const roscos = getRoscos();
  const index = roscos.findIndex(r => r.id === rosco.id);
  if (index >= 0) {
    roscos[index] = rosco;
  } else {
    roscos.push(rosco);
  }
  localStorage.setItem(KEYS.ROSCOS, JSON.stringify(roscos));
};

export const deleteRosco = (roscoId) => {
  const roscos = getRoscos().filter(r => r.id !== roscoId);
  localStorage.setItem(KEYS.ROSCOS, JSON.stringify(roscos));
};

export const getActiveRoscos = () => {
  return getRoscos().filter(r => r.isActive);
};

// ALUMNES
export const getStudents = () => {
  return JSON.parse(localStorage.getItem(KEYS.STUDENTS) || '[]');
};

export const saveStudent = (student) => {
  const students = getStudents();
  const existing = students.find(s => s.name === student.name);
  if (existing) {
    existing.lastLogin = new Date().toISOString();
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
    return existing;
  } else {
    const newStudent = {
      id: `student_${Date.now()}`,
      name: student.name,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    students.push(newStudent);
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
    return newStudent;
  }
};

// PUNTUACIONS
export const getScores = () => {
  return JSON.parse(localStorage.getItem(KEYS.SCORES) || '[]');
};

export const saveScore = (scoreData) => {
  const scores = getScores();
  const newScore = {
    id: `score_${Date.now()}`,
    ...scoreData,
    completedAt: new Date().toISOString()
  };
  scores.push(newScore);
  localStorage.setItem(KEYS.SCORES, JSON.stringify(scores));
  return newScore;
};

export const getStudentBestScores = (studentId) => {
  const scores = getScores().filter(s => s.studentId === studentId);
  const bestByRosco = {};
  scores.forEach(score => {
    if (!bestByRosco[score.roscoId] || score.score > bestByRosco[score.roscoId].score) {
      bestByRosco[score.roscoId] = score;
    }
  });
  return Object.values(bestByRosco);
};

export const getLeaderboard = (roscoId = null) => {
  let scores = getScores();
  if (roscoId) {
    scores = scores.filter(s => s.roscoId === roscoId);
  }
  return scores.sort((a, b) => b.score - a.score);
};

// CONFIGURACIÓ
export const verifyTeacherPassword = (password) => {
  const config = JSON.parse(localStorage.getItem(KEYS.CONFIG));
  return config.teacherPassword === password;
};

export const updateTeacherPassword = (newPassword) => {
  const config = JSON.parse(localStorage.getItem(KEYS.CONFIG));
  config.teacherPassword = newPassword;
  localStorage.setItem(KEYS.CONFIG, JSON.stringify(config));
};
```

---

## 📝 Exemple de Codi (gameLogic.js)

```javascript
// src/services/gameLogic.js

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
                  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
                  'U', 'V', 'W', 'X', 'Y', 'Z'];

export const POINTS = {
  CORRECT: 10,
  INCORRECT: -5,
  SKIPPED: 0
};

export const TIME_OPTIONS = {
  SHORT: 180,  // 3 minuts
  LONG: 300    // 5 minuts
};

// Inicialitzar estat del joc
export const initGameState = (rosco, timeLimit) => {
  return {
    roscoId: rosco.id,
    roscoTitle: rosco.title,
    timeLimit: timeLimit,
    timeRemaining: timeLimit,
    currentLetterIndex: 0,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    skippedAnswers: 0,
    letterStates: ALPHABET.reduce((acc, letter) => {
      acc[letter] = {
        status: 'pending',  // pending, skipped, correct, incorrect
        answer: '',
        timeTaken: 0
      };
      return acc;
    }, {}),
    startTime: Date.now()
  };
};

// Obtenir lletra actual
export const getCurrentLetter = (gameState) => {
  return ALPHABET[gameState.currentLetterIndex];
};

// Obtenir definició de la lletra actual
export const getCurrentDefinition = (rosco, gameState) => {
  const letter = getCurrentLetter(gameState);
  return rosco.words[letter];
};

// Trobar següent lletra pendent
export const getNextPendingLetter = (gameState) => {
  const startIndex = gameState.currentLetterIndex;
  let index = (startIndex + 1) % ALPHABET.length;
  
  // Buscar següent lletra pendent o passada
  while (index !== startIndex) {
    const letter = ALPHABET[index];
    const status = gameState.letterStates[letter].status;
    if (status === 'pending' || status === 'skipped') {
      return index;
    }
    index = (index + 1) % ALPHABET.length;
  }
  
  // Si hem donat la volta i tornem a l'inici, comprova l'actual
  const currentLetter = ALPHABET[startIndex];
  const currentStatus = gameState.letterStates[currentLetter].status;
  if (currentStatus === 'pending' || currentStatus === 'skipped') {
    return startIndex;
  }
  
  return -1; // Totes resoltes
};

// Processar resposta
export const processAnswer = (rosco, gameState, answer) => {
  const letter = getCurrentLetter(gameState);
  const correctAnswer = rosco.words[letter].answer;
  const isCorrect = answer.trim().toUpperCase() === correctAnswer.toUpperCase();
  
  const timeTaken = Math.floor((Date.now() - gameState.startTime) / 1000);
  
  const newState = { ...gameState };
  newState.letterStates[letter] = {
    status: isCorrect ? 'correct' : 'incorrect',
    answer: answer.trim(),
    timeTaken: timeTaken
  };
  
  if (isCorrect) {
    newState.score += POINTS.CORRECT;
    newState.correctAnswers++;
  } else {
    newState.score += POINTS.INCORRECT;
    newState.incorrectAnswers++;
  }
  
  // Avançar a següent lletra
  const nextIndex = getNextPendingLetter(newState);
  newState.currentLetterIndex = nextIndex >= 0 ? nextIndex : gameState.currentLetterIndex;
  
  return newState;
};

// Passar paraula
export const skipWord = (gameState) => {
  const letter = getCurrentLetter(gameState);
  
  const newState = { ...gameState };
  if (newState.letterStates[letter].status === 'pending') {
    newState.letterStates[letter].status = 'skipped';
    newState.skippedAnswers++;
  }
  
  // Avançar a següent lletra
  const nextIndex = getNextPendingLetter(newState);
  newState.currentLetterIndex = nextIndex >= 0 ? nextIndex : gameState.currentLetterIndex;
  
  return newState;
};

// Comprovar si el joc ha acabat
export const isGameFinished = (gameState) => {
  // Temps exhaurit
  if (gameState.timeRemaining <= 0) {
    return true;
  }
  
  // Totes les lletres resoltes (correctes o incorrectes)
  const allResolved = ALPHABET.every(letter => {
    const status = gameState.letterStates[letter].status;
    return status === 'correct' || status === 'incorrect';
  });
  
  return allResolved;
};

// Calcular resultats finals
export const calculateFinalResults = (gameState, rosco, student) => {
  return {
    studentId: student.id,
    studentName: student.name,
    roscoId: rosco.id,
    roscoTitle: rosco.title,
    score: gameState.score,
    correctAnswers: gameState.correctAnswers,
    incorrectAnswers: gameState.incorrectAnswers,
    skippedAnswers: gameState.skippedAnswers,
    timeUsed: gameState.timeLimit - gameState.timeRemaining,
    timeLimit: gameState.timeLimit,
    details: gameState.letterStates
  };
};

// Formatar temps (segons → mm:ss)
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
```

---

## 🎯 Notes Finals

### Prioritats d'Implementació
1. ✅ Funcionalitat core (joc funcionant)
2. ✅ Gestió de roscos (professors)
3. ✅ Sistema de puntuacions
4. ⚠️ Disseny visual atractiu
5. ⚠️ Experiència d'usuari fluida

### Millores Recomanades
- Afegir sons/efectes
- Animacions més elaborades
- Mode fosc/clar
- Guardar preferències usuari
- Exportar estadístiques

### Consideracions Tècniques
- localStorage té límit ~5-10MB
- Testejar en diferents navegadors
- Gestionar errors localStorage ple
- Backup/restore de dades

---

## 📚 Recursos per Desenvolupar

### React
- [Documentació oficial](https://react.dev/)
- [Tutorial interactiu](https://react.dev/learn)

### localStorage
- [MDN Web Docs](https://developer.mozilla.org/ca/docs/Web/API/Window/localStorage)

### CSS Rosco Circular
- Utilitzar `transform: rotate()` i posicionament absolut
- Calcular angles: `360° / 26 lletres = ~13.85° per lletra`

---

**Preparat per començar a desenvolupar! 🚀**

Aquest document serveix com a base completa per implementar l'aplicació Pasapalabra Educativa amb React i localStorage.
