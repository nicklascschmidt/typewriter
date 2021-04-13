import keyRowData from './keyboard.data';
import store from '../store';


const getValueFromSpecialKey = (currVal, dataValue, caretPosition) => {
  switch (dataValue) {
    case 'delete':
      // store.setCaretPosition(store.getCaretPosition() - 1);
      return currVal.slice(0, caretPosition - 1) + currVal.slice(caretPosition);
    case 'tab':
      return getValueFromCharKey(currVal, '  ', caretPosition);
    case 'caps lock':
      return currVal;
    case 'return':
      return getValueFromCharKey(currVal, '\n', caretPosition);
    case 'shift':
      return currVal;
  
    default:
      break;
  }
}

const getValueFromCharKey = (currVal, dataValue, caretPosition) => {
  // store.setCaretPosition(store.getCaretPosition() + dataValue.length);

  if (caretPosition === currVal.length) return currVal + dataValue;

  console.log('not at the end');
  return currVal.slice(0, caretPosition) + dataValue + currVal.slice(caretPosition);
}

const handleKeyClick = (e, { isShiftPressed } = {}) => {
  flashColor(e.target);

  const textField = document.querySelector('#text-field');
  // textField.focus();

  const dataAttr = (isShiftPressed ? 'data-value-alt' : 'data-value-def');
  const dataValue = e.target.getAttribute(dataAttr);
  // const caretIndex = store.getCaretPosition();
  const caretIndex = textField.selectionStart;
  
  let newValue = '';
  const type = e.target.getAttribute('data-type');
  switch (type) {
    case 'charKey':
      newValue = getValueFromCharKey(textField.value, dataValue, textField.selectionStart);
      break;
    case 'specialKey':
      newValue = getValueFromSpecialKey(textField.value, dataValue, textField.selectionStart);
      break;
  
    default:
      break;
  }

  textField.value = newValue;
}

const flashColor = (el, color) => {
  const defaultColor = el.style.backgroundColor;
  el.style.backgroundColor = color || store.getActionColor();

  setTimeout(() => {
    el.style.backgroundColor = defaultColor;
  }, 500);
}

const buildSpecialKey = (el, keyName) => {
  el.addEventListener('click', handleKeyClick, false);
  el.setAttribute('title', keyName);
  el.setAttribute('data-type', 'specialKey');
  el.setAttribute('data-value-def', keyName.toLowerCase());
  el.innerText = keyName;
  el.style.backgroundColor = 'lightgrey';
  return el;
}

const buildCharKey = (el, char) => {
  el.innerText = char;
  el.setAttribute('data-value-def', char);
  el.setAttribute('data-value-alt', char.toUpperCase());
  el.setAttribute('data-type', 'charKey');
  el.addEventListener('click', handleKeyClick, false);
  return el;
}

const buildTwoValueKey = (el, [val1, val2]) => {
  el.innerText = `${val1} ${val2}`;
  el.setAttribute('data-value-def', val1);
  el.setAttribute('data-value-alt', val2);
  el.setAttribute('data-type', 'charKey');
  el.addEventListener('click', handleKeyClick, false);
  return el;
}

const getDefaultKey = () => {
  const el = document.createElement('button');
  el.setAttribute('class', 'button is-light');
  return el;
}

const getKey = (content) => {
  const el = getDefaultKey();

  if (typeof content === 'string') {
    if (content.length === 1) return buildCharKey(el, content);
    return buildSpecialKey(el, content);
  }
  return buildTwoValueKey(el, content);
}

const getKeyRowFromKeyContent = (keyContent) => {
  const row = document.createElement('div');
  row.setAttribute('class', 'block is-flex is-justify-content-space-between');
  for (let i=0; i < keyContent.length; i++) {
    const newEl = getKey(keyContent[i]);
    row.appendChild(newEl);
  }
  return row;
}


const buildKeyboard = (elId) => {
  const keyboard = document.querySelector(`#${elId}`);

  for (let i=0; i < keyRowData.length; i++) {
    const newRow = getKeyRowFromKeyContent(keyRowData[i]);
    keyboard.appendChild(newRow);
  }
}

export default buildKeyboard;
