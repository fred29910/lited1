import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('home-layout')
export class HomeLayout extends LitElement {
  static styles = css`
    header { background: lightblue; padding: 10px; }
  `;
  render() {
    return html`
      <header>🏠 Home Layout</header>
      <slot></slot>
    `;
  }
}
