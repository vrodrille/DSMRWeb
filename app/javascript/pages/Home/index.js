import React from 'react'
import Map from '../../components/Map'
import Sidebar from '../../components/Sidebar'
import './Home.css'

export default function Home(){

  return(
    <div className="main">
      <Sidebar />
      <Map />
    </div>
  )
}