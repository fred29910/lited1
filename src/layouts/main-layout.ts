import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('main-layout')
export class MainLayout extends LitElement {
  static styles = css`
    header { background: lightgray; padding: 10px; }
    nav a { margin: 0 10px; }
  `;
  render() {
    return html`
      <header>📑 Main Layout</header>
      <nav>
        <a href="/about">About</a>
        <a href="/about/team">Team</a>
      </nav>
      <slot></slot>
    `;
  }
}
