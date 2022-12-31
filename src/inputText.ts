import { findValue as findRotaryValue } from './rotaryValues';

export class InputText {
  private inputTextValue = '';
  private inputTextAuxValue = '';
  private promotionTimeout;
  private rotaryValues;

  constructor(private inputText, private inputTextAux, private rootElement, private isPassword, defaultRotaryValues) {
    this.inputTextValue = rootElement.getAttribute('p') || '';
    this.inputTextAuxValue = '';
    this.rotaryValues = defaultRotaryValues;
  }

  setRotaryValues(rotaryValues) {
    this.promoteAuxValue();
    this.rotaryValues = rotaryValues;
  }

  setAuxIndex(index) {
    if (!this.rotaryValues[index]) return;

    let value;
    const currentRotaryAuxIndex = findRotaryValue(this.inputTextAuxValue, this.rotaryValues);
    if (!currentRotaryAuxIndex
      || currentRotaryAuxIndex.rowIndex !== index
      || currentRotaryAuxIndex.valueIndex >= this.rotaryValues[index].text.length - 1
    ) {
      this.promoteAuxValue();
      value = this.rotaryValues[index].text[0];
    } else {
      value = this.rotaryValues[index].text[currentRotaryAuxIndex.valueIndex + 1];
    }

    this.inputTextAuxValue = value;
    this.redraw();
  }

  promoteAuxValue() {
    this.stopPromotionTimeout();
    if (this.inputTextAuxValue) {
      this.inputTextValue = `${this.inputTextValue}${this.inputTextAuxValue}`;
    }
    this.inputTextAuxValue = '';
    this.redraw();
  }

  redraw() {
    const textValue = this.isPassword ? '*'.repeat(this.inputTextValue.length) : this.inputTextValue;
    const textValueAux = this.isPassword ? '*'.repeat(this.inputTextAuxValue.length) : this.inputTextAuxValue;

    this.inputText.textContent = textValue;
    this.inputTextAux.textContent = textValueAux;
    this.rootElement.setAttribute('p', `${this.inputTextValue}${this.inputTextAuxValue}`);
  }

  startPromotionTimeout() {
    this.stopPromotionTimeout();
    this.promotionTimeout = setTimeout(() => {
      this.promoteAuxValue();
    }, 3000);
  }

  stopPromotionTimeout() {
    if (!this.promotionTimeout) return;
    clearTimeout(this.promotionTimeout);
    this.promotionTimeout = undefined;
  }

  backspace() {
    this.promoteAuxValue();
    this.inputTextValue = this.inputTextValue.length > 0 ?
      this.inputTextValue.substring(0, this.inputTextValue.length - 1) : this.inputTextValue;
    this.redraw();
  }
}
