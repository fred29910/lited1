import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('team-view')
export class TeamView extends LitElement {
  render() {
    return html`<h2>👥 Team Page (About 的子路由)</h2>`;
  }
}
