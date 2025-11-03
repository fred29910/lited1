import type { Route } from '@vaadin/router';

const ErrBy: Route = {
  path: '(.*)',
  component: 'error-layout',
  action: async () => {
    await import('../layouts/error-layout.js');
  },
  children: [
    {
      path: '/',
      component: 'not-found-view',
      action: async () => {
        await import('../pages/not-found-view.js');
      },
    },
  ],
};

const registerR: Route = {
  path: '/register',
  component: 'login-layout',
  action: async () => {
    await import('../layouts/login-layout.js');
  },
  children: [
    {
      path: '/',
      component: 'register-view',
      action: async () => {
        await import('../pages/register-view.js');
      },
    },
  ],
};

const loginR: Route = {
  path: '/login',
  component: 'login-layout',
  action: async () => {
    await import('../layouts/login-layout.js');
  },
  children: [
    {
      path: '/',
      component: 'login-view',
      action: async () => {
        await import('../pages/login-view.js');
      },
    },
  ],
};

export const routes: Route[] = [
  {
    path: '/',
    component: 'home-layout',
    action: async () => {
      await import('../layouts/home-layout.js');
    },
    children: [
      {
        path: '/',
        component: 'home-view',
        action: async () => {
          await import('../pages/home-view.js');
        },
      },
    ],
  },
  {
    path: '/about',
    component: 'main-layout',
    action: async (_, commands) => {
      // This logic will be moved to a guard
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        return commands.redirect('/login');
      }
      await import('../layouts/main-layout.js');
      return undefined;
    },
    children: [
      {
        path: '/',
        component: 'about-view',
        action: async () => {
          await import('../pages/about-view.js');
        },
      },
      {
        path: '/team',
        component: 'team-view',
        action: async () => {
          await import('../pages/team-view.js');
        },
      },
    ],
  },
  registerR,
  loginR,
  ErrBy,
];
