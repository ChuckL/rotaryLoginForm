export const mainOffset = 110;
export const rotarySelectOffset = 30;

export const rotateOffsetDegree = 5;
export const maxRotationOffset = 45;

export const rotaryValues = [
  { text: ['1'] },
  { text: ['2', 'A', 'B', 'C'] },
  { text: ['3', 'D', 'E', 'F'] },
  { text: ['4', 'G', 'H', 'I'] },
  { text: ['5', 'J', 'K', 'L'] },
  { text: ['6', 'M', 'N', 'O'] },
  { text: ['7', 'P', 'R', 'S'] },
  { text: ['8', 'T', 'U', 'V'] },
  { text: ['9', 'W', 'X', 'Y'] },
  { text: ['0'] },
];

export const findValue = (val) => {
  const valueRowIndex = rotaryValues.findIndex((row) => {
    return row.text.includes(val);
  });

  if (valueRowIndex < 0) {
    return null;
  }

  const textIndex = rotaryValues[valueRowIndex].text.findIndex((item) => {
    return item === val;
  });

  return {
    rowIndex: valueRowIndex,
    valueIndex: textIndex
  };
};
