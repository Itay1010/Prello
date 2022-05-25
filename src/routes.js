import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { Signup } from "./pages/signup";
import { Workspace } from "./pages/workspace";
import { Board } from "./pages/board";
import { TaskDetails } from "./pages/task-details";

export const routes = [
    {
        path: '/auth/:type',
        component: Auth,
        isExact: true
    },
    {
        path: '/signup',
        component: Signup,
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