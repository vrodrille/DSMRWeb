import React, { useEffect } from 'react'
import getSensors from '../../services/getSensors'

export default function Home(){

  useEffect(() => {
    getSensors()
      .then( data => console.log(data))
  }, [])

  return(
    <p>Hello from React</p>
  )
}