import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { JAEN, ZOOM_LEVEL } from '../../constants'
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
  return(
    <MapContainer center={[JAEN.latitude, JAEN.longitude]} zoom={ZOOM_LEVEL}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[37.7732, -3.7888]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <ClickLocation />
    </MapContainer>
  )
}