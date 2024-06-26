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
  ATTENDANCE: {
    ATTENDANCE_NOT_FOUND: 'ATT_004',
    ALREADY_SIGN_OUT: 'ATT_SIGN_OUT_002',
  },
  LEAVE: {
    LEAVE_NOT_FOUND: 'LEAVE_004',
    UNMATCH_STATUS: 'LEAVE_STATUS_001',
  },
  SHIFT_APPLICATION: {
    SHIFT_APPLICATION_NOT_FOUND: 'SHIFT_APPLICATION_004',
    UNMATCH_STATUS: 'SHIFT_APPLICATION_001',
    SHIFT_FROM_DATE_NOT_FOUND: 'SHIFT_APPLICATION_FROM_004',
    SHIFT_FROM_DATE_ALREADY_EXIST: 'SHIFT_APPLICATION_FROM_002',
    SHIFT_TO_DATE_ALREADY_EXISTED: 'SHIFT_APPLICATION_TO_002',
  },
  SCHEDULE: {
    SCHEDULE_ALREADY_EXISTED: 'SCHEDULE_002',
  },
  BANK: {
    BANK_NOT_FOUND: 'BANK_004',
  },
  REIMBURSE: {
    REIMBURSE_NOT_FOUND: 'REIMBURSE_004',
  },
  EXTERNAL_PARTY: {
    EXTERNAL_PARTY_NOT_FOUND: 'EXTERNAL_PARTY_004',
    EXTERNAL_PROJECTS_EXIST: 'EXTERNAL_PARTY_DELETE_001',
  },
  PROJECT: {
    PROJECT_NOT_FOUND: 'PROJECT_004',
    OWNER_INVALID: 'PROJECT_OWNER_003',
  },
  TASK: {
    TASK_NOT_FOUND: 'TASK_004',
    OWNER_INVALID: 'TASK_OWNER_003',
  },
  PURCHASE: {
    PURCHASE_NOT_FOUND: 'PURCHASE_004',
  },
  EXTERNAL_PROJECT: {
    EXTERNAL_PROJECT_NOT_FOUND: 'EXTERNAL_PROJECT_004',
  },
  ORDER: {
    ORDER_NOT_FOUND: 'ORDER_004',
  },
};
