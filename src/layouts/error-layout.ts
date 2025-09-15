import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('error-layout')
export class ErrorLayout extends LitElement {
  static styles = css`
    header { background: pink; padding: 10px; color: red; }
  `;
  render() {
    return html`
      <header>❌ Error Layout</header>
      <slot></slot>
    `;
  }
}
