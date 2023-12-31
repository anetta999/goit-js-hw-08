const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const textarea = document.querySelector('textarea');
form.addEventListener('input', throttle(handlerFormInput, 500));
form.addEventListener('submit', handlerFormSubmit);

const LS_KEY = 'feedback-form-state';
let data = JSON.parse(localStorage.getItem(LS_KEY)) || {};
populateForm();
function handlerFormInput(evt) {
  data[evt.target.name] = evt.target.value;
  //   console.log(data);

  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function handlerFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(LS_KEY);

  console.log(data);
  data = {};
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(LS_KEY));
  console.log(savedData);

  if (savedData) {
    email.value = savedData.email || '';
    textarea.value = savedData.message || '';
  }
}
