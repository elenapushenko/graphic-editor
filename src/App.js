import React, {Component} from 'react';
import './App.css';
import DrawArea from "./DrawArea";
import Tool, {onBrush, onErase, tools} from "./Tool";
import Color from "./Color";



class App extends Component {

  state = {
      canvasSettings: { canvas: {}, ctx: {} },
      tools: tools.brush
  };
    componentDidMount() {
        const getCanvas = document.getElementById("canvas");

        this.setState({
            canvasSettings: {
                canvas: getCanvas,
                ctx: getCanvas.getContext("2d")
            },
        });

    }

    onToolAction = (e) => {
        switch (this.state.tools) {
            default:
            case tools.brush:
                onBrush(e, this.state.canvasSettings);
                break;
            case tools.eraser:
                onErase(e, this.state.canvasSettings);
                break;
        }
    };

    onToolChange = ({ target: { textContent: tools } }) => {
        this.setState({ tools });
    };


  render = () => {

  return(
<div className="App">
  <div className="tools">
  <Tool type={tools.brush}
        onToolChange={this.onToolChange}
        currentTool={this.state.tools}/>
  <Tool type={tools.eraser}
        onToolChange={this.onToolChange}
        currentTool={this.state.tools}/>
  <Color/>
  <Tool title="Reset"/>
  </div>
  <DrawArea onToolAction={this.onToolAction} />
</div>
);
}
  }

export default App;
