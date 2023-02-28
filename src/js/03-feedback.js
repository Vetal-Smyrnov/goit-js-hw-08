import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

function onFormInput(e) {
  const { name, value } = e.target;
  const oldData = getData();
  setData({ ...oldData, ...{ [name]: value } });
}

function onFormSubmit(e) {
  e.preventDefault();
  const submittedData = {};
  const formData = new FormData(formEl);

  for (const [name, value] of formData) {
    submittedData[name] = value;
  }
  console.log(submittedData);

  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function setData(dataObj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObj));
}

function getData() {
  const dataJSON = localStorage.getItem(STORAGE_KEY) || '{}';

  try {
    return JSON.parse(dataJSON);
  } catch (e) {
    console.log('error: ', e);
    return {};
  }
}

function initListeners() {
  formEl.addEventListener('input', throttle(onFormInput, 500));
  formEl.addEventListener('submit', onFormSubmit);
}

function init() {
  initListeners();

  const savedFormData = getData();
  Object.entries(savedFormData).forEach(([key, value]) => {
    if (formEl.elements[key]) {
      formEl.elements[key].value = value;
    }
  });
}

init();
