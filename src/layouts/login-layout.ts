import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('login-layout')
export class LoginLayout extends LitElement {
  static styles = css`
    header { background: lightgreen; padding: 10px; }
  `;
  render() {
    return html`
      <slot></slot>
    `;
  }
}
