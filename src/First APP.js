 import React, { Component } from 'react';
import logo from './logo.svg';

import { Link, Match } from 'react-router';
import SchoolPage from "./Pages/SchoolPage";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <Link to="schools">Schools</Link>
        </p>

        <Match pattern="/schools" component={SchoolPage} />
      </div>
    );
  }
}

export default App;
