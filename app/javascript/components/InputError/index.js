import React from 'react'

export default function InputError({ errorMessage, tagClassName }){
  return (
    <div className={tagClassName}>
      { errorMessage ? errorMessage: null }
    </div> 
  )
}