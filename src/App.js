import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Converter from './components/Converter';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Converter />
      </div>
    );
  }
}
