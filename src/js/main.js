/**
  Global variables
================ **/
const mqSmall = window.matchMedia('(max-width: 959.98px)');

/**
  Check if JavaScript is enabled
============================== **/

document.body.classList.remove('no-js');

/**
  Check if the current browser supports .webp-images
================================================== **/

const checkWebp = (cb) => {
  const webp = new Image();
  webp.onload = webp.onerror = () => cb(webp.height === 2);
  webp.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

checkWebp((support) => {
  if (!support) document.body.classList.remove('webp');
});

/**
  Disable css-transitions on window load & resize
=============================================== **/

document.body.classList.remove('no-transition');

let resizeTimeout;
window.addEventListener('resize', () => {
  if (!document.body.classList.contains('no-transition')) {
    document.body.classList.add('no-transition');
  }

  // Enable transitions after resizing is finished
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    document.body.classList.remove('no-transition');
  }, 300);
});

/**
  Disable a[href="#!"] links
========================== **/

const emptyLinks = document.querySelectorAll('a[href="#!"]');

emptyLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

/**
  Toggle mobile navbar
==================== **/
const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarOverlay = document.querySelector('.navbar-overlay');

const toggleNavbar = () => {
  navbar.classList.toggle('is-visible');
  navbarToggler.setAttribute('aria-expanded', navbar.classList.contains('is-visible'));
  if (document.body.classList.contains('is-fixed')) {
    toggleBodyClasses();
    window.scrollTo({
      left: 0,
      top: parseInt(document.body.style.top) * -1,
      behavior: 'instant',
    });
    document.body.style.top = null;
  } else {
    document.body.style.top = `-${window.scrollY}px`;
    toggleBodyClasses();
  }
  navbarOverlay.classList.toggle('is-visible');

  function toggleBodyClasses() {
    document.body.classList.toggle('is-fixed', navbar.classList.contains('is-visible'));
    document.body.classList.toggle(
      'has-scroll',
      document.body.scrollHeight > window.innerHeight && navbar.classList.contains('is-visible'),
    );
  }

  // Get all anchor links in the navbar menu
  const navbarLinks = navbar.querySelectorAll('.nav__link[href*="#"]:not([href="#!"]');
  navbarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      toggleNavbar();
    });
  });

  // Sticky header view
  if (mqSmall.matches) {
    navbarOverlay.style.setProperty('--top-offset', header.offsetHeight + 'px');
  }
};

navbarToggler.addEventListener('click', toggleNavbar);
navbarOverlay.addEventListener('click', toggleNavbar);
mqSmall.addEventListener('change', () => {
  navbar.classList.remove('is-visible');
  navbarOverlay.classList.remove('is-visible');
  document.body.classList.remove('is-fixed', 'has-scroll');
  document.body.style.top = null;
});

/**
  Toggle nav submenu
================== **/
const submenuTogglers = document.querySelectorAll('.nav__sublist-toggler');

const toggleSubmenu = (e) => {
  const submenu = e.currentTarget.nextElementSibling;
  const isExpanded = submenu.getAttribute('aria-expanded');

  e.currentTarget.classList.toggle('is-active');
  submenu.classList.toggle('is-visible');

  if (isExpanded === 'false') {
    submenu.setAttribute('aria-expanded', 'true');
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
  }

  if (isExpanded === 'true') {
    submenu.setAttribute('aria-expanded', 'false');
    submenu.style.maxHeight = null;
  }
};

submenuTogglers.forEach((toggler) => {
  toggler.addEventListener('click', toggleSubmenu);
});

window.addEventListener('click', (e) => {
  submenuTogglers.forEach((toggler) => {
    const submenu = toggler.nextElementSibling;
    if (!submenu.contains(e.target) && !toggler.contains(e.target)) {
      toggler.classList.remove('is-active');
      submenu.classList.remove('is-visible');
      submenu.setAttribute('aria-expanded', 'false');
      submenu.style.maxHeight = null;
    }
  });
});

const mobileNavReturnButtons = document.querySelectorAll('.nav__mobile-return');
mobileNavReturnButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const submenu = button.closest('.nav__sublist');
    const toggler = submenu.previousElementSibling;
    toggler.classList.remove('is-active');
    submenu.classList.remove('is-visible');
    submenu.setAttribute('aria-expanded', 'false');
  });
});

/**
  Sticky header 
============= **/
import { initStickyHeader } from './components/sticky-header';
initStickyHeader();

/**
  Form elements UX
================ **/

/* Autoresizible textarea */

const textareaFields = document.querySelectorAll('.textarea-field');

textareaFields.forEach((field) => {
  const textarea = field.querySelector('.input-textarea');
  const initialHeight = textarea.offsetHeight;
  const initialOffset = initialHeight - textarea.clientHeight;

  textarea.addEventListener('input', () => {
    textarea.style.height = initialHeight + 'px';
    textarea.style.height = textarea.closest('.dialog')
      ? textarea.scrollHeight + initialOffset + 2 + 'px'
      : textarea.scrollHeight + initialOffset + 'px';
    // Fix clumsy textarea scroll
    textarea.scrollTo(0, textarea.scrollHeight);
  });
});

/* Show uploaded file name */

const fileUploadFields = document.querySelectorAll('.file-field');

fileUploadFields.forEach((field) => {
  const input = field.querySelector('.input-file');
  const label = field.querySelector('.label-file');
  const labelText = label.textContent;

  input.addEventListener('change', (e) => {
    label.textContent = e.target.files.length > 0 ? e.target.files[0].name : labelText;
  });
});

/* Password visibility toggler */

const passwordTogglers = document.querySelectorAll('.password-toggler');

passwordTogglers.forEach((toggler) => {
  toggler.addEventListener('click', () => {
    const input = toggler.nextSibling;
    toggler.classList.toggle('is-active');
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

/**
  Pop-ups & modal dialogs
======================= **/
import { checkDialogSupport, initDialog } from './components/dialog';
checkDialogSupport();
initDialog();

/**
  Accordion
========= **/
const accordions = document.querySelectorAll('.accordion');

const accordion = () => {
  accordions.forEach((accordion) => {
    const buttons = accordion.querySelectorAll('.accordion-button');
    buttons.forEach((button) => {
      const isExpanded = button.getAttribute('aria-expanded');
      isExpanded || button.setAttribute('aria-expanded', 'false');
      button.tagName === 'A' && button.setAttribute('role', 'button');
      button.addEventListener('click', toggleAccordion);
    });
  });
};

function toggleAccordion(e) {
  e.preventDefault();

  const accordion = this.closest('.accordion');
  const accordionMultiExpand = accordion.classList.contains('accordion--multi');
  const isExpanded = this.getAttribute('aria-expanded');

  if (!accordionMultiExpand) {
    const accordionButtons = accordion.querySelectorAll('.accordion-button');
    for (let i = 0; i < accordionButtons.length; i++) {
      accordionButtons[i].setAttribute('aria-expanded', 'false');
    }
  }

  if (isExpanded === 'false') {
    this.setAttribute('aria-expanded', 'true');
  }

  if (isExpanded === 'true') {
    this.setAttribute('aria-expanded', 'false');
  }
}

accordion();

/**
  Dropdown
======== **/
import Dropdown from './components/dropdown';
const dropdown = new Dropdown('.dropdown');

/**
  Table of Contents
================= **/
import { initToc } from './components/toc';
initToc();

/**
  Integration tables sticky header
================================ **/
const intTable = document.querySelector('.int-table');

intTable &&
  window.addEventListener('scroll', () => {
    const stickyTop = 69;
    const currentTop = intTable.getBoundingClientRect().top;
    currentTop <= stickyTop ? intTable.classList.add('is-sticky') : intTable.classList.remove('is-sticky');
  });

/**
  Price tables mobile switcher
============================ **/
const priceSections = document.querySelectorAll('.price-section');
priceSections.forEach((section) => {
  const dropdown = section.querySelector('.dropdown--price');
  if (!dropdown) return;

  const dropdownButtons = dropdown.querySelectorAll('.dropdown-item');
  const priceColumns = section.querySelectorAll('.price-table [data-price-column]');
  dropdownButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const columnIndex = button.dataset.priceColumn;
      priceColumns.forEach((column) => {
        if (column.dataset.priceColumn === columnIndex) {
          column.classList.add('is-visible');
        } else {
          column.classList.remove('is-visible');
        }
      });
    });
  });
});

/**
  Vendor libs settings
==================== **/
import { initSwiperSettings } from './libs/swiper-settings';
import { initCustomSelectSettings } from './libs/custom-select-settings';
initSwiperSettings();
initCustomSelectSettings();

/**
  JustValidate settings
===================== **/

// const forms = document.querySelectorAll('.form');

// forms.forEach((form) => {
//   const validator = new JustValidate(form, {
//     errorLabelStyle: {
//       // Remove default styling
//       color: false,
//     },
//   });

//   const textFields = form.querySelectorAll('.input-text[required]');

//   textFields.forEach((field) => {
//     validator.addField(field, [
//       {
//         rule: 'required',
//         errorMessage: 'Это обязательноe поле',
//       },
//       {
//         rule: 'customRegexp',
//         errorMessage: 'Некорректный формат ввода',
//         // Latin & russian letters, numbers, spaces, hyphens
//         value: /^[A-Za-z0-9А-Яа-я\s\-]+$/gi,
//       },
//       {
//         rule: 'minLength',
//         errorMessage: 'Минимум 2 символа',
//         value: 2,
//       },
//       {
//         rule: 'maxLength',
//         errorMessage: 'Максимум 30 символов',
//         value: 30,
//       },
//     ]);
//   });

//   const textareaFields = form.querySelectorAll('.input-textarea[required]');

//   textareaFields.forEach((field) => {
//     validator.addField(field, [
//       {
//         rule: 'required',
//         errorMessage: 'Это обязательноe поле',
//       },
//       {
//         rule: 'customRegexp',
//         errorMessage: 'Некорректный формат ввода',
//         // Latin & russian letters, numbers, spaces, hyphens
//         value: /^[A-Za-z0-9А-Яа-я\s\-]+$/gi,
//       },
//       {
//         rule: 'minLength',
//         errorMessage: 'Минимум 5 символов',
//         value: 5,
//       },
//       {
//         rule: 'maxLength',
//         errorMessage: 'Максимум 2000 символов',
//         value: 2000,
//       },
//     ]);
//   });

//   const emailFields = form.querySelectorAll('.input-email[required]');

//   emailFields.forEach((field) => {
//     validator.addField(field, [
//       {
//         rule: 'required',
//         errorMessage: 'Это обязательноe поле',
//       },
//       {
//         rule: 'email',
//         errorMessage: 'Некорректный формат e-mail',
//       },
//     ]);
//   });

//   const phoneFields = form.querySelectorAll('.input-tel[required]');

//   phoneFields.forEach((field) => {
//     validator.addField(field, [
//       {
//         rule: 'required',
//         errorMessage: 'Это обязательноe поле',
//       },
//       {
//         rule: 'customRegexp',
//         errorMessage: 'Некорректный формат номера',
//         // Russian phone number formats + simple 7 digit format
//         value:
//           /^(?:\+?7|8)?[\s-]?(?:\(?(?:9\d{2}|4[6-9]\d|5\d{2}|3[0-8]\d|82\d|8[1-9][0-9])\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\d{3}[\s-]?\d{2}[\s-]?\d{2})$/gi,
//       },
//     ]);
//   });

//   const passwordFields = form.querySelectorAll('.input-password[required]');

//   passwordFields.forEach((field) => {
//     validator.addField(field, [
//       {
//         rule: 'required',
//         errorMessage: 'Это обязательноe поле',
//       },
//       {
//         rule: 'minLength',
//         errorMessage: 'Минимум 8 символов',
//         value: 8,
//       },
//     ]);
//   });

//   const checkboxes = form.querySelectorAll('.input-checkbox[required]');

//   checkboxes.forEach((checkbox) => {
//     validator.addField(checkbox, [
//       {
//         rule: 'required',
//         errorMessage: 'Это обязательноe поле',
//       },
//     ]);
//   });

//   const radioGroups = form.querySelectorAll('.radio-fieldset--required');

//   radioGroups.forEach((radioGroup) => {
//     validator.addRequiredGroup(radioGroup, 'Выберите одну из опций');
//   });

//   validator.onSuccess((event) => {
//     /* Redirect to the success page upon successful form submission */
//     // const rootLocation = 'https://domen.name';
//     // const successPage = 'success.html';
//     // window.location.href = rootLocation + successPage;
//     /* Complete form submission template */
//     //   const xhr = new XMLHttpRequest();
//     //   const formData = new FormData(form);
//     //   xhr.open('POST', form.getAttribute('action'));
//     //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     //   xhr.send(formData);
//     //   xhr.onreadystatechange = function () {
//     //     const statusDialogSuccess = document.querySelector(
//     //       '.dialog[data-name="success"]'
//     //     );
//     //     // Form send successfully
//     //     if (this.readyState === 4 && this.status === 200) {
//     //       statusDialogSuccess.showModal();
//     //     }
//     //   };
//     //   xhr.onerror = function () {
//     //     // error
//     //   };
//   });
// });
