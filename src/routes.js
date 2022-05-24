import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Workspace } from "./pages/workspace";
import { Board } from "./pages/board";

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: Signup,
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