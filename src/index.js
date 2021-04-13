import buildKeyboard from './keyboard';
import lifecycle from './lifecycle';
import './styles/styles.scss';


// document is ready!
document.addEventListener("DOMContentLoaded", function(event) { 
  buildKeyboard('keyboard');

  lifecycle.setupActionColor();
  lifecycle.setupLocalMouse();
});

const textArea = document.querySelector('#text-field');

