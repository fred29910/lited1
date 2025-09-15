import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

// 模拟登录状态（实际项目可用全局状态管理）
// let isLoggedIn = false;

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    nav a {
      margin: 0 10px;
      text-decoration: none;
      color: blue;
    }
    nav a:hover {
      text-decoration: underline;
    }
  `;

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet!);

    router.setRoutes([
      { path: '/', component: 'home-view' },
      {
        path: '/about',
        action: async (_, commands) => {
          // 路由守卫示例
          if (!(window as any).isLoggedIn) {
            return commands.redirect('/login');
          }
          await import('./views/about-view.js');
        },
        children: [
          {
            path: '/team',
            component: 'team-view',
            action: async () => {
              await import('./views/team-view.js');
            }
          }
        ]
      },
      {
        path: '/login',
        component: 'login-view',
        action: async () => {
          await import('./views/login-view.js');
        }
      },
      { path: '(.*)', component: 'not-found-view' }
    ]);
  }

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/about/team">Team</a>
        <a href="/login">Login</a>
      </nav>
      <div id="outlet"></div>
    `;
  }
}
