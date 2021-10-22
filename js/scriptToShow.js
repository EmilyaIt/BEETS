const myForm = document.querySelector('.form');
const send = document.querySelector('.button');
const clr = document.querySelector('.button--reset');

function validateField(field) {
  if (!field.checkValidity()) {
    field.placeholder = field.validationMessage;
    field.classList.add('.form__input--error');
    console.log(field.textContent);
    return false
  } else {
    field.placeholder = '';
    field.classList.remove('form__input--error');
  }
}

function validateForm(form) {

  let valid = true;

  // console.dir(form.elements);

  if (!validateField(form.elements.name)) {
    valid = false;
  }

  if (!validateField(form.elements.phone)) {
    valid = false;
  }

  return valid
}

send.addEventListener('click', event =>{
  event.preventDefault();

  if (validateForm(myForm)) {
    console.log("ok!")
    // Отправка данных
  }

})

clr.addEventListener('click', (event)=>{
  event.preventDefault();

  temp = document.querySelectorAll('.form__imput--error');

  temp.forEach((el) => {
    el.classList.remove('.form__input--error');

  })

  temp = document.querySelectorAll('.form__imput');

  temp.forEach((el) => {
    el.value ='';

  })
})
