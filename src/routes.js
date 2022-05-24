export const routes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/login',
        component: <Login />,
    },
    {
        path: '/signup',
        component: <Signup />,
    },
    {
        path: '/board',
        component: <Browsing />,
    },
    {
        path: '/board/:boardId',
        component: <Board />,
    }
]