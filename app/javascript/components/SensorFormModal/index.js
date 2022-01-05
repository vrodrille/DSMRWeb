import React, { useState, useEffect } from 'react'
import ReactDOM  from 'react-dom'
import './SensorFormModal.css'
import createSensor from '../../services/createSensor'
import FormFieldErrorMessage from '../FormFieldErrorMessage'
import { clearInputFields } from '../../utils/form'

function SensorFormModal({ latitudeLongitude, onClose, addSensorAndCloseModal }){

  const [sensorInModal, setSensorInModal] = useState({latitude: null, longitude: null, location: null, ip_address: null, information: null})
  const [errors, setErrors] = useState({ip_address: null, location: null, information: null})

  useEffect(() => {
    if (latitudeLongitude){
      setSensorInModal(Object.assign({}, sensorInModal, {latitude: latitudeLongitude.lat, longitude: latitudeLongitude.lng, location: null, ip_address: null, information: null}))
    }
  }, [latitudeLongitude])

  const handleChange = (ev) => {
    setSensorInModal(Object.assign({}, sensorInModal, {[ev.target.name]: ev.target.value}))
  }

  const closingManagement = () => {
    setErrors({ip_address: null, location: null, information: null})
    clearInputFields('#sensor-form')
    onClose()
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    
    if (errors) {
      setErrors({ip_address: null, location: null, information: null})
    }

    createSensor(sensorInModal)
      .then( (response) => {
        addSensorAndCloseModal(response.data)
        clearInputFields('#sensor-form')
      })
      .catch( (error) => {
        setErrors(error.response.data.error)
      })
  }

  return(
    <div className="modal fade" id="sensor-form-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Creación de sensor</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closingManagement}></button>
          </div>
          <form id="sensor-form" onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row mb-3">
                <label className="col-3 col-form-label">Latitud:</label>
                <div className="col-auto">
                  <input className="form-control" placeholder={latitudeLongitude ? latitudeLongitude.lat : null} disabled/>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-3 col-form-label">Longitud:</label>
                <div className="col-auto">
                  <input className="form-control" placeholder={latitudeLongitude ? latitudeLongitude.lng: null} disabled/>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-3 col-form-label" htmlFor="inputLocation">Localización:</label>
                <div className="col-auto">
                  <input className={errors.location ? "form-control is-invalid" : "form-control"} id="inputLocation" name="location" onChange={handleChange}/>
                  <FormFieldErrorMessage errorMessage={errors.location ? errors.location[0] : null} tagClassName={"invalid-feedback"}/>
                </div>
              </div>
              <div className="row">
                <label className="col-3 col-form-label" htmlFor="inputIP">Dirección IP:</label>
                <div className="col-auto">
                  <input className={errors.ip_address ? "form-control is-invalid" : "form-control"} id="inputIP" name="ip_address" onChange={handleChange}/>               
                  <FormFieldErrorMessage errorMessage={errors.ip_address ? errors.ip_address[0] : null} tagClassName={"invalid-feedback"}/>
                </div> 
              </div>
            </div>
            <hr className="mt-0"/>
            <h6 className="info-section-header"> Información </h6>
            <hr />
            <div className="input-group">
              <textarea className={errors.information ? "form-control info-text-area is-invalid" : "form-control info-text-area"} name="information" onChange={handleChange}></textarea>
              <FormFieldErrorMessage errorMessage={errors.information ? errors.information[0] : null} tagClassName={"ms-3 invalid-feedback"}/>
            </div>
            <div className="mt-3 modal-footer">
              <button type="submit" className="btn btn-primary">Crear</button>
              <button type="button" className="btn btn-sm btn-link text-secondary" data-bs-dismiss="modal" onClick={closingManagement}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default function SensorFormModalPortal ({ latitudeLongitude, onClose, addSensorAndCloseModal }) {
  return ReactDOM.createPortal(
    <SensorFormModal latitudeLongitude={latitudeLongitude} onClose={onClose} addSensorAndCloseModal={addSensorAndCloseModal} />,
    document.getElementById('root')
  )
}