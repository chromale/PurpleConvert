import React, { Component } from "react";
import {
  callApi,
  convertApiValues,
  convertExchange
} from "../../Helpers/ApiHelper";
import Select from "react-select";
import * as IonIcons from "react-icons/lib/io";

import "react-select/dist/react-select.css";
import "./Converter.css";
import Button from "../Button/Button";
import Result from "../Result/Result";

class Converter extends Component {
  state = {
    currenciesAvailable: [],
    latest: [],
    baseCurrency: "",
    destinationCurrency: "",
    amount: 0,
    result: null
  };

  componentDidMount() {
    this.fetchCurrencies();
    this.fetchLatest();
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

  fetchLatest = () => {
    callApi("get", "latest.json")
      .then(res => {
        this.setState(() => ({
          latest: res.data.rates
        }));
      })
      .catch(err => {
        console.log("parsing failed", err);
      });
  };

  handleChange = baseCurrency => {
    this.setState(() => ({
      baseCurrency: baseCurrency
    }));
  };

  handleChangeDestCurrency = destCurrency => {
    this.setState(() => ({
      destinationCurrency: destCurrency
    }));
  };

  handleChangeAmount = e => {
    const val = e.target.value;
    this.setState(() => ({
      amount: val
    }));
  };

  convertValues = () => {
    const { amount, destinationCurrency, baseCurrency, latest } = this.state;

    const result = convertExchange(
      latest,
      amount,
      destinationCurrency,
      baseCurrency
    );

    this.setState(() => ({
      result
    }));
  };

  render() {
    const {
      amount,
      baseCurrency,
      destinationCurrency,
      result,
      currenciesAvailable
    } = this.state;

    const value = baseCurrency && baseCurrency.value;
    const destValue = destinationCurrency && destinationCurrency.value;

    return (
      <div className="Converter">
        <div className="Converter-wrap">
          <div className="Converter-inputBase _shadow">
            {/* TODO: Dont allow minus values */}
            <input
              type="number"
              pattern="[0-9]*"
              placeholder="Enter amount"
              value={amount}
              onChange={this.handleChangeAmount}
              className="PurpleConvertInput Converter-valueInput"
            />

            <Select
              name="Converter-currencySelect"
              className="Converter-currencySelect _purpleSelectBox"
              value={value}
              focusedOption="USD"
              placeholder="Select base currency"
              onChange={this.handleChange}
              options={currenciesAvailable}
            />
          </div>

          <div className="Converter-divider">
            <span>
              <IonIcons.IoAndroidArrowDown size={30} />
            </span>
          </div>

          {/* TODO: Select minus selected currency */}
          <Select
            name="Converter-destinationCurrencySelect"
            className="Converter-destinationCurrencySelect _shadow _purpleSelectBox"
            value={destValue}
            placeholder="Select destination currency"
            onChange={this.handleChangeDestCurrency}
            options={currenciesAvailable}
          />

          <Button
            text="Convert"
            icon={<IonIcons.IoShuffle size={20} />}
            type="primary"
            onClick={this.convertValues}
          />

          {result && (
            <Result
              result={result}
              baseCurrency={baseCurrency}
              dest={destinationCurrency}
              amount={amount}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Converter;
