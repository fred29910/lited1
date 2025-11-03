import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

@customElement('register-view')
export class RegisterView extends LitElement {
  @state()
  private _username = '';

  @state()
  private _password = '';

  @state()
  private _confirmPassword = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: sans-serif;
    }
    .register-container {
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      width: 300px;
      text-align: center;
    }
    h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    .form-group {
      margin-bottom: 1rem;
      text-align: left;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      background-color: #28a745;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #218838;
    }
  `;

  render() {
    return html`
      <div class="register-container">
        <h2>📝 注册新用户</h2>
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            type="text"
            .value=${this._username}
            @input=${(e: Event) =>
              (this._username = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            type="password"
            .value=${this._password}
            @input=${(e: Event) =>
              (this._password = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input
            id="confirmPassword"
            type="password"
            .value=${this._confirmPassword}
            @input=${(e: Event) =>
              (this._confirmPassword = (e.target as HTMLInputElement).value)}
          />
        </div>
        <button @click=${this._register}>注册</button>
      </div>
    `;
  }

  private _register() {
    if (this._password !== this._confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }

    if (this._username && this._password) {
      console.log(`注册用户: ${this._username}, 密码: ${this._password}`);
      // 模拟注册成功
      alert('注册成功！现在将跳转到登录页面。');
      Router.go('/login');
    } else {
      alert('请输入用户名和密码');
    }
  }
}
