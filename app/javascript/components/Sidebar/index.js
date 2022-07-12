import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import LaunchExperimentModal from '../LaunchExperimentModal'
import ExperimentsResultsModal from '../ExperimentsResultsModal'

/**
 * Este componente representa la Sidebar de la página principal de la Aplicación, renderizando esta y su contenido, es decir,
 * renderizando los botones que invocan a sus modales correspondientes. La muestra y cierre de estos modales (LaunchExperimentModal y
 * ExperimentsResultsModal) en la Aplicación es tarea única y exclusiva de Bootstrap, esto es, no se ha implementado lógica alguna para
 * su visualización y ocultamiento.
 */
function Sidebar(){

  /**
   * Este hook useState es empleado para almacenar el componente Modal de Bootstrap que se utilizará para controlar la visualización y 
   * ocultamiento del componente LaunchExperimentModal.
   */
  const [launchExperimentModal, setLaunchExperimentModal] = useState(null)
  /**
   * Este hook useState es empleado para almacenar el componente Modal de Bootstrap que se utilizará para controlar la visualización y
   * ocultamiento del componente ExperimentsResultsModal.
   */
  const [experimentsResultsModal, setExperimentsResultsModal] = useState(null)

  /**
   * Este hook useState es empleado para almacenar un Boolean que indica si el componente ExperimentsResultsModal se está visualizando
   * o no.
   */
  const [experimentsResultsModalIsOpen, setExperimentsResultsModalIsOpen] = useState(false)

  /**
   * Este hook useEffect es utilizado para fijar como estado de launchExperimentModal y experimentsResultsModal el Modal de Bootstrap
   * correspondiente. Su lista de dependencias está vacía, por lo cual se ejecutará únicamente en el primer renderizado del componente.
   */
  useEffect(() => {
    let launchExperimentModal = new bootstrap.Modal(document.getElementById('launch-experiment-modal'), {})
    setLaunchExperimentModal(launchExperimentModal)
    let experimentsResultModal = new bootstrap.Modal(document.getElementById('experiments-results-modal'), {})
    setExperimentsResultsModal(experimentsResultModal)
  }, [])

  const showLaunchExperimentModal = () => {
    launchExperimentModal.show()
  }

  const showExperimentsResultsModal = () =>{
    experimentsResultsModal.show()
    setExperimentsResultsModalIsOpen(true)
  }

  /**
   * Esta función es utilizada para gestionar el cierre del modal renderizado por el componente ExperimentsResultsModal.
   */
  const handleClose = () => {
    setExperimentsResultsModalIsOpen(false)
  }

  return (
    <>
      <aside className="sidebar">
        <button type="button" className="btn btn-primary sidebar-button" onClick={showLaunchExperimentModal}>Ejecutar experimento</button>
        <button type="button" className="btn btn-primary sidebar-button" onClick={showExperimentsResultsModal}>Mostrar experimentos</button>
      </aside>
      <LaunchExperimentModal />
      <ExperimentsResultsModal isOpen={experimentsResultsModalIsOpen} onClose={handleClose} />
    </>
  )
}

export default Sidebar