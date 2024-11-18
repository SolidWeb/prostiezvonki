/* UI utilities */
export function createOverlay(className, parent) {
  const overlay = document.createElement('div');
  overlay.classList.add(className, 'overlay');
  (parent || document.body).appendChild(overlay);
  return overlay;
}
