import React, { Component } from "react";
import "../../Main.css";
import Header from "./../Header/Header";
import Converter from "../Converter/Converter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Converter />
      </div>
    );
  }
}

export default App;
