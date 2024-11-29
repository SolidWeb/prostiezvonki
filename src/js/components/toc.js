/* Table of Contents */
export function initToc() {
  const toc = document.querySelector('.toc[data-observable]');
  if (!toc) return;
  const tocSections = [];
  const tocItems = toc.querySelectorAll('.toc-item');
  const tocObserveMq = window.matchMedia('(min-width: 960px)');
  const tocTuneThresholdMq = window.matchMedia('(min-width: 1200px)');

  tocItems.forEach((item) => {
    const section = document.querySelector(`[id="${item.getAttribute('href').slice(1)}"]`);
    section && tocSections.push(section);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (!tocObserveMq.matches) return;

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
      threshold: tocTuneThresholdMq.matches ? 0.4 : 0.3,
    },
  );

  tocSections.forEach((section) => {
    observer.observe(section);
  });
}
