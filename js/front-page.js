function main() {
  const ERROR_NAME = 'имя должно быть от 2 до 40 символов';
  const ERROR_TEL = 'телефон в формате: +7 (123) 456-78-90';
  const ERROR_EMAIL = 'e-mail в формате: sega@yandex.ru';
  const ERROR_DATE = 'нельзя вернуться в прошлое, но можно подождать будущие';
  const inputs = document.querySelectorAll('input');
  const form = document.querySelector('.wpcf7-form');
  const formSubmitBtn = form.querySelector('.mySubmit');
  let validName = false;
  let validEmail = false;
  let validTel = false;
  let validDate = false;

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

  function removeErrorInput(inputName) {
    const wpcf7NotValidTips = inputName.parentElement.querySelector('.wpcf7-not-valid-tip');
    if (wpcf7NotValidTips) {
      wpcf7NotValidTips.parentNode.removeChild(wpcf7NotValidTips);
    }
  }

  function inputName() {
    removeErrorInput(form.myName);
    if (form.myName.checkValidity() && form.myName.value !== '') {
      validName = true;
    } else {
      setErrorInput(form.myName, ERROR_NAME);
      validName = false;
    }
  }

  function inputEmail() {
    removeErrorInput(form.myEmail);
    if (
      form.myEmail.value.match(
        /^[A-Za-z]((\.|-)?[A-Za-z0-9]+)+@[A-Za-z0-9](-?[A-Za-z0-9]+)+(\.[A-Za-z]{2,})+$/
      ) &&
      form.myEmail.value !== ''
    ) {
      validEmail = true;
    } else {
      setErrorInput(form.myEmail, ERROR_EMAIL);
      validEmail = false;
    }
  }

  function inputTel() {
    removeErrorInput(form.myTel);
    if (
      form.myTel.value.match(/^(\+7|8)\s?(\(\d{3}\)|\d{3})\s?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2}$/) &&
      form.myTel.value !== ''
    ) {
      validTel = true;
    } else {
      setErrorInput(form.myTel, ERROR_TEL);
      validTel = false;
    }
  }

  function inputDate() {
    removeErrorInput(form.myDate);
    if (checkValidityDate(form.myDate.value) && form.myDate.value !== '') {
      validDate = true;
    } else {
      setErrorInput(form.myDate, ERROR_DATE);
      validDate = false;
    }
  }

  function inputIforaForm() {
    formSubmitBtn.disabled = true;
    if (validName && validEmail && validTel && validDate) {
      formSubmitBtn.disabled = false;
    }
  }

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

  form.myName.addEventListener('input', inputName);
  form.myEmail.addEventListener('input', inputEmail);
  form.myTel.addEventListener('input', inputTel);
  form.myDate.addEventListener('input', inputDate);

  form.addEventListener('input', inputIforaForm);
}

main();
