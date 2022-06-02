import React from 'react'
import Map from '../../components/Map'
import Sidebar from '../../components/Sidebar'
import './Home.css'

/**
 * Este componente representa a la página principal de la Aplicación Web, se encarga de renderizar 
 * los componentes Sidebar y Map.
 */
export default function Home(){

  return(
    <div className="main">
      <Sidebar />
      <Map />
    </div>
  )
}