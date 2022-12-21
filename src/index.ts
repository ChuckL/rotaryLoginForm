import { CanvasDrawer } from './canvasDrawer';
import { InputText } from './inputText';
import { RotaryDialMachine } from './rotaryDialMachine';
import { rotaryLowerValues, rotarySpecialValues, rotaryUpperValues } from './rotaryValues';

let rotaryPin: any;
let rotaryDial: any;
let rotaryDialMachine: RotaryDialMachine;

let rotaryBaseCanvas: any;
let rotaryDialCanvas: any;
let rotaryPinCanvas: any;

let usernameText;
let usernameTextValue;
let usernameTextAux;

let passwordText;
let passwordTextValue;
let passwordTextAux;

let inputTextMachine;

let selectorLowerCase;
let selectorUpperCase;
let selectorSpecialCase;

let canvasDrawer;

let defaultRotaryValues = rotaryLowerValues;

function init() {
  rotaryDial = document.getElementById('rotaryDial');
  rotaryPin = document.getElementById('rotaryPin');

  rotaryBaseCanvas = document.getElementById('rotaryBaseCanvas');
  rotaryDialCanvas = document.getElementById('rotaryDialCanvas');
  rotaryPinCanvas = document.getElementById('rotaryPinCanvas');

  usernameText = document.getElementById('usernameText');
  usernameTextValue = document.getElementById('usernameTextValue');
  usernameTextAux = document.getElementById('usernameTextAux');

  passwordText = document.getElementById('passwordText');
  passwordTextValue = document.getElementById('passwordTextValue');
  passwordTextAux = document.getElementById('passwordTextAux');

  selectorLowerCase = document.getElementById('selectorLowerCase');
  selectorUpperCase = document.getElementById('selectorUpperCase');
  selectorSpecialCase = document.getElementById('selectorSpecialCase');

  canvasDrawer = new CanvasDrawer(rotaryBaseCanvas, rotaryDialCanvas, rotaryPinCanvas, defaultRotaryValues);
  rotaryDialMachine = new RotaryDialMachine(rotaryDial.getBoundingClientRect(), rotaryDial);

  usernameText.addEventListener('mousedown', (e) => {
    usernameText.classList.remove('border-slate-300');
    usernameText.classList.add('border-violet-300');
    passwordText.classList.remove('border-violet-300');
    passwordText.classList.add('border-slate-300');
    inputTextMachine = new InputText(usernameTextValue, usernameTextAux, usernameText, false, defaultRotaryValues);
    rotaryDialMachine.setInputText(inputTextMachine);
  });

  passwordText.addEventListener('mousedown', (e) => {
    usernameText.classList.remove('border-violet-300');
    usernameText.classList.add('border-slate-300');
    passwordText.classList.remove('border-slate-300');
    passwordText.classList.add('border-violet-300');
    inputTextMachine = new InputText(passwordTextValue, passwordTextAux, passwordText, true, defaultRotaryValues);
    rotaryDialMachine.setInputText(inputTextMachine);
  });

  document.body.addEventListener('mouseup', (e) => {
    rotaryDialMachine.userUp();
  });

  rotaryDial.addEventListener('mousedown', (e) => {
    rotaryDialMachine.userDown({ x: e.x, y: e.y });
  });

  rotaryPin.addEventListener('mousedown', (e) => {
    rotaryDialMachine.userDown({ x: e.x, y: e.y });
  });

  document.body.addEventListener('mousemove', (e) => {
    rotaryDialMachine.userMove({ x: e.x, y: e.y });
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.code === 'Backspace' && inputTextMachine) {
      inputTextMachine.backspace();
    }
  });

  selectorLowerCase.addEventListener('mousedown', (e) => { selectorActivate(selectorLowerCase); });
  selectorUpperCase.addEventListener('mousedown', (e) => { selectorActivate(selectorUpperCase); });
  selectorSpecialCase.addEventListener('mousedown', (e) => { selectorActivate(selectorSpecialCase); });

  selectorActivate(selectorUpperCase);
  usernameText.dispatchEvent(new MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: false
  }));
}

function login() {
  const username = usernameText.getAttribute('p');
  const password = passwordText.getAttribute('p');
  if (username === 'root' && password === 'fo0B4r!') {
    window.alert(`LOGIN SUCCESSFUL! ${username}:${password}`);
  } else {
    window.alert(`LOGIN UNSUCCESSFUL? ${username}:${password}`);
  }
}

function selectorActivate(selector) {
  selectorDeactivate(selectorLowerCase);
  selectorDeactivate(selectorUpperCase);
  selectorDeactivate(selectorSpecialCase);

  selector.classList.remove('hover:bg-blue-700');
  selector.classList.remove('bg-blue-500');
  selector.classList.add('bg-blue-900');

  if (selector === selectorLowerCase) {
    setRotaryValues(rotaryLowerValues);
  }
  if (selector === selectorUpperCase) {
    setRotaryValues(rotaryUpperValues);
  }
  if (selector === selectorSpecialCase) {
    setRotaryValues(rotarySpecialValues);
  }
}

function selectorDeactivate(selector) {
  selector.classList.remove('bg-blue-500');
  selector.classList.remove('bg-blue-900');
  selector.classList.add('bg-blue-500');
  selector.classList.add('hover:bg-blue-700');
}

function setRotaryValues(rotaryValues) {
  canvasDrawer.setRotaryValues(rotaryValues);
  inputTextMachine?.setRotaryValues(rotaryValues);
  defaultRotaryValues = rotaryValues;
}

(window as any).init = init;
(window as any).login = login;
(window as any).selectorActivate = selectorActivate;
