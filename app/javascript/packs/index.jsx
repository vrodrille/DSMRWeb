// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'bootstrap'
/* The below line was added in order to be able to use reference bootstrap modules anywhere in the code 
   without having to import the module on every JavaScript file. For example, in order to reference bootstrap.Modal
   in Map.js without having to include the above import on the file.
*/
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js')
import App from '../components/App'

/**
 * This HTML element is created to render the modals of the Application on a div that is above all React components.
 */
let element = document.createElement('div')
element.setAttribute('id', 'root')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(element),
  )
})
