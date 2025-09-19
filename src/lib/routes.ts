export const ROUTES = {
  HOME: '/',
  START_YOUR_BUILD: '/start-your-build',
  HOW_IT_WORKS: '/how-it-works',
  FEATURED_WORK: '/featured-work',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROJECTS: {
    ROOT: '/projects',
    DETAIL: (id: string | number) => `/projects/${id}`,
    NEW: '/projects/new',
  },
  SETTINGS: {
    ACCOUNT: '/settings/account',
    NOTIFICATIONS: '/settings/notifications',
  },
};
