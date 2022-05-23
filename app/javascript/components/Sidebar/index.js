import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import LaunchExperimentModal from '../LaunchExperimentModal'

function Sidebar(){

  const [launchExperimentModal, setLaunchExperimentModal] = useState(null)

  useEffect(() => {
    let launchExperimentModal = new bootstrap.Modal(document.getElementById('launch-experiment-modal'), {})
    setLaunchExperimentModal(launchExperimentModal)
  }, [])

  const showLaunchExperimentModal = () => {
    launchExperimentModal.show()
  }

  return (
    <>
      <aside className="sidebar">
        <button type="button" className="btn btn-primary sidebar-button" onClick={showLaunchExperimentModal}>Ejecutar experimento</button>
        <button type="button" className="btn btn-primary sidebar-button">Mostrar experimentos</button>
      </aside>
      <LaunchExperimentModal />
    </>
  )
}

export default Sidebar