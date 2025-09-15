import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('login-view')
export class LoginView extends LitElement {
  render() {
    return html`
      <h2>🔐 Login Page</h2>
      <p>模拟登录成功，点击按钮进入 About</p>
      <button @click=${this._login}>Login</button>
    `;
  }

  private _login() {
    // 模拟登录
    (window as any).isLoggedIn = true;
    window.history.pushState({}, '', '/about');
    window.dispatchEvent(new PopStateEvent('popstate')); // 触发路由更新
  }
}
