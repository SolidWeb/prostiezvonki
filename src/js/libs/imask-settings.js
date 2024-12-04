/* iMask settings */
export function initIMaskSettings() {
  const telInputs = document.querySelectorAll('.input-tel');

  const maskOptions = {
    mask: '+{7} (000) 000-00-00',
    lazy: false,
  };

  typeof IMask !== 'undefined' &&
    telInputs.forEach((input) => {
      input.classList.add('is-masked');
      IMask(input, maskOptions);

      // Imitate a placeholder's color change behavior
      const initialValue = '+7 (___) ___-__-__';
      input.addEventListener('input', function () {
        if (input.value !== initialValue) {
          input.classList.add('is-filled');
        } else {
          input.classList.remove('is-filled');
        }
      });
    });
}
