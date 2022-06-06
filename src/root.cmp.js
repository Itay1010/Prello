import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { TaskDetails } from './pages/task-details'
import { routes } from './routes'

export default function App() {
  return <div className='app flex col space-between'>
    <Switch>
      {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
    </Switch>
  </div>
}