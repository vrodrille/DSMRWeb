import React from 'react'
import './Sidebar.css'

function Sidebar(){
  return (
    <aside className="sidebar">
      <button type="button" className="btn btn-primary sidebar-button">Ejecutar experimento</button>
      <button type="button" className="btn btn-primary sidebar-button">Mostrar experimentos</button>
    </aside>
  )
}

export default Sidebar