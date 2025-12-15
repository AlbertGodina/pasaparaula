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
