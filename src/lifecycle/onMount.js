import store from '../store';
import { setupLocalMouseEvents, cleanUpLocalMouseEvents } from './onKeyboardEvents';

/**
 * @summary handles Action Color Dropdown
 *  - grabs color from localStorage and updates dropdown if needed
 *  - if none, populates with default in dropdown
 */
export const setupActionColor = () => {
  const actionColorDropdownEl = document.querySelector('#actionColorDropdown');

  let actionColor = store.getActionColor();

  if (actionColor) {
    for (let i=0; i<actionColorDropdownEl.options.length; i++) {
      const option = actionColorDropdownEl.options[i];
      if (option.value === actionColor) {
        option.selected = true;
        break;
      }
    }
  } else {
    const actionColor = actionColorDropdownEl.value;
    store.setActionColor(actionColor);
  }

  actionColorDropdownEl.addEventListener('change', (e) => {
    store.setActionColor(e.target.value);
  }, false);
};

export const setupLocalMouse = () => {
  const switchToKeyboard = document.querySelector('#switchToKeyboard');
  switchToKeyboard.addEventListener('click', (e) => {
    const el = e.target;

    const isToggled = el.getAttribute('data-toggle');
    if (isToggled === 'off') {
      // turn keyboard controls on
      el.setAttribute('data-toggle', 'on');
      el.innerHTML = 'Turn Off Keyboard';
      el.nextElementSibling.style.display = 'initial';
      const localMouse = document.querySelector('#localMouse');
      localMouse.style.top = '300px';
      localMouse.style.left = '450px';

      document.activeElement.blur();
      setupLocalMouseEvents();
    } else {
      // turn keyboard controls off
      el.setAttribute('data-toggle', 'off');
      el.innerHTML = 'Turn On Keyboard';
      el.nextElementSibling.style.display = 'none';
      cleanUpLocalMouseEvents();
    }
  });
}

export const setupCaretPosition = () => {
  store.setCaretPosition(0);
  
  document.querySelector('#text-field').addEventListener('keyup', e => {
    store.setCaretPosition(e.target.selectionStart);
  })
}
