/* Sticky header */
export function initStickyHeader() {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', stickHeader);

  function stickHeader() {
    if (window.scrollY > 0) {
      header.classList.add('sticky');
      return;
    }
    if (!document.body.classList.contains('is-fixed')) {
      header.classList.remove('sticky');
    }
  }
}
