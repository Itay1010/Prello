import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routes } from './routes'

export default function App() {
  return <main className="app">
    <Switch>
      {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
    </Switch>
  </main>
}