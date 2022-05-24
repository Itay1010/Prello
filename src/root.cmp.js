import React from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { routes } from './routes'

export default function App() {
  return <div className='app'>
    <Switch>
      {routes.map(route => <Route key={route.path} exact={true} component={route.component} path={route.path} />)}
    </Switch>
  </div>
}