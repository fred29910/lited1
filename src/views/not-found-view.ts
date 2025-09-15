import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('not-found-view')
export class NotFoundView extends LitElement {
  render() {
    return html`<h2>❌ Page Not Found</h2>`;
  }
}
