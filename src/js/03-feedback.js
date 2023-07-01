const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const textarea = document.querySelector('textarea');
form.addEventListener('input', throttle(handlerFormInput, 500));
form.addEventListener('submit', handlerFormSubmit);

const LS_KEY = 'feedback-form-state';
const data = {};
function handlerFormInput(evt) {
  data[evt.target.name] = evt.target.value;
  //   console.log(data);

  const LSData = localStorage.setItem(LS_KEY, JSON.stringify(data));
  const savedData = localStorage.getItem(LS_KEY);
  const parsedSavedData = JSON.parse(savedData);
  if (LSData) {
    email.value = parsedSavedData.email;
    textarea.value = parsedSavedData.message;
  }
}

function handlerFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(LS_KEY);

  console.log(data);
}
