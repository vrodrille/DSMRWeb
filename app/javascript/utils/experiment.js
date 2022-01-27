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

export const inputDivClearer = (divIdentifier) => {
  let element = document.getElementById(divIdentifier)
  element.innerHTML = ""
}