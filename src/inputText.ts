import { findValue as findRotaryValue, rotaryValues } from './rotaryValues';

export class InputText {
  private inputTextValue = '';
  private inputTextAuxValue = '';
  private promotionTimeout;

  constructor(private inputText, private inputTextAux, private rootElement, private isPassword) {
    this.inputTextValue = rootElement.getAttribute('p') || '';
    this.inputTextAuxValue = '';
  }

  setAuxIndex(index) {
    if (!rotaryValues[index]) return;

    let value;
    const currentRotaryAuxIndex = findRotaryValue(this.inputTextAuxValue);
    if (!currentRotaryAuxIndex
      || currentRotaryAuxIndex.rowIndex !== index
      || currentRotaryAuxIndex.valueIndex >= rotaryValues[index].text.length - 1
    ) {
      this.promoteAuxValue();
      value = rotaryValues[index].text[0];
    } else {
      value = rotaryValues[index].text[currentRotaryAuxIndex.valueIndex + 1];
    }

    this.inputTextAuxValue = value;
    console.log('setting aux', value);
    this.redraw();
  }

  promoteAuxValue() {
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
    this.promotionTimeout = setTimeout(() => {
      this.promoteAuxValue();
    }, 3000);
  }

  stopPromotionTimeout() {
    clearTimeout(this.promotionTimeout);
  }

  backspace() {
    this.promoteAuxValue();
    this.inputTextValue = this.inputTextValue.length > 0 ?
      this.inputTextValue.substring(0, this.inputTextValue.length - 1) : this.inputTextValue;
    this.redraw();
  };
}
