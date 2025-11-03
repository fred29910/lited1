import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('about-view')
export class AboutView extends LitElement {
  render() {
    return html`<h2>ℹ️ About Page (需要登录才能访问)</h2>`;
  }
}
