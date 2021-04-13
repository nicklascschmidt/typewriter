export const moveLocalMouse = () => {

}

// add delta to curr position, keep from going off screen
const getNewPixelValue = (curr, dir, delta) => {
  const currVal = curr.replaceAll(/\D/gi, '') || 0;
  const newVal = parseFloat(currVal) + delta;
  const bound = (dir === 'x' ? [0, window.innerWidth - 36] : [0, window.innerHeight - 66]);
  if (newVal < bound[0] || newVal > bound[1]) return curr;
  return `${newVal}px`;
}

const handleLocalMouseClick = (localMouseEl, isShiftPressed) => {
  const { x, y } = localMouseEl.getBoundingClientRect()
  
  // index 0-3 are the local mouse
  console.log('hovered els: ', document.elementsFromPoint(x, y));
  const hoveredEl = document.elementsFromPoint(x, y)[4];
  const type = hoveredEl.getAttribute('data-type');
  if (type !== 'charKey' && type !== 'specialKey') return;
  
  hoveredEl.click({ target: hoveredEl }, { isShiftPressed });
}

const handleLocalMouseEvents = (e) => {
  console.log('e.key', e.key);

  const localMouseEl = document.querySelector('#localMouse');
  const posDelta = 20;

  switch (e.key) {
    case 'ArrowUp':
      localMouseEl.style.top = getNewPixelValue(localMouseEl.style.top, 'y', -posDelta)
      break;
    case 'ArrowDown':
      localMouseEl.style.top = getNewPixelValue(localMouseEl.style.top, 'y', posDelta)
      break;
    case 'ArrowLeft':
      localMouseEl.style.left = getNewPixelValue(localMouseEl.style.left, 'x', -posDelta)
      break;
    case 'ArrowRight':
      localMouseEl.style.left = getNewPixelValue(localMouseEl.style.left, 'x', posDelta)
      break;
    case ' ':
      handleLocalMouseClick(localMouseEl, e.shiftKey);
  
    default:
      break;
  }
}

export const setupLocalMouseEvents = () => {
  document.addEventListener('keydown', handleLocalMouseEvents);
}

export const cleanUpLocalMouseEvents = () => {
  document.removeEventListener('keydown', handleLocalMouseEvents);
}
