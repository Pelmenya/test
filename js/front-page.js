function main() {
  const ERROR_NAME = 'имя должно быть от 2 до 40 символов';
  const ERROR_TEL ='телефон в формате: +7 (123) 456-78-90';
  const ERROR_EMAIL='e-mail в формате: sega@yandex.ru'

  const inputs = document.querySelectorAll('input');
  const form = document.querySelector('.wpcf7-form');
  const formEmailSpan = form.querySelector('myEmail');
  const formTelSpan = form.querySelector('myTel');
  const formDateSpan = form.querySelector('myDate');

  function checkValidityDate(dateInput) {
    const dateInputArr = dateInput.split('-');
    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();
    const monthNow = dateNow.getMonth();
    const dayNow = dateNow.getDate();
    if (
      Number(dateInputArr[0]) >= Number(yearNow) &&
      Number(dateInputArr[1]) >= Number(monthNow) &&
      Number(dateInputArr[2]) >= Number(dayNow)
    ) {
      return true;
    }
    return false;
  }

  function setErrorInput(inputName, errorMessage) {
    inputName.parentElement.insertAdjacentHTML(
      'beforeend',
      `<span class="wpcf7-not-valid-tip">${errorMessage}<span>`
    );
  }

  function clearInputTips() {
    const wpcf7NotValidTips = form.querySelectorAll('.wpcf7-not-valid-tip');
    if (wpcf7NotValidTips) {
      Object.keys(wpcf7NotValidTips).forEach((item) => {
        wpcf7NotValidTips[item].parentNode.removeChild(wpcf7NotValidTips[item]);
      });
    }
  }

  function inputIforaForm() {
    clearInputTips();

    let valid = false;

    if (
      form.myEmail.value.match(
        /^[A-Za-z]((\.|-)?[A-Za-z0-9]+)+@[A-Za-z0-9](-?[A-Za-z0-9]+)+(\.[A-Za-z]{2,})+$/
      )
    ) {
    } else {
      setErrorInput(form.myEmail, ERROR_EMAIL);
    }

    if (form.myTel.value.match(/^(\+7|8)\s?(\(\d{3}\)|\d{3})\s?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2}$/)) {
    } else {
      setErrorInput(form.myTel, ERROR_TEL);
    }

    if (form.myName.checkValidity() && form.myName.value !== '') {
    } else {
      setErrorInput(form.myName, ERROR_NAME);
    }

    console.log(checkValidityDate(form.myDate.value));
    if (checkValidityDate(form.myDate.value)) {
    }
  }

  function submitIforaForm() {}

  if (form) {
    form.myName.minLength = '2';
    form.myName.maxLength = '40';
    form.myTime.type = 'time';
  }

  if (inputs) {
    Object.keys(inputs).forEach((item) => {
      inputs[item].classList.add('ifora__input');
    });
  }
  form.addEventListener('input', inputIforaForm);
  form.addEventListener('submit', submitIforaForm);
}

main();
