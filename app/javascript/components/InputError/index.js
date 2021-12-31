import React from 'react'

export default function InputError({ errorMessage }){
  return (
    <div className="invalid-feedback">
      { errorMessage ? errorMessage: null }
    </div> 
  )
}