import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { JAEN, ZOOM_LEVEL } from '../../constants'
import getSensors from '../../services/getSensors'
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

function convertToDms(dd, isLng) {
  let dir = dd < 0
    ? isLng ? 'W' : 'S'
    : isLng ? 'E' : 'N'

  let absDd = Math.abs(dd)
  let deg = absDd | 0
  let frac = absDd - deg
  let min = (frac * 60) | 0
  let sec = frac * 3600 - min * 60
  // Round it to 2 decimal points.
  sec = Math.round(sec * 100) / 100
  return deg + "°" + min + "'" + sec + '"' + dir
}

export default function Map(){

  const [sensors, setSensors] = useState([])
  const [sensorsLoaded, setSensorsLoaded] = useState(false)

  useEffect(() => {
    getSensors()
      .then( data => {
        setSensors(data)
        setSensorsLoaded(true)     
      })
  }, [])

  const addMarkersForSensors = sensors.map(sensor => {
    return (
      <Marker key={sensor.id} position={[sensor.latitude,sensor.longitude]}>
        <Popup>
          <h1> Sensor-ID: {sensor.id}</h1>
          <div className="">
            <p>Latitud:</p>
            <p>{convertToDms(sensor.latitude,false)}</p>
            <p>Longitud:</p>
            <p>{convertToDms(sensor.longitude,true)}</p>
            <p>Localización:</p>
            <p>{sensor.location}</p>
            <p>Dirección IP:</p>
            <p>{sensor.ip_address}</p>
          </div>
          <h2>Información</h2>
          <div className="">
            <p>{sensor.information}</p>
          </div>
          <button className="btn btn-outline-primary">
            Editar
          </button>
          <button className="btn btn-outline-danger">
            Eliminar
          </button>
        </Popup>
      </Marker>
    )
  })

  return(
    <MapContainer center={[JAEN.latitude, JAEN.longitude]} zoom={ZOOM_LEVEL}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      { sensorsLoaded && addMarkersForSensors }
      <ClickLocation />
    </MapContainer>
  )
}