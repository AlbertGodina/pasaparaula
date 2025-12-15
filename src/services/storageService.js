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
