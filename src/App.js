import React, { Component } from 'react';
import Navbar from './navbar';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      hex: '',
      rgb: ''
    }
  }

  handleHexChange = (e) => {
    const { value } = e.target;
    this.setState({ hex: value })
    if (hexToRgb(value) !== null) {
      document.body.style.color = getContrastYIQ(value);
      const rgb = hexToRgb(value);
      const r = rgb.r;
      const g = rgb.g;
      const b = rgb.b;
      this.setState({ rgb: `${r}, ${g}, ${b}` }, () => {
        document.body.style.backgroundColor = `rgb(${this.state.rgb})`;
      })
    }
  }

  handleRGBChange = (e) => {
    const { value } = e.target;
    this.setState({ rgb: value });
    const arr = value.split(",").map(x => {
      return x.trim();
    });
    if (arr.length === 3) {
      const hex = rgbToHex(arr[0],arr[1],arr[2]);
      this.setState({ hex }, () => {
        document.body.style.backgroundColor = hex;
        document.body.style.color = getContrastYIQ(hex);
      })
    }
  }

  render() {
    const { hex, rgb } = this.state;
    return (
      <div className="App">
        <Navbar brand="Hex/RGB Converter" />
        <div className="container hexrgb">
          <p>
            <input type="text" id="hex" placeholder="hex.." value={hex} onChange={this.handleHexChange}/>
          </p>
          <p>
            <input type="text" id="rgb" placeholder="rgb.." value={rgb} onChange={this.handleRGBChange}/>
          </p>
        </div>
      </div>
    );
  }
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    var rgb = b | (g << 8) | (r << 16);
    return "#" + (0x1000000 | rgb).toString(16).substring(1);
}

function getContrastYIQ(hexcolor){
    let hex = hexcolor.split("");
    if (hex[0] === "#") {
      hex.shift();
    }
    hex = hex.join("");
    hex = hexcolor.length === 3 ? `${hexcolor.charAt(0)}${hexcolor.charAt(0)}${hexcolor.charAt(1)}${hexcolor.charAt(1)}${hexcolor.charAt(2)}${hexcolor.charAt(2)}` : hex;
    var r = parseInt(hex.substr(0,2),16);
    var g = parseInt(hex.substr(2,2),16);
    var b = parseInt(hex.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}
