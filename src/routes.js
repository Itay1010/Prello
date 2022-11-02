import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { Workspace } from './pages/workspace';
import { Board } from './pages/board';

export const routes = [
    {
        path: '/auth/:type',
        Element: Auth,
        isExact: true
    },
    {
        path: '/workspace',
        Element: Workspace,
        isExact: true
    },
    {
        path: '/board/:boardId',
        Element: Board,
        isExact: true
    },
    {
        path: '/',
        Element: Home,
        isExact: true
    }
]