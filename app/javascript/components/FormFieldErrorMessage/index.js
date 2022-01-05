import React from 'react'

export default function FormFieldError({ errorMessage, tagClassName }){
  return (
    <div className={tagClassName}>
      { errorMessage ? errorMessage: null }
    </div> 
  )
}