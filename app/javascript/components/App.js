import React from 'react'
import { Route, Switch } from 'wouter'
import Home from '../pages/Home'

/**
 * Este componente es el componente base de toda la Aplicación Web, renderizado e incluido en el DOM en el archivo
 * index.jsx presente en el directorio packs. Se encarga de enrutar la página principal (la raíz) de la Aplicación Web con
 * el componente Home.
 */
function App(){
  return(
    <Switch>
			<Route component={Home} path="/"/>
    </Switch>
  )
}

export default App