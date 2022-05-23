export const TOTAL_INSTANCES = 500000

export const INFORMATION_FREQUENCY = 10000

export const DRIFT_LOCATION = 100000

export const DRIFT_WINDOW_INSTANCES = 1

export const EXPERIMENT_DURATION = 60

export const ALGORITHM_CHECKING_FREQUENCY = 3000

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

export const algorithmFieldsClearer = (divIdentifier) => {
  let element = document.getElementById(divIdentifier)
  element.innerHTML = ""
}

export const addFormDefaultValues = (formFields, defaultValues) => {
  for (let i = 0; i < formFields.length; i++){
    let field = document.getElementById(formFields[i])
    field.value = defaultValues[i]
  }
}