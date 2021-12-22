import React, { useState, useEffect } from 'react'
import ReactDOM  from 'react-dom'
import './CreateUpdateModal.css'

function CreateUpdateModal({ latitudeLongitude, onClose }){

  const [sensorInModal, setSensorInModal] = useState({latitude: null, longitude: null, location: null, ip_address: null, information: null})

  useEffect(() => {
    if (latitudeLongitude){
      setSensorInModal(Object.assign({}, sensorInModal, {latitude: latitudeLongitude.lat, longitude: latitudeLongitude.lng}))
    }
  }, [latitudeLongitude])

  const handleChange = (ev) => {
    setSensorInModal(Object.assign({}, sensorInModal, {[ev.target.name]: ev.target.value}))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log(sensorInModal)
  }

  return(
    <div className="modal fade" id="createUpdateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Creación de sensor</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
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
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label className="col-form-label" htmlFor="inputLocation">Localización:</label>
                </div>
                <div className="col-auto">
                  <input className="form-control" id="inputLocation" name="location" onChange={handleChange}/>
                </div>
              </div>
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label className="col-form-label" htmlFor="inputIP">Dirección IP:</label>
                </div>
                <div className="col-auto">
                  <input className="form-control" id="inputIP" name="ip_address" onChange={handleChange}/>
                </div>
              </div>
            </div>
            <hr />
            <h6 className="info-section-header"> Información </h6>
            <hr />
            <div className="input-group">
              <textarea className="form-control info-text-area" name="information" onChange={handleChange}></textarea>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Crear</button>
              <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default function CreateUpdateModalPortal ({ latitudeLongitude, onClose }) {
  return ReactDOM.createPortal(
    <CreateUpdateModal latitudeLongitude={latitudeLongitude} onClose={onClose}/>,
    document.getElementById('root')
  )
}