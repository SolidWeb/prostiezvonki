/* Sticky header */
export function initStickyHeader() {
  const header = document.querySelector('.header');
  let stickyHeaderOffset;

  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener('scroll', stickHeader);

  function stickHeader() {
    if (window.scrollY > stickyHeaderOffset) {
      header.classList.add('sticky');
      return;
    }
    if (!document.body.classList.contains('is-fixed')) {
      header.classList.remove('sticky');
    }
  }

  function updateHeaderHeight() {
    let navbarHeight;
    const mobileMq = window.matchMedia('(max-width: 599.98px)');

    navbarHeight = mobileMq.matches ? 69 : 71;

    stickyHeaderOffset = header.offsetHeight - navbarHeight;
  }
}
