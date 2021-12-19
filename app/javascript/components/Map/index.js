import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { JAEN_LOCALIZATION, ZOOM_LEVEL, convertToDms } from '../../utils/map'
import getSensors from '../../services/getSensors'

import DeleteModal from '../DeleteModal'
import deleteSensor from '../../services/deleteSensor'

/**
 * This imports and the below DefaultIcon assignation was needed so
 * React-Leaflet could work. There's an issue concerning the use of
 * React-Leaflet on Webpack, on resume Webpack interferes with Leaflet's
 * own path algorithm. Being this one of the few solutions of this problem.
 * For more information check: https://github.com/PaulLeCam/react-leaflet/issues/453
 */
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import './Map.css'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon

function ClickLocation() {
  const map = useMapEvents({
    dblclick: (ev) => {
      let latlng = map.mouseEventToLatLng(ev.originalEvent)
      console.log(latlng.lat + ', ' + latlng.lng)
    }
  })
  return null
}

export default function Map(){

  const [sensors, setSensors] = useState([])
  const [sensorsLoaded, setSensorsLoaded] = useState(false)

  const [sensorSelected, setSensorSelected] = useState(null)

  const handleDelete = ({sensor}) => {
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
  }, [])

  const addMarkersForSensors = sensors.map(sensor => {
    return (
      <Marker key={sensor.id} position={[sensor.latitude,sensor.longitude]} eventHandlers={{
        click: (e) => {
          setSensorSelected(sensor)
        },
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
          <button type="button" className="btn btn-sm btn-primary float-start">
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
      <MapContainer center={[JAEN_LOCALIZATION.latitude, JAEN_LOCALIZATION.longitude]} zoom={ZOOM_LEVEL}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        { sensorsLoaded && addMarkersForSensors }
        <ClickLocation />
      </MapContainer>
      { sensorSelected && <DeleteModal sensor={sensorSelected} onDelete={handleDelete}/> }
    </>
  )
}