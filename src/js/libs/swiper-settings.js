/* Swiper settings */
export function initSwiperSettings() {
  /* Hero section slider */
  const heroSwiper =
    typeof Swiper !== 'undefined' &&
    new Swiper('.hero-slider', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      parallax: true,
      slidesPerView: 1,
      centeredSlides: true,
      allowTouchMove: true,
      grabCursor: true,
      speed: 600,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        960: {
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
          },
        },
      },
      on: {
        // Change pagination type when breakpoint changes
        breakpoint: function (swiper) {
          if (swiper.pagination.el) {
            if (swiper.pagination.el.classList.contains('swiper-pagination-fraction')) {
              swiper.pagination.el.classList.remove('swiper-pagination-fraction');
              swiper.pagination.el.classList.add('swiper-pagination-bullets');
            } else {
              swiper.pagination.el.classList.remove('swiper-pagination-bullets');
              swiper.pagination.el.classList.add('swiper-pagination-fraction');
            }
            swiper.pagination.render();
            swiper.pagination.update();
          }
        },
      },
    });
}
