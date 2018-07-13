import React, { Component } from "react";
import { callApi, convertApiValues } from "../../Helpers/ApiHelper";
import Select from "react-select";
import * as IonIcons from "react-icons/lib/io";

import "react-select/dist/react-select.css";
import "./Converter.css";
import Button from "../Button/Button";

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

  convertValues = () => {
    console.log("yolo");
  };

  render() {
    const value = this.state.selectedOption && this.state.selectedOption.value;

    return (
      <div className="Converter">
        <div className="Converter-wrap">
          <div className="Converter-inputBase _shadow">
            <input
              type="number"
              placeholder="Enter amount"
              className="PurpleConvertInput Converter-valueInput"
            />

            <Select
              name="Converter-currencySelect"
              className="Converter-currencySelect _purpleSelectBox"
              value={value}
              focusedOption="USD"
              placeholder="Select base currency"
              onChange={this.handleChange}
              options={this.state.currenciesAvailable}
            />
          </div>

          <div className="Converter-divider">
            <span>
              <IonIcons.IoAndroidArrowDown size={30} />
            </span>
          </div>

          <Select
            name="Converter-destinationCurrencySelect"
            className="Converter-destinationCurrencySelect _shadow _purpleSelectBox"
            value={value}
            focusedOption="USD"
            placeholder="Select destination currency"
            onChange={this.handleChange}
            options={this.state.currenciesAvailable}
          />

          <Button
            text="Convert"
            icon={<IonIcons.IoShuffle size={20} />}
            type="primary"
            onClick={this.convertValues}
          />
        </div>
      </div>
    );
  }
}

export default Converter;