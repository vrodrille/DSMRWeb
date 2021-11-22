import React from 'react'
import { Route, Switch } from 'wouter'
import Home from '../pages/Home'

function App(){
  return(
    <Switch>
			<Route component={Home} path="/"/>
    </Switch>
  )
}

export default App