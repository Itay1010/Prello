import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { Workspace } from './pages/workspace';
import { Board } from './pages/board';

export const routes = [
    {
        path: '/auth/:type',
        component: Auth,
        isExact: true
    },
    {
        path: '/workspace',
        component: Workspace,
        isExact: true
    },
    {
        path: '/board/:boardId',
        component: Board,
        isExact: true
    },
    {
        path: '/',
        component: Home,
        isExact: true
    }
]