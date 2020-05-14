import React, {Component} from "react";
import './App.css';

export const tools = {
    brush: "Brush",
    eraser: "Eraser",
};
export const EVENTS = {
    ONMOUSEDOWN: "mousedown",
    ONMOUSEMOVE: "mousemove",
    ONMOUSEUP: "mouseup",
};
let isDrawing = false;
let isErasing = false;
let previousPosition;

export const onBrush = (e, canvasSettings) => {
    switch (e.type) {
        case EVENTS.ONMOUSEDOWN:
            onBrushMouseDown(e, canvasSettings);
            break;
        case EVENTS.ONMOUSEMOVE:
            onBrushMouseMove(e, canvasSettings);
            break;
        case EVENTS.ONMOUSEUP:
            onBrushMouseUp();
            break;
        default:
            break;
    }
};
export const onErase = (e, canvasSettings) => {
    switch (e.type) {
        case EVENTS.ONMOUSEDOWN:
            onEraseMouseDown(e, canvasSettings);
            break;
        case EVENTS.ONMOUSEMOVE:
            onEraseMouseMove(e, canvasSettings);
            break;
        case EVENTS.ONMOUSEUP:
            onEraseMouseUp();
            break;
        default:
            break;
    }
};
const getCoordinates = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    return [x, y];
};
const onBrushMouseDown = (e, canvasSettings) => {
    isDrawing = true;
    previousPosition = getCoordinates(e);
    brush(previousPosition, canvasSettings);
};

const onBrushMouseMove = (e, canvasSettings) => {
    if (isDrawing) {
        drawWithoutSkipping(
            previousPosition,
            getCoordinates(e),
            canvasSettings
        );
        previousPosition = getCoordinates(e);
    }
};

const onBrushMouseUp = () => {
    isDrawing = false;
};

const brush = (position, {ctx}) => {
    let [x, y] = position;
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, 3, 3);
};

const drawWithoutSkipping = (prevPosition, newPosition, canvasSettings) => {
    let [x0, y0] = prevPosition;
    const [x1, y1] = newPosition;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        brush([x0, y0], canvasSettings);
        if (x0 === x1 && y0 === y1) {
            break;
        }
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
};

const onEraseMouseDown = (e, canvasSettings) => {
    isErasing = true;
    previousPosition = getCoordinates(e);
    erase(previousPosition, canvasSettings);
};

const onEraseMouseMove = (e, canvasSettings) => {
    if (isErasing) {
        eraseWithoutSkipping(
            previousPosition,
            getCoordinates(e),
            canvasSettings
        );
        previousPosition = getCoordinates(e);
    }
};

const onEraseMouseUp = () => {
    isErasing = false;
};

const erase = (position, {ctx}) => {
    let [x, y] = position;
    ctx.clearRect(x, y, 3, 3);
};
const eraseWithoutSkipping = (prevPosition, newPosition, canvasSettings) => {
    let [x0, y0] = prevPosition;
    const [x1, y1] = newPosition;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        erase([x0, y0], canvasSettings);
        if (x0 === x1 && y0 === y1) {
            break;
        }
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
};

class Tool extends Component {

  render = () => {
  return(
<button className="tool" onClick={this.props.onToolChange}>{this.props.type}</button>
);
}
  }

export default Tool;
