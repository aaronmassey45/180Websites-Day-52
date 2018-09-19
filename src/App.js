import React, { Component } from 'react';
import Navbar from './components/Navbar';
import './App.css';

export default class App extends Component {
  state = {
    hex: '',
    rgb: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (name === 'hex') {
        this.updateHex();
      } else {
        this.updateRGB();
      }
    });
  };

  updateHex = () => {
    const rgb = this.hexToRgb(this.state.hex);
    if (rgb) {
      const { r, g, b } = rgb;
      this.setState({ rgb: `${r}, ${g}, ${b}` }, this.setBGColor);
    }
  };

  updateRGB = () => {
    const arr = this.state.rgb.split(',').map(x => x.trim());
    if (arr.length === 3) {
      const hex = this.rgbToHex(arr[0], arr[1], arr[2]);
      this.setState({ hex }, this.setBGColor);
    }
  };

  hexToRgb = input => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const hex = input.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  rgbToHex = (r, g, b) => {
    const rgb = b | (g << 8) | (r << 16);
    return '#' + (0x1000000 | rgb).toString(16).substring(1);
  };

  setBGColor = () => {
    document.body.style.backgroundColor = `#${this.state.hex}`;
  };

  render() {
    const { hex, rgb } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container card text-white bg-light">
          <div className="card-body">
            <p>
              <input
                type="text"
                name="hex"
                placeholder="hex.."
                value={hex}
                onChange={this.handleChange}
              />
            </p>
            <p>
              <input
                type="text"
                name="rgb"
                placeholder="rgb.."
                value={rgb}
                onChange={this.handleChange}
              />
            </p>
          </div>
        </div>
      </div>
    );
  }
}
