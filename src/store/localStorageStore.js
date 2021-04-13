
const ACTION_COLOR = 'actionColor';
export const getActionColor = () => localStorage.getItem(ACTION_COLOR) || '';
export const setActionColor = (color) => localStorage.setItem(ACTION_COLOR, color);

const CARET_POSITION = 'caretPosition';
export const getCaretPosition = () => localStorage.getItem(CARET_POSITION) || 0;
export const setCaretPosition = (position) => localStorage.setItem(CARET_POSITION, position);
