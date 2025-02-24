/* Swiper settings */
export function initSwiperSettings() {
  /* Hero section slider */
  const heroSwiper =
    typeof Swiper !== 'undefined' &&
    new Swiper('.hero-slider', {
      navigation: {
        nextEl: '.hero-slider .swiper-button-next',
        prevEl: '.hero-slider .swiper-button-prev',
      },
      pagination: {
        el: '.hero-slider .swiper-pagination',
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
            type: 'fraction',
          },
        },
      },
      on: {
        // Change pagination type when breakpoint changes
        breakpoint: function (swiper) {
          changePaginationType(swiper);
        },
      },
    });

  /* Testimonials slider */
  const testimonialsSwiper =
    typeof Swiper !== 'undefined' &&
    new Swiper('.testimonials-slider', {
      navigation: {
        nextEl: '.testimonials .swiper-button-next',
        prevEl: '.testimonials .swiper-button-prev',
      },
      pagination: {
        el: '.testimonials .swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      slidesPerView: 1,
      allowTouchMove: true,
      grabCursor: true,
      spaceBetween: 20,
      speed: 500,
      loop: true,
      watchSlidesProgress: true,
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
      breakpoints: {
        960: {
          slidesPerView: 3,
          pagination: {
            type: 'fraction',
          },
        },
        1300: {
          pagination: {
            type: 'fraction',
          },
          slidesPerView: 4,
        },
      },
      on: {
        // Change pagination type when breakpoint changes
        breakpoint: function (swiper) {
          changePaginationType(swiper);
        },
      },
    });

  function changePaginationType(swiper) {
    if (swiper.pagination.el) {
      if (
        swiper.pagination.el.classList.contains('swiper-pagination-fraction') &&
        window.matchMedia('(max-width: 959.98px)').matches
      ) {
        swiper.pagination.el.classList.remove('swiper-pagination-fraction');
        swiper.pagination.el.classList.add('swiper-pagination-bullets');
      } else {
        swiper.pagination.el.classList.remove('swiper-pagination-bullets');
        swiper.pagination.el.classList.add('swiper-pagination-fraction');
      }
      swiper.pagination.render();
      swiper.pagination.update();
    }
  }

  /* Funtions slider */
  const functionsSwiperMq = window.matchMedia('(min-width: 600px)');
  let functionsTabsSwiper;
  let functionsSwiper;

  function initFunctionsSliders() {
    functionsTabsSwiper =
      typeof Swiper !== 'undefined' &&
      new Swiper('.functions-tabs-slider', {
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 0,
        breakpoints: {
          1300: {
            freeMode: false,
            allowTouchMove: false,
          },
        },
      });

    functionsSwiper =
      typeof Swiper !== 'undefined' &&
      new Swiper('.functions-slider', {
        thumbs: {
          swiper: functionsTabsSwiper,
          autoScrollOffset: 0.5,
        },
        speed: 400,
        slidesPerView: 1,
        grabCursor: true,
        autoHeight: true,
        spaceBetween: 40,
      });
  }

  if (document.querySelector('.functions-slider')) {
    functionsSwiperMq.matches && initFunctionsSliders();

    functionsSwiperMq.addEventListener('change', () => {
      if (functionsSwiperMq.matches) {
        initFunctionsSliders();
      } else {
        functionsTabsSwiper.destroy(true, true);
        functionsSwiper.destroy(true, true);
      }
    });
  }
}
