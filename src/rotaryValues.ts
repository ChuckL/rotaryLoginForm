export const mainOffset = 110;
export const rotarySelectOffset = 30;

export const rotateOffsetDegree = 5;
export const maxRotationOffset = 45;

export const rotaryUpperValues = [
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

export const rotaryLowerValues = [
  { text: ['1'] },
  { text: ['2', 'a', 'b', 'c'] },
  { text: ['3', 'd', 'e', 'f'] },
  { text: ['4', 'g', 'h', 'i'] },
  { text: ['5', 'j', 'k', 'l'] },
  { text: ['6', 'm', 'n', 'o'] },
  { text: ['7', 'p', 'r', 's'] },
  { text: ['8', 't', 'u', 'v'] },
  { text: ['9', 'w', 'x', 'y'] },
  { text: ['0'] },
];

export const rotarySpecialValues = [
  { text: ['1', '!', '`', '~'] },
  { text: ['2', '@', '[', ']'] },
  { text: ['3', '#', '{', '}'] },
  { text: ['4', '$', '/', '='] },
  { text: ['5', '%', '?', '+'] },
  { text: ['6', '^', '-', '_'] },
  { text: ['7', '&', ':', ';'] },
  { text: ['8', '*', '\\', '|'] },
  { text: ['9', '(', '"', ','] },
  { text: ['0', ')', '.', '\''] },
];

export const findValue = (val, rotaryValues) => {
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
