/* Table of Contents */
export function initToc() {
  const tocMq = window.matchMedia('(min-width: 960px)');
  const toc = document.querySelector('.toc');
  const tocItems = toc.querySelectorAll('.toc-item');
  const tocSections = [];

  if (!toc) return;

  tocItems.forEach((item) => {
    const section = document.querySelector(`[id="${item.getAttribute('href').slice(1)}"]`);
    section && tocSections.push(section);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (!tocMq.matches) return;

      entries.forEach((entry) => {
        const tocItem = toc.querySelector(`.toc-item[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
          tocItem.classList.add('is-observed');
        } else {
          tocItem.classList.remove('is-observed');
        }
      });
    },
    {
      rootMargin: '200px 0px',
      threshold: 0.4,
    },
  );

  tocSections.forEach((section) => {
    observer.observe(section);
  });
}
