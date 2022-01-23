import React from 'react'
import './Sidebar.css'
import LaunchExperimentModal from '../LaunchExperimentModal'

function Sidebar(){
  return (
    <>
    <aside className="sidebar">
      <button type="button" className="btn btn-primary sidebar-button">Ejecutar experimento</button>
      <button type="button" className="btn btn-primary sidebar-button">Mostrar experimentos</button>
    </aside>
    <LaunchExperimentModal />
    </>
  )
}

export default Sidebar