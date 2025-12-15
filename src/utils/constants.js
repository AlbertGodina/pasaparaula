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
