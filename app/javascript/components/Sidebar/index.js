import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import LaunchExperimentModal from '../LaunchExperimentModal'
import ExperimentsResultsModal from '../ExperimentsResultsModal'

function Sidebar(){

  const [launchExperimentModal, setLaunchExperimentModal] = useState(null)
  const [experimentsResultsModal, setExperimentsResultModal] = useState(null)

  useEffect(() => {
    let launchExperimentModal = new bootstrap.Modal(document.getElementById('launch-experiment-modal'), {})
    setLaunchExperimentModal(launchExperimentModal)
    let experimentsResultModal = new bootstrap.Modal(document.getElementById('experiments-results-modal'), {})
    setExperimentsResultModal(experimentsResultModal)
  }, [])

  const showLaunchExperimentModal = () => {
    launchExperimentModal.show()
  }

  const showExperimentsResultsModal = () =>{
    experimentsResultsModal.show()
  }

  return (
    <>
      <aside className="sidebar">
        <button type="button" className="btn btn-primary sidebar-button" onClick={showLaunchExperimentModal}>Ejecutar experimento</button>
        <button type="button" className="btn btn-primary sidebar-button" onClick={showExperimentsResultsModal}>Mostrar experimentos</button>
      </aside>
      <LaunchExperimentModal />
      <ExperimentsResultsModal />
    </>
  )
}

export default Sidebar