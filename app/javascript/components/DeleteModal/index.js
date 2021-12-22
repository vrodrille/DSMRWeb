import React from 'react'
import ReactDOM  from 'react-dom'

function DeleteModal({ sensor, onDelete }){
  return (
    <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar sensor con ID: {sensor.id}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <p>Vas a eliminar el sensor con ID {sensor.id}, ¿estás seguro?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => onDelete({sensor})}>Eliminar</button>
            <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DeleteModalPortal ({ sensor, onDelete }) {
  return ReactDOM.createPortal(
    <DeleteModal sensor={sensor} onDelete={onDelete}/>,
    document.getElementById('root')
  )
}