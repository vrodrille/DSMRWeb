import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { JAEN_LOCALIZATION, ZOOM_LEVEL, convertToDms } from '../../utils/map'
import getSensors from '../../services/getSensors'

import DeleteModal from '../DeleteModal'
import deleteSensor from '../../services/deleteSensor'

import SensorFormModal from '../SensorFormModal'

/**
 * Los import de abajo y la asignación a DefaultIcon eran necesarios para el 
 * funcionamiento de React-Leaflet. Hay un problema con respecto al uso de React-Leaflet
 * en Webpack, en resumen Webpack interfiere con el algoritmo de enrutado del propio Leaflet,
 * siendo esta una de las soluciones a este problema. Para más información es necesario consultar:
 * https://github.com/PaulLeCam/react-leaflet/issues/453
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

/**
 * Este componente se encarga del renderizado del mapa en la Aplicación, así como de su funcionamiento y sus modales. Debido al 
 * uso de la librería React-Leaflet, este componente no tiene una complejidad muy alta.
 * Cabe destacar que en cuanto al componente SensorFormModal su visualización depende por entero de Bootstrap, mientras que para 
 * la visualización del modal DeleteModal se utiliza renderizado condicional.
 */
export default function Map(){

  /**
   * Este hook useState es utilizado para almacenar un Array con la lista de sensores almacenados en la base de datos de la 
   * Aplicación.
   */
  const [sensors, setSensors] = useState([])
  /**
   * Este hook useState es utilizado para almacenar un Boolean indicando si los sensores ya han sido cargados en el mapa de 
   * Leaflet.
   */
  const [sensorsLoaded, setSensorsLoaded] = useState(false)

  /**
   * Este hook useState es utilizado para almacenar un objeto, siendo este el sensor seleccionado por el usuario para su 
   * visualización.
   */
  const [sensorSelected, setSensorSelected] = useState(null)
  /**
   * Este hook useState es utilizado para almacenar un objeto, conteniendo este las coordenadas (latitud, longitud) del punto del 
   * mapa seleccionado por el usuario.
   */
  const [latLong, setLatLong] = useState(null)

  /**
   * Este hook useState es utilizado para almacenar el modal SensorFormModal.
   */
  const [modal, setModal] = useState(null)

  /**
   * Este subcomponente es utilizado para capturar el evento de doble click en el mapa, al producirse, el componente Map almacenará
   * la latitud y la longitud en el useState latLong del punto en el que se ha producido.
   */
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

  /**
   * Esta función es utilizada para añadir un sensor al componente Map en el contexto de una creación o edición y cerrar el modal renderizado
   * en el componente SensorFormModal. En el primer caso simplemente se añade el sensor a la lista de sensores del componente y el valor del 
   * useState latLong se cambia a nulo; en el caso de la edición, se elimina el sensor modificado de la lista del componente (ya que su 
   * información está desactualizada), se vuelve a añadir y se asigna su valor al useState de sensorSelected.
   * Cabe destacar que esta es una función utilizada por el componente SensorFormModal.
   * @param {Object} sensor Parámetro que contiene el sensor a añadir o modificar.
   */
  const addSensorAndCloseModal = (sensor) => {
    let sensorsArray = null
    if (sensorSelected){
      sensorsArray = sensors.filter( element => {
        return element.id != sensor.id
      })
    } else {
      sensorsArray = sensors
    }
    sensorsArray.push(sensor)
    setSensors(sensorsArray)
    if (latLong) {
      setLatLong(null)
    }
    if (sensorSelected){
      setSensorSelected(sensor)
    }
    modal.hide()
  }

  /**
   * Esta función es utilizada para gestionar el cierre del modal renderizado por el componente SensorFormModal.
   */
  const handleClose = () => {
    if (latLong) {
      setLatLong(null)
    }
  }

  /**
   * Esta función se utiliza para gestionar la operación de eliminación de un sensor, encargándose de eliminarlo de la lista de
   * sensores del componente una vez se haya completado la petición a la API.
   * @param {Object} sensor Parámetro que contiene los datos del sensor a eliminar.
   */
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

  /**
   * Este hook useEffect es utilizado para la obtención de la lista de sensores almacenados en la base de datos de la Aplicación, y la
   * asignación de un Modal de Bootstrap para el componente SensorFormModal. Su lista de dependencias está vacía, por lo cual se ejecutará 
   * únicamente en el primer renderizado del componente.
   */
  useEffect(() => {
    getSensors()
      .then( data => {
        setSensors(data)
        setSensorsLoaded(true)     
      })
    let sensorFormModal = new bootstrap.Modal(document.getElementById('sensor-form-modal'), {})
    setModal(sensorFormModal)
  }, [])

  /**
   * Esta función es utilizada para generar por cada sensor almacenado en el componente su correspondiente marcador y su Popup, que contendrán
   * sus datos.
   */
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
    <div className="content">
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
    </div>
  )
}