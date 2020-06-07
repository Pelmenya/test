function main() {
  const inputs = document.querySelectorAll('input');
  if (inputs) {
    Object.keys(inputs).forEach((item) => {
      inputs[item].classList.add('repair__input');
    });
  }
}

main();
