import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { JAEN_LOCALIZATION, ZOOM_LEVEL, convertToDms } from '../../utils/map'
import getSensors from '../../services/getSensors'

import DeleteModal from '../DeleteModal'
import deleteSensor from '../../services/deleteSensor'

import SensorFormModal from '../SensorFormModal'

/**
 * This imports and the below DefaultIcon assignation was needed so
 * React-Leaflet could work. There's an issue concerning the use of
 * React-Leaflet on Webpack, on resume Webpack interferes with Leaflet's
 * own path algorithm. Being this one of the few solutions of this problem.
 * For more information check: https://github.com/PaulLeCam/react-leaflet/issues/453
 */
import L, { map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import './Map.css'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon

export default function Map(){

  const [sensors, setSensors] = useState([])
  const [sensorsLoaded, setSensorsLoaded] = useState(false)

  const [sensorSelected, setSensorSelected] = useState(null)
  const [latLong, setLatLong] = useState(null)

  const [modal, setModal] = useState(null)

  const ClickLocation = () => {
    const map = useMapEvents({
      dblclick: (ev) => {
        let latlng = map.mouseEventToLatLng(ev.originalEvent)
        setLatLong(latlng)
      }
    })
    return null
  }

  const showModal = () => {
    modal.show()
  }

  const addSensorAndCloseModal = (sensor) => {
    let sensorsArray = sensors
    sensorsArray.push(sensor)
    setSensors(sensorsArray)
    if (latLong) {
      setLatLong(null)
    }
    modal.hide()
  }

  const handleClose = () => {
    if (latLong) {
      setLatLong(null)
    }
  }

  const handleDelete = ({sensor}) => {
    setSensorSelected(null)
    deleteSensor(sensor)
      .then( () => {
        let sensorsArray = sensors.filter( element => {
          return element.id != sensor.id
        })
        setSensors(sensorsArray)  
      })
  }

  useEffect(() => {
    getSensors()
      .then( data => {
        setSensors(data)
        setSensorsLoaded(true)     
      })
    let sensorFormModal = new bootstrap.Modal(document.getElementById('sensor-form-modal'), {})
    setModal(sensorFormModal)
  }, [])

  const addMarkersForSensors = sensors.map(sensor => {
    return (
      <Marker key={sensor.id} position={[sensor.latitude,sensor.longitude]} eventHandlers={{
        popupopen: (e) => {
          setSensorSelected(sensor)
        },
        popupclose: (e) => {
          setSensorSelected(null)
        }
      }}>
        <Popup className="sensor-popup">
          <h1 className="h5"> Sensor-ID: {sensor.id}</h1>
          <p><strong>Latitud:</strong> {convertToDms(sensor.latitude)}</p>
          <p><strong>Longitud:</strong> {convertToDms(sensor.longitude,true)}</p>
          <p><strong>Localización:</strong> {sensor.location}</p>
          <p><strong>Dirección IP:</strong> {sensor.ip_address}</p>
          <h2 className="h6 text-secondary">Información</h2>
          <p>{sensor.information}</p>
          <hr />
          <button type="button" className="btn btn-sm btn-primary float-start" onClick={showModal}>
            Editar
          </button>
          <button type="button" className="btn btn-sm btn-link text-danger float-end" data-bs-toggle="modal" data-bs-target="#deleteModal">
            Eliminar
          </button>
        </Popup>
      </Marker>
    )
  })

  return(
    <>
      <MapContainer center={[JAEN_LOCALIZATION.latitude, JAEN_LOCALIZATION.longitude]} zoom={ZOOM_LEVEL} doubleClickZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        { sensorsLoaded && addMarkersForSensors }
        <ClickLocation />
      </MapContainer>
      { sensorSelected && <DeleteModal sensor={sensorSelected} onDelete={handleDelete}/> }
      <SensorFormModal latitudeLongitude={latLong} sensorSelected={sensorSelected} onClose={handleClose} addSensorAndCloseModal={addSensorAndCloseModal}/>
      { latLong && showModal() }
    </>
  )
}