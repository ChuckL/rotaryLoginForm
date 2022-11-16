import { mainOffset, rotarySelectOffset, rotaryValues } from './rotaryValues';

const circleRadius = 34;
const drawRadius = 160;

const baseOpts = {
  lineWidth: 2,
  color: '#AAAAAA',
  fill: false,
  clip: false
};

export function drawRotaryBase(canvas) {
  drawCircle(canvas, 0, 0, 285, { ...baseOpts, lineWidth: 4, fill: true, color: '#454545' });
  drawCircle(canvas, 0, 0, 285, { ...baseOpts, lineWidth: 4 });

  const drawRadiusText = 218;

  rotaryValues.forEach((textObj, i) => {
    drawText(canvas, drawRadiusText, mainOffset + rotarySelectOffset * i, circleRadius, textObj);
    drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * i, 4, { ...baseOpts, color: 'gold', fill: true });
  });
}

export function drawRotaryDial(canvas) {
  const circleBackground = { ...baseOpts, color: '#252525', fill: true };
  drawCircle(canvas, 0, 0, 200, circleBackground);

  const circleOpts = { ...baseOpts, clip: true };
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 0, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 1, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 2, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 3, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 4, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 5, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 6, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 7, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 8, circleRadius, circleOpts);
  drawCircle(canvas, drawRadius, mainOffset + rotarySelectOffset * 9, circleRadius, circleOpts);
  drawLineOnCircle(canvas, -30, 30, 0);
  drawLineOnCircle(canvas, -30, 30, 45);
  drawLineOnCircle(canvas, -30, 30, 90);
  drawLineOnCircle(canvas, -30, 30, 135);
}

export function drawRotaryPin(canvas) {
  const context = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const theta = 50;

  const { x: x1, y: y1 } = circleXY(150, theta);
  const { x: x2, y: y2 } = circleXY(283, theta);

  context.beginPath();
  context.strokeStyle = '#EBEBEB';
  context.fillStyle = '#EBEBEB';
  context.lineWidth = 8;
  context.moveTo(x1 + centerX, y1 + centerY);
  context.lineTo(x2 + centerX, y2 + centerY);
  context.stroke();
}

function drawLineOnCircle(canvas, radius1, radius2, theta) {
  const context = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const { x: x1, y: y1 } = circleXY(radius1, theta);
  const { x: x2, y: y2 } = circleXY(radius2, theta);

  context.beginPath();
  context.fillStyle = '#EBEBEB';
  context.lineWidth = 8;
  context.moveTo(x1 + centerX, y1 + centerY);
  context.lineTo(x2 + centerX, y2 + centerY);
  context.stroke();
}

function drawText(canvas: any, r: number, theta: number, radius, textObj) {
  const context = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const { x, y } = circleXY(r, theta);
  context.font = '28px Arial';
  context.fillStyle = '#EBEBEB';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(textObj.text[0], x + centerX, y + centerY);

  if (textObj.text.length > 1) {
    const { x: x1, y: y1 } = circleXY(50, theta - 45);
    const { x: x2, y: y2 } = circleXY(40, theta);
    const { x: x3, y: y3 } = circleXY(50, theta + 45);

    context.fillText(textObj.text[1], x1 + x + centerX, y1 + y + centerY);
    context.fillText(textObj.text[2], x2 + x + centerX, y2 + y + centerY);
    context.fillText(textObj.text[3], x3 + x + centerX, y3 + y + centerY);
  }
}

function drawCircle(canvas: any, r: number, theta: number, radius, opts = baseOpts) {
  const context = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const { x, y } = circleXY(r, theta);

  console.log(x, y);
  context.beginPath();
  context.arc(x + centerX, y + centerY, radius, 0, 2 * Math.PI, false);
  context.lineWidth = opts.lineWidth;
  context.strokeStyle = opts.color;
  if (opts.clip) {
    context.globalCompositeOperation = 'destination-out';
    context.fill();
    context.globalCompositeOperation = 'source-over';
  }

  if (opts.fill) {
    context.fillStyle = opts.color;
    context.fill();
  } else {
    context.stroke();
  }
  context.restore();
}

function circleXY(r: number, thetaRad: number) {
  // Convert angle to radians
  const theta = ((thetaRad - 90) * Math.PI) / 180;

  return {
    x: r * Math.cos(theta),
    y: -r * Math.sin(theta)
  };
}
