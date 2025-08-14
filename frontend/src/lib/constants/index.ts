export const APP_CONFIG = {
    name: 'Job Portal',
    version: '1.0.0',
  } as const;

  export const ROUTES = {
    login: '/login',
    admin: {
      dashboard: '/admin',
      candidates: '/admin/candidates',
      jobs: '/admin/jobs',
    },
    user: {
      dashboard: '/user',
      jobs: '/user/jobs',
      profile: '/user/profile',
    },
  } as const;

  export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  } as const;

  export const USER_TYPES = {
    EMPLOYEE: 'employee',
    CANDIDATE: 'candidate',
  } as const;