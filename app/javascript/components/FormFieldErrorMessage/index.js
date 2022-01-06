import React from 'react'

export default function FormFieldErrorMessage({ errorMessage, tagClassName }){
  return (
    <div className={tagClassName}>
      { errorMessage ? errorMessage: null }
    </div> 
  )
}