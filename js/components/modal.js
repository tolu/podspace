/** @type {HTMLElement} */
const modal = document.querySelector('.modal');
export const displayMessage = (message, close) => {
  const messageEl = modal.querySelector('.modal__message');
  messageEl.innerHTML = message;
  modal.style.display = 'block';
}

export const hideMessage = () => {
  displayMessage('');
  modal.style.display = 'none';
}
