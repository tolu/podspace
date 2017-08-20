
const modal = document.querySelector('.modal');
export const displayMessage = (message: string) => {
  if(modal instanceof HTMLElement) {
    const messageEl = modal.querySelector('.modal__message');
    messageEl.innerHTML = message;
    modal.style.display = 'block';
  }
}

export const hideMessage = () => {
  if(modal instanceof HTMLElement) {
    displayMessage('');
    modal.style.display = 'none';
  }
}
