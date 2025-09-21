import { createContext } from '@lit/context';

// 定义我们希望在上下文中共享的数据结构
export interface AuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// 创建上下文，并为其提供一个唯一的键
export const authContext = createContext<AuthContext>('auth-context');
