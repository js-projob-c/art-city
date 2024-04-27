// Record not match: 001
// Already existed: 002
// Invalid input: 003
// Record not found: 004

export const ERROR_CODES = {
  GENERIC: {},
  AUTH: {
    EMAIL_EXISTED: 'AUTH_EMAIL_002',
    PASSWORD_INCORRECT: 'AUTH_PASSWORD_001',
    EMAIL_NOT_FOUND: 'AUTH_EMAIL_004',
  },
  USER: {
    USER_NOT_FOUND: 'USER_004',
  },
  ATTENDANCE: {},
};
