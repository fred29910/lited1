import { createContext } from '@lit/context';
import { Router } from '@vaadin/router';

export interface AuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const authContext = createContext<AuthContext>(Symbol('auth-context'));

export class AuthService {
  private _auth: AuthContext;
  private updateState: (auth: AuthContext) => void;

  constructor(updateState: (auth: AuthContext) => void) {
    this.updateState = updateState;
    this._auth = {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      login: this.login,
      logout: this.logout,
    };
    this.updateState(this._auth);
  }

  login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    this._auth = { ...this._auth, isLoggedIn: true };
    this.updateState(this._auth);
  };

  logout = () => {
    localStorage.removeItem('isLoggedIn');
    this._auth = { ...this._auth, isLoggedIn: false };
    this.updateState(this._auth);
    Router.go('/login');
  };
}
