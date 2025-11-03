import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  static styles = css`
    button {
      margin: 0 5px;
      padding: 4px 10px;
    }
  `;

  @state() count = 0;

  private _increment() {
    this.count++;
  }

  private _decrement() {
    this.count--;
  }

  render() {
    return html`
      <p>Count: ${this.count}</p>
      <button @click=${this._decrement}>-</button>
      <button @click=${this._increment}>+</button>
    `;
  }
}
