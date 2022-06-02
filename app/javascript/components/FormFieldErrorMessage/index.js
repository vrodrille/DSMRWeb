import React from 'react'

/**
 * Este componente se encarga de renderizar un mensaje de error.
 * @param {String} errorMessage Parámetro que contiene el mensaje de error a renderizar.
 * @param {String} tagClassName Parámetro que contiene la clase del div en el que se sitúa 
 * el mensaje de error.
 */
export default function FormFieldErrorMessage({ errorMessage, tagClassName }){
  return (
    <div className={tagClassName}>
      { errorMessage ? errorMessage: null }
    </div> 
  )
}