export const clearInputFields = (formSelector) => {
  let form = document.querySelector(formSelector)
  let fields = form.getElementsByTagName('input')
  let length = fields.length
  while(length--){
    if(fields[length].type == "text"){
      fields[length].value = ''
    }
  }
  let textAreaFields = document.getElementsByTagName('textarea')
  let textAreaFieldsLength = textAreaFields.length
  while(textAreaFieldsLength--){
    textAreaFields[textAreaFieldsLength].value = ''
  }
}