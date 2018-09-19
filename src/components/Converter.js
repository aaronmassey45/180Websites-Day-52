import React, { Component } from 'react';

import Input from './Input';

export default class Converter extends Component {
  state = {
    hex: '',
    rgb: '',
    convertFromHex: true,
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

  handleClick = e => {
    const convertFromHex = e.target.id === 'hex' ? true : false;
    this.setState({ ...this.state, convertFromHex });
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
    return (0x1000000 | rgb).toString(16).substring(1);
  };

  setBGColor = () => {
    document.body.style.backgroundColor = `#${this.state.hex}`;
  };

  render() {
    const { hex, rgb, convertFromHex } = this.state;
    return (
      <div className="container">
        <div className="card bg-light">
          <div className="card-header text-center h1 mb-0">
            Color Converter!
          </div>
          <div className="card-body">
            <Input
              label="Hex"
              name="hex"
              placeholder="hex.."
              value={hex}
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              readOnly={!convertFromHex}
            />
            <Input
              label="RGB"
              name="rgb"
              placeholder="rgb.."
              value={rgb}
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              readOnly={convertFromHex}
            />
          </div>
        </div>
      </div>
    );
  }
}
