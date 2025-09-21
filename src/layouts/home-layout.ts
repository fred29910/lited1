import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext } from '../contexts/auth-context';
import type { AuthContext } from '../contexts/auth-context';
// import { Router } from '@vaadin/router';

@customElement('home-layout')
export class HomeLayout extends LitElement {
  @consume({ context: authContext, subscribe: true })
  @state()
  private _auth?: AuthContext;

  static styles = css`
    header {
      background: lightblue;
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
    }
    a {
      text-decoration: none;
      color: #007bff;
    }
  `;

  render() {
    return html`
      <header>
        <span>🏠 Home Layout</span>
        ${this._auth?.isLoggedIn
          ? html`<button @click=${() => this._auth?.logout()}>登出</button>`
          : html`<a href="/login">登录</a>`}
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>Copyright 2025</footer>
    `;
  }
}
