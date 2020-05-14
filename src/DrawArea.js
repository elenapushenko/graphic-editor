import React, {Component} from "react";
import './App.css';


class DrawArea extends Component {

  render = () => {

  return(
<canvas className="canvas" id="canvas" height={500} width={500} onMouseDown={this.props.onToolAction}
        onMouseMove={this.props.onToolAction}
        onMouseUp={this.props.onToolAction}> </canvas>
);
}
  }

export default DrawArea;
