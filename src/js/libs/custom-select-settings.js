/* Custom select settings */
export function initCustomSelectSettings() {
  const nativeSelects = typeof customSelect !== 'undefined' && customSelect('.select');

  // Improve custom select aria
  const selectOpeners = document.querySelectorAll('.custom-select-opener');

  selectOpeners.forEach((opener) => {
    opener.setAttribute('aria-label', 'Select category');
  });

  // Imitate placeholder behaviour for the first option item
  const selectPlaceholders = document.querySelectorAll('.custom-select-opener span');

  selectPlaceholders.forEach((selectOpener) => {
    if (selectOpener) {
      let openerTextContent = selectOpener.textContent.trim();
      const container = selectOpener.closest('.custom-select-container');
      const firstOption = container.querySelector('.custom-select-option:first-child');
      const firstOptionText = firstOption.textContent.trim();
      firstOptionText === openerTextContent && selectOpener.classList.add('is-placeholder');

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.target === selectOpener) {
            const currentTextContent = selectOpener.textContent.trim();
            // remove the is-placeholder class if the textContent has changed
            if (currentTextContent !== openerTextContent) {
              selectOpener.classList.remove('is-placeholder');
              // update the openerTextContent variable with the new value
              openerTextContent = currentTextContent;
            }
          }
        });
      });

      observer.observe(selectOpener, { childList: true });
    }
  });

  /* Create option links */
  const selects = document.querySelectorAll('.select');

  selects.forEach((select) => {
    select.addEventListener('change', () => {
      const option = select.querySelector('option:checked');
      updateInfoLink(select, option);
    });
  });

  function updateInfoLink(select, option) {
    if (!option.dataset.link) return;
    const wrapper = select.closest('.select-wrapper');
    const infoLink = wrapper.querySelector('.select-option-link');
    const infoLinkText = infoLink.querySelector('.link-text');
    infoLink.classList.remove('is-hidden');
    infoLink.href = option.dataset.link;
    infoLinkText.textContent = option.dataset.linkText;
  }
}
