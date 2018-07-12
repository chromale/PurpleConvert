import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="PurpleConvert-mainView">
          <header className="PurpleConvert-header">
            <div className="PurpleConvert-header-block _logo">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="PurpleConvert-header-block _title">
              <h1>Currency Converter</h1>
            </div>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
