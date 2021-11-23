import React, { useEffect } from 'react'
import getSensors from '../../services/getSensors'
import Map from '../../components/Map'

export default function Home(){

  useEffect(() => {
    getSensors()
      .then( data => console.log(data))
  }, [])

  return(
    <Map />
  )
}