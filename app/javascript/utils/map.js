export const JAEN_LOCALIZATION = {latitude: 37.7732, longitude: -3.7888}

export const ZOOM_LEVEL = 15

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
  return deg + "°" + min + "'" + sec + '"' + dir
}