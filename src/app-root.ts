import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    nav a {
      margin: 0 10px;
      text-decoration: none;
      color: blue;
    }
  `;

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet!);
    router.setRoutes([
      { path: '/', component: 'home-view' },
      { path: '/about', component: 'about-view' },
      { path: '(.*)', component: 'not-found-view' }  // 404
    ]);
  }

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
      <div id="outlet"></div>
    `;
  }
}
