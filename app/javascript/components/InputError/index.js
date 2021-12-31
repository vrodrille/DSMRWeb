import React from 'react'

export default function InputError({ errorMessage }){
  return (
    <>
      { errorMessage ? <div className="invalid-feedback">
          {errorMessage}
        </div> : null
      }
    </>
  )
}