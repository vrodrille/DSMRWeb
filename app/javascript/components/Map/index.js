import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
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

export default function Map(){
  return(
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}