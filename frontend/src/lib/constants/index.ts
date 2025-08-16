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
      profile: '/user/profile',
      jobs: '/user/jobs',
      appliedJobs: '/user/applied-jobs',
    },
  } as const;

  // Helper functions for dynamic routes
  export const getCandidateRoute = (id: string) => `/admin/candidates/${id}`;
  export const getCandidateEditRoute = (id: string) => `/admin/candidates/${id}/edit`;
  export const getCandidateViewRoute = (id: string) => `/admin/candidates?id=${id}`;

  export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  } as const;

  export const USER_TYPES = {
    EMPLOYEE: 'employee',
    CANDIDATE: 'candidate',
  } as const;