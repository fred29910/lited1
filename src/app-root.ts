import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './components/my-counter';
import './components/my-greeting';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 1rem;
    }
  `;

  render() {
    return html`
      <h1>Welcome to Lit</h1>
      <my-greeting name="Developer"></my-greeting>
      <my-counter></my-counter>
    `;
  }
}
