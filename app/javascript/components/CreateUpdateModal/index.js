import React from 'react'
import ReactDOM  from 'react-dom'

function CreateUpdateModal({ latitudeLongitude }){
  return(
    <div className="modal fade" id="createUpdateModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Creación de sensor</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Latitud:</label>
              </div>
              <div className="col-auto">
                <input className="form-control" placeholder={latitudeLongitude ? latitudeLongitude.lat : null} disabled/>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Longitud:</label>
              </div>
              <div className="col-auto">
                <input className="form-control" placeholder={latitudeLongitude ? latitudeLongitude.lng: null} disabled/>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">Crear</button>
            <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function CreateUpdateModalPortal ({ latitudeLongitude }) {
  return ReactDOM.createPortal(
    <CreateUpdateModal latitudeLongitude={latitudeLongitude}/>,
    document.getElementById('root')
  )
}