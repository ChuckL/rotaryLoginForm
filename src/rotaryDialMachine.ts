import { InputText } from './inputText';
import { rotateOffsetDegree } from './rotaryValues';

const JOG_DEGREE_STEP = 2;
const JOG_DEGREE_MS = 8;

interface IPosition { x, y }

export class RotaryDialMachine {
  private center: IPosition;

  startUserPosition: IPosition;
  lastUserPosition: IPosition;

  lastRotationPosition: IPosition;
  maxRotationDegree: number;
  hitMinRotationForInput: boolean;
  currentRotationDegrees: number = 0;

  index = null;
  currentRotaryValueIndex = null;
  currentRotaryAuxIndex = -1;

  inputText: InputText;

  private lockInput: boolean;

  constructor(
    domRect,
    private rotaryDial,
  ) {
    this.center = {
      x: domRect.x + domRect.width / 2.0,
      y: domRect.y + domRect.height / 2.0
    };
  }

  userDown(position: IPosition) {
    if (this.lockInput) { return; }
    this.startUserPosition = position;
    this.lastUserPosition = position;

    const vecA = calcVector(this.center, { ...this.center, x: this.center.x + 10 });
    const vecB = calcVector(this.center, position);
    const radians = Math.acos(calcDotProduct(vecA, vecB) / (calcMagnitude(vecA) * calcMagnitude(vecB)));

    const determinant = calcDeterminant(vecA, vecB);
    let degree = radians * (180 / Math.PI);

    if (determinant > 0) {
      degree = 360 - degree;
    }

    this.index = Math.floor((degree - rotateOffsetDegree) / 30);
    if (this.index < 0 || this.index > 9) {
      this.index = null;
      this.startUserPosition = null;
      return;
    }

    if (this.inputText) {
      this.inputText.stopPromotionTimeout();
    }
    this.maxRotationDegree = 45 + this.index * 30;
  }

  userMove(position: IPosition) {
    if (!this.startUserPosition) { return; }
    const vecA = calcVector(this.center, this.lastUserPosition);
    const vecB = calcVector(this.center, position);

    const radians = Math.acos(calcDotProduct(vecA, vecB) / (calcMagnitude(vecA) * calcMagnitude(vecB)));
    const degree = radians * (180 / Math.PI);

    const determinant = calcDeterminant(vecA, vecB);

    this.lastUserPosition = position;

    if (Number.isNaN(radians) || radians === 0) { return; }

    if (determinant > 0) {
      const newRotationDegree = this.currentRotationDegrees + degree;
      this.hitMinRotationForInput = this.hitMinRotationForInput || newRotationDegree > this.maxRotationDegree - 10;
      this.currentRotationDegrees = newRotationDegree > this.maxRotationDegree ? this.maxRotationDegree : newRotationDegree;

      this.rotaryDial.style.transform = `rotate(${Math.floor(this.currentRotationDegrees)}deg)`;
    }

  }

  userUp() {
    this.startUserPosition = null;
    this.lockInput = true;
    this.jogBack();
  }

  async jogBack() {
    if (this.currentRotationDegrees <= 0) {
      this.currentRotationDegrees = 0;
      this.lockInput = false;
      if (this.hitMinRotationForInput) {
        this.sendInput();
      }
      if (this.inputText) {
        this.inputText.startPromotionTimeout();
      }
      this.hitMinRotationForInput = false;
      return true;
    }

    const newRotation = this.currentRotationDegrees - JOG_DEGREE_STEP;
    this.currentRotationDegrees = newRotation > 0 ? newRotation : 0;
    this.rotaryDial.style.transform = `rotate(${this.currentRotationDegrees}deg)`;

    await waitMs(JOG_DEGREE_MS);
    return this.jogBack();
  }

  sendInput() {
    if (!this.inputText) { return; }
    this.inputText.setAuxIndex(this.index);
  }

  setInputText(inputText: InputText) {
    this.inputText = inputText;
  }
}

function calcVector(start: IPosition, end: IPosition) {
  const startEndVector = {
    x: end.x - start.x,
    y: end.y - start.y
  };

  return startEndVector;
}

function calcMagnitude(vector: IPosition) {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

function calcDotProduct(a: IPosition, b: IPosition) {
  return a.x * b.x + a.y * b.y;
}

function calcDeterminant(a: IPosition, b: IPosition) {
  return a.x * b.y - a.y * b.x;
}

async function waitMs(ms: number) {
  await new Promise((resolve) => {
    setTimeout(() => { resolve(''); }, ms);
  });
}
