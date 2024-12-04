/* Pop-ups & modal dialogs */
import { createOverlay } from '../utils/utils';
let dialogOverlay;

export function initDialog() {
  const dialogs = document.querySelectorAll('.dialog-container');

  dialogs.forEach((dialog) => {
    const dialogName = dialog.dataset.name;

    // Initialize open buttons
    addOpenButtonListeners(dialogName);

    // Initialize close buttons
    const closeButtons = dialog.querySelectorAll('.dialog__close-button');
    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener('click', () => closeDialog(dialog));
    });

    // Add Escape key and overlay listeners
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDialog(dialog);
      }
    });

    if (dialog.hasAttribute('data-modal')) {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeDialog(dialog);
      });
    }
  });
}

export function addOpenButtonListeners(dialogName) {
  const openButtons = document.querySelectorAll(`[data-dialog="${dialogName}"]`);

  openButtons.forEach((openButton) => {
    openButton.addEventListener('click', () => {
      openDialog(dialogName);
    });
  });
}

export function openDialog(dialogName) {
  const dialog = document.querySelector(`.dialog-container[data-name="${dialogName}"]`);

  if (!dialog) {
    console.warn(`Dialog with name "${dialogName}" not found.`);
    return;
  }

  prepareDialog(dialog);
  dialog.showModal();
}

export function closeDialog(dialog) {
  if (!dialog) {
    console.warn(`Dialog is not defined.`);
    return;
  }

  dialog.classList.add('close-dialog-animation');
  if (dialogOverlay) {
    dialogOverlay.classList.remove('is-visible');
  }

  dialog.addEventListener('animationcancel', cancelDialogAnimation);
  dialog.addEventListener('animationend', completeDialogAnimation, { once: true });

  function completeDialogAnimation() {
    dialog.classList.remove('close-dialog-animation');
    dialog.close();
    dialog.removeEventListener('animationcancel', cancelDialogAnimation);
  }

  function cancelDialogAnimation() {
    dialog.classList.remove('close-dialog-animation');
    dialog.removeEventListener('animationend', completeDialogAnimation);
  }
}

function prepareDialog(dialog) {
  if (!dialogOverlay) {
    dialogOverlay = createOverlay('dialog-overlay');
  }

  if (dialog.hasAttribute('data-modal')) {
    dialogOverlay.classList.add('is-visible');
  }

  dialog.focus();
}

/* Check if the current browser supports dialogs */
export function checkDialogSupport() {
  document.addEventListener('DOMContentLoaded', function () {
    const dialog = document.querySelector('dialog');
    try {
      dialog && dialog.close();
    } catch (e) {
      const head = document.getElementsByTagName('HEAD')[0];
      const link = document.createElement('link');
      const script = document.createElement('script');
      const dialogs = document.querySelectorAll('dialog');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'vendor/dialog-polyfill/dialog-polyfill.min.css';
      script.src = 'vendor/dialog-polyfill/dialog-polyfill.min.js';
      head.append(link, script);
      script.addEventListener('load', () => {
        dialogs.forEach((dialog) => {
          dialogPolyfill.registerDialog(dialog);
        });
      });
    }
  });
}
