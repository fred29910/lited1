import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-greeting')
export class MyGreeting extends LitElement {
  static styles = css`
    p {
      color: blue;
      font-weight: bold;
    }
  `;

  @property() name = 'World';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
