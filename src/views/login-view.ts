import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { Router } from '@vaadin/router';
import { authContext } from '../contexts/auth-context';
import type { AuthContext } from '../contexts/auth-context';
import CryptoJS from 'crypto-js'

@customElement('login-view')
export class LoginView extends LitElement {
  @consume({ context: authContext, subscribe: true })
  @state()
  private _auth?: AuthContext;

  @state()
  private _username = '';

  @state()
  private _password = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: sans-serif;
    }
    .login-container {
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
      background-color: #007bff;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  render() {
    return html`
      <div class="login-container">
        <h2>🔐 登录</h2>
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            type="text"
            .value=${this._username}
            @input=${(e: Event) => this._username = (e.target as HTMLInputElement).value}
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            type="password"
            .value=${this._password}
            @input=${(e: Event) => this._password = (e.target as HTMLInputElement).value}
          />
        </div>
        <button @click=${this._login}>登录</button>
      </div>
    `;
  }

  private _login() {
    // 模拟登录验证
    if (this._username && this._password) {
      console.log(`用户: ${this._username}, 密码: ${this._password}`);


const SecretPs = "Secret Passphrase"

      const usernameEnCoded = CryptoJS.AES.encrypt(this._username, SecretPs);


      const usernameDecrypted = CryptoJS.AES.decrypt(usernameEnCoded, SecretPs);


      const passwordEnCoded = CryptoJS.AES.encrypt(this._username, SecretPs);


      const passwordDecrypted = CryptoJS.AES.decrypt(passwordEnCoded, SecretPs);



      console.log(`用户: ${usernameEnCoded}, 密码: ${passwordEnCoded}`);
      console.log(`用户: ${usernameDecrypted}, 密码: ${passwordDecrypted}`);

      // 模拟登录成功
      this._auth?.login();
      // 使用 Vaadin Router 进行页面跳转
      Router.go('/about');
    } else {
      alert('请输入用户名和密码');
    }
  }
}


// function encryptToHex(text: string): string {
//   // An example 128-bit key
//   const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

//   // Convert text to bytes (text must be a multiple of 16 bytes)
//   const textBytes = aesjs.utils.utf8.toBytes(text);

//   var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
//   var encryptedBytes = aesCtr.encrypt(textBytes);

//   // To print or store the binary data, you may convert it to hex
//   const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
//   return encryptedHex
//   // "104fb073f9a131f2cab49184bb864ca2"

//   // // When ready to decrypt the hex string, convert it back to bytes
//   // var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

//   // // The cipher-block chaining mode of operation maintains internal
//   // // state, so to decrypt a new instance must be instantiated.
//   // var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
//   // var decryptedBytes = aesCbc.decrypt(encryptedBytes);

//   // // Convert our bytes back into text
//   // var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
//   // console.log(decryptedText);
//   // // "TextMustBe16Byte"
// }