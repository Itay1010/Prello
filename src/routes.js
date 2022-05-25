import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { Workspace } from "./pages/workspace";
import { Board } from "./pages/board";

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/auth/:type',
        component: Auth,
    },
    {
        path: '/workspace',
        component: Workspace,
    },
    {
        path: '/board/:boardId',
        component: Board,
    }
]