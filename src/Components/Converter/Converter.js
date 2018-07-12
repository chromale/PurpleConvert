import React, { Component } from "react";
import { callApi, convertApiValues } from "../../Helpers/ApiHelper";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "./Converter.css";

class Converter extends Component {
  state = {
    currenciesAvailable: [],
    selectedOption: ""
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = () => {
    callApi("get", "currencies.json")
      .then(res => {
        this.setState(() => ({
          currenciesAvailable: convertApiValues(res.data)
        }));
      })
      .catch(err => {
        console.log("parsing failed", err);
      });
  };

  handleChange = selectedOption => {
    this.setState(() => ({
      selectedOption: selectedOption
    }));
  };

  render() {
    const value = this.state.selectedOption && this.state.selectedOption.value;

    return (
      <div className="Converter">
        <div className="Converter-wrap">
          <input
            type="number"
            placeholder="Enter amount"
            className="PurpleConvertInput Converter-valueInput"
          />

          <Select
            name="Converter-currencySelect"
            value={value}
            focusedOption="USD"
            placeholder="Select currency"
            onChange={this.handleChange}
            options={this.state.currenciesAvailable}
          />
        </div>
      </div>
    );
  }
}

export default Converter;
