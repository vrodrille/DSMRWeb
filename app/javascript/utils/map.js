/**
 * Este fichero contiene las constantes y funciones de apoyo del componente Map.
 */
/**
 * Esta constante es un objeto de Javascript que representa la latitud y longitud de lo que se ha considerado
 * que es el centro de Jaén, situándose este punto en la Plaza de las Batallas.
 */
export const JAEN_LOCALIZATION = {latitude: 37.7732, longitude: -3.7888}

/**
 * Esta constante de tipo entero representa el nivel de zoom que por defecto posee el mapa de Leaflet.
 */
export const ZOOM_LEVEL = 15

/**
 * Esta función es utilizada para convertir las coordenadas en grados (las utilizadas por el mapa) a grados,
 * minutos, segundos y dirección.
 * @param {Number} dd Parámetro que almacena el valor de una coordenada en grados.
 * @param {Boolean} isLongitude Parámetro que indica si la coordenada a convertir se trata de la longitud.
 * @returns Un string con la coordenada transformada en grados, minutos, segundos y dirección.
 */
export function convertToDms(dd, isLongitude = false) {
  let dir = dd < 0
    ? isLongitude ? 'W' : 'S'
    : isLongitude ? 'E' : 'N'

  let absDd = Math.abs(dd)
  let deg = absDd | 0
  let frac = absDd - deg
  let min = (frac * 60) | 0
  let sec = frac * 3600 - min * 60
  // Round it to 2 decimal points.
  sec = Math.round(sec * 100) / 100
  return `${deg}° ${min}' ${sec}" ${dir}`
}