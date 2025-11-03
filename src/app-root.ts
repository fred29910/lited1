import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { Router } from '@vaadin/router';
import { routes } from './router';
import { authContext, AuthService } from './store/auth-store';
import type { AuthContext } from './store/auth-store';
import { themeContext } from './store/theme-context';
import type { Theme, ThemeContext } from './store/theme-context';

@customElement('app-root')
export class AppRoot extends LitElement {
  @provide({ context: authContext })
  @state()
  private _auth!: AuthContext;

  @provide({ context: themeContext })
  @state()
  private _theme: ThemeContext = {
    theme: 'light',
    toggleTheme: () => {
      const newTheme: Theme = this._theme.theme === 'light' ? 'dark' : 'light';
      this._theme = { ...this._theme, theme: newTheme };
    },
  };

  constructor() {
    super();
    new AuthService((auth: AuthContext) => {
      this._auth = auth;
    });
  }

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet!);
    router.setRoutes(routes);
  }

  render() {
    // Reading _auth here to satisfy TypeScript compiler
    return this._auth ? html`<div id="outlet"></div>` : html`Loading...`;
  }
}
