/**
 * Este fichero contiene las constantes y funciones de apoyo de los componentes relacionados con experimentos,
 * es decir, con LaunchExperimentModal y ExperimentsResultsModal.
 */
/**
 * Esta constante de tipo entero representa el número total de instancias por defecto incluida en la sección de
 * parámetros de los generadores.
 */
export const TOTAL_INSTANCES = 500000

/**
 * Esta constante de tipo entero representa la frecuencia de información por defecto incluida en la sección de 
 * parámetros de los generadores.
 */
export const INFORMATION_FREQUENCY = 10000

/**
 * Esta constante de tipo entero representa la localización del cambio de concepto por defecto en la sección de 
 * parámetros de los generadores.
 */
export const DRIFT_LOCATION = 100000

/**
 * Esta constante de tipo entero representa el ancho de la ventana de cambio por defecto en la sección de parámetros 
 * de los generadores.
 */
export const DRIFT_WINDOW_INSTANCES = 1

/**
 * Esta constante de tipo entero representa la duración por defecto de un experimento en la sección de parámetros de los 
 * generadores.
 */
export const EXPERIMENT_DURATION = 60

/**
 * Esta constante de tipo entero representa la frecuencia con la que se realiza una llamada a la API para comprobar si hay un
 * experimento llevándose a cabo, siendo su valor de 3000 milisegundos; es decir, cada 3 segundos se realiza una llamada a la 
 * API para comprobar si hay un experimento en ejecución.
 */
export const ALGORITHM_CHECKING_FREQUENCY = 3000

/**
 * Esta función es utilizada para eliminar el texto y las opciones en los campos de select introducidos por el usuario en un 
 * form. Esta función es utilizada en el componente LaunchExperimentModal.
 * @param {String} formSelector Parámetro que indica el id del form a limpiar.
 */
export const clearFormFields = (formSelector) => {
  let form = document.querySelector(formSelector)
  let fields = form.getElementsByTagName('input')
  let length = fields.length
  while(length--){
    if(fields[length].type == "text"){
      fields[length].value = ''
    }
  }
  let selectFields = document.getElementsByTagName('select')
  let selectFieldsLength = selectFields.length
  while(selectFieldsLength--){
    selectFields[selectFieldsLength].value = ''
  }
}

/**
 * Función utilizada para eliminar los campos input generados de forma dinámica en el componente LaunchExperimentModal. 
 * @param {String} divIdentifier Parámetro que indica el id del div al cual vaciar.
 */
export const algorithmFieldsClearer = (divIdentifier) => {
  let element = document.getElementById(divIdentifier)
  element.innerHTML = ""
}

/**
 * Esta función se encarga de introducir en los campos de un formulario una serie de valores por defecto. Esta función
 * es utilizada en el componente LaunchExperimentModal.
 * @param {Array} formFields Parámetro que contiene los id de los campos a los que introducir los valores por defecto.
 * @param {Array} defaultValues Parámetro que contiene los correspondientes valores por defecto de los campos del formulario.
 */
export const addFormDefaultValues = (formFields, defaultValues) => {
  for (let i = 0; i < formFields.length; i++){
    let field = document.getElementById(formFields[i])
    field.value = defaultValues[i]
  }
}

/**
 * Funcion utilizada para transformar el identificador interno de un experimento en un nombre más legible, cambiando los guiones
 * del identificador (utilizados como separador de las cifras) por los correspondientes signos para denotar una fecha y una hora
 * (barra y dos puntos, respectivamente). Esta función es utilizada por el componente ExperimentsResultsModal.
 * @param {String} experiment Parámetro que contiene el identificador de un experimento.
 * @returns Un string que contiene el nombre del experimento con el formato cambiado.
 */
export const formatExperimentName = (experiment) => {
  let experimentNameParts = experiment.split("-")
  let experimentNameFormatted = experimentNameParts[0] + "/" + experimentNameParts[1] + "/" + experimentNameParts[2] + " " + experimentNameParts[3] + ":" + experimentNameParts[4] + ":" + experimentNameParts[5]
  return experimentNameFormatted
}