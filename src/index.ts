import { drawRotaryBase, drawRotaryDial, drawRotaryPin } from './canvasDrawer';
import { InputText } from './inputText';
import { RotaryDialMachine } from './rotaryDialMachine';
import { rotarySelectOffset, rotateOffsetDegree } from './rotaryValues';

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

  rotaryDialMachine = new RotaryDialMachine(rotaryDial.getBoundingClientRect(), rotaryDial);
  console.log('init successful!');

  usernameText.addEventListener('mousedown', (e) => {
    usernameText.classList.remove('border-slate-300');
    usernameText.classList.add('border-violet-300');
    passwordText.classList.remove('border-violet-300');
    passwordText.classList.add('border-slate-300');
    inputTextMachine = new InputText(usernameTextValue, usernameTextAux, usernameText, false);
    rotaryDialMachine.setInputText(inputTextMachine);
  });

  passwordText.addEventListener('mousedown', (e) => {
    usernameText.classList.remove('border-violet-300');
    usernameText.classList.add('border-slate-300');
    passwordText.classList.remove('border-slate-300');
    passwordText.classList.add('border-violet-300');
    inputTextMachine = new InputText(passwordTextValue, passwordTextAux, passwordText, true);
    rotaryDialMachine.setInputText(inputTextMachine);
  });

  document.body.addEventListener('mouseup', (e) => {
    console.log('mouseUp!');
    // console.log(e);
    rotaryDialMachine.userUp();
  });

  rotaryDial.addEventListener('mousedown', (e) => {
    console.log('mouseDown!');
    // console.log(e);
    rotaryDialMachine.userDown({ x: e.x, y: e.y });
  });

  rotaryPin.addEventListener('mousedown', (e) => {
    console.log(`mousedown: (${e.x}, ${e.y})`);
    rotaryDialMachine.userDown({ x: e.x, y: e.y });
  });

  document.body.addEventListener('mousemove', (e) => {
    // console.log(e);
    rotaryDialMachine.userMove({ x: e.x, y: e.y });
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.code === 'Backspace' && inputTextMachine) {
      inputTextMachine.backspace();
    }
  });

  drawRotaryBase(rotaryBaseCanvas);
  drawRotaryDial(rotaryDialCanvas);
  drawRotaryPin(rotaryPinCanvas);
}

function login() {
  const username = usernameText.getAttribute('p');
  const password = passwordText.getAttribute('p');
  if (username === 'ROOT' && password === 'FO0B4R') {
    window.alert(`LOGIN SUCCESSFUL! ${username}:${password}`);
  } else {
    window.alert(`LOGIN UNSUCCESSFUL? ${username}:${password}`);
  }
}

(window as any).init = init;
(window as any).login = login;