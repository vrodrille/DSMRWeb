import React, {useState, useEffect} from 'react'
import getAlgorithms from '../../services/getAlgorithms'
import getAlgorithmParams from '../../services/getAlgorithmParams'
import getGenerators from '../../services/getGenerators'
import getGeneratorParams from '../../services/getGeneratorParams'

function LaunchExperimentModal(){

  const [algorithms, setAlgorithms] = useState([])

  useEffect(() => {
    getAlgorithms()
      .then( response =>
        console.log(response.data)
      )

    getAlgorithmParams("evolutivo")
      .then( response =>
        console.log(response.data)  
      )

    getGenerators()
      .then( response =>
        console.log(response.data)  
      )

    getGeneratorParams("prueba")
      .then( response =>
        console.log(response.data)  
      )
  },[])

  return(
    <div id="launch-experiment-modal">
    </div>
  )
}

export default LaunchExperimentModal