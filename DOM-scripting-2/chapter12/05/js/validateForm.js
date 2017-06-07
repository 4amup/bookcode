function isFilled(field) {
  if(field.value.replace(' ', '').length === 0) return;
  let placeholder = field.placeholder || field.getAttribute('placeholder');
  return (field.value != placeholder);
}
function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf('.') != -1); 
}
function validateForm(form) {
  for(let i=0; i<form.elements.length; i++) {
    let element = form.elements[i];
    if(element.required) {
      if(!isfilled(element)) {
        alert(`Please fill in the ${element.name}field.`);
        return;
      }
    }
    if(element.type = 'email') {
      if(!isEmail(element)) {
        if(!isEmail(element)) {
          alert(`The ${element.name}field must be a valid email address.`);
          return;
        }
      }
    }
  }
  return true;
}

function prepareForms() {
  for(let i=0; i<document.forms.length; i++) {
    let thisform = document.form[i];
    resetField(thisform);
    thisform.onsubmit = function() {
      return validateForm(this);
    }
  }
}