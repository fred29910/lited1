import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext } from '../store/auth-store';
import type { AuthContext } from '../store/auth-store';
import { themeContext } from '../store/theme-context';
import type { ThemeContext } from '../store/theme-context';

@customElement('home-layout')
export class HomeLayout extends LitElement {
  @consume({ context: authContext, subscribe: true })
  @state()
  private _auth?: AuthContext;

  @consume({ context: themeContext, subscribe: true })
  @state()
  private _theme?: ThemeContext;

  static styles = css`
    :host {
      display: block;
      --header-bg: lightblue;
      --header-color: black;
    }
    :host([data-theme='dark']) {
      --header-bg: #333;
      --header-color: white;
    }
    header {
      background: var(--header-bg);
      color: var(--header-color);
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #dc3545;
      color: white;
      cursor: pointer;
      margin-left: 10px;
    }
    .theme-toggle {
      background-color: #007bff;
    }
    a {
      text-decoration: none;
      color: #007bff;
    }
    :host([data-theme='dark']) a {
      color: lightblue;
    }
  `;

  protected updated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    if (_changedProperties.has('_theme')) {
      this.dataset.theme = this._theme?.theme;
    }
  }

  render() {
    return html`
      <header>
        <span>🏠 Home Layout</span>
        <div>
          <button
            class="theme-toggle"
            @click=${() => this._theme?.toggleTheme()}
          >
            切换到 ${this._theme?.theme === 'light' ? 'Dark' : 'Light'} 模式
          </button>
          ${this._auth?.isLoggedIn
            ? html`<button @click=${() => this._auth?.logout()}>登出</button>`
            : html`<a href="/login">登录</a>`}
        </div>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>Copyright 2025</footer>
    `;
  }
}
