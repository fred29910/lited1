import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('home-view')
export class HomeView extends LitElement {
  render() {
    return html`<h2>🏠 Home Page</h2>`;
  }
}
