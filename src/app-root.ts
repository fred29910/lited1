import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

// let isLoggedIn = false; // 模拟登录状态


@customElement('app-root')
export class AppRoot extends LitElement {
  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet!);

    router.setRoutes([
      {
        path: '/',
        component: 'home-layout',
        action: async () => {
          await import('./layouts/home-layout.js');
        },
        children: [
          {
            path: '/',
            component: 'home-view',
            action: async () => {
              await import('./views/home-view.js');
            }
          }
        ]
      },
      {
        path: '/about',
        component: 'main-layout',
        action: async (_) => {
          // if (!isLoggedIn) {
          //   return commands.redirect('/login');
          // }
          await import('./layouts/main-layout.js');
        },
        children: [
          {
            path: '/',
            component: 'about-view',
            action: async () => {
              await import('./views/about-view.js');
            }
          },
          {
            path: '/team',
            component: 'team-view',
            action: async () => {
              await import('./views/team-view.js');
            }
          }
        ]
      },
      registerR,
      loginR,
      ErrBy
    ]);
  }

  render() {
    return html`<div id="outlet"></div>`;
  }
}

const ErrBy = {
  path: '(.*)',
  component: 'error-layout',
  action: async () => {
    await import('./layouts/error-layout.js');
  },
  children: [
    {
      path: '/',
      component: 'not-found-view',
      action: async () => {
        await import('./views/not-found-view.js');
      }
    }
  ]
}
const registerR = {
  path: '/register',
  component: 'login-layout',
  action: async () => {
    await import('./layouts/login-layout.js');
  },
  children: [
    {
      path: '/',
      component: 'register-view',
      action: async () => {
        await import('./views/register-view.js');
      }
    }
  ]
}

const loginR = {
  path: '/login',
  component: 'login-layout',
  action: async () => {
    await import('./layouts/login-layout.js');
  },
  children: [
    {
      path: '/',
      component: 'login-view',
      action: async () => {
        await import('./views/login-view.js');
      }
    }
  ]
}