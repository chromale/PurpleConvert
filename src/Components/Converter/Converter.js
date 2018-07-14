import React, { Component } from "react";
import axios from "axios";
import {
  callApi,
  convertApiValues,
  convertExchange,
  setDataToSessionStorage
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
    result: null,
    loading: false
  };

  componentDidMount() {
    if (!sessionStorage["Currencies"] || !sessionStorage["Rates"]) {
      return this.fetchData();
    }
    this.loadData();
  }

  loadData = () => {
    const currencies = JSON.parse(sessionStorage.getItem("Currencies"));
    const rates = JSON.parse(sessionStorage.getItem("Rates"));
    this.setState(() => ({
      latest: rates.data,
      currenciesAvailable: currencies.data
    }));
  };

  fetchData = () => {
    this.setState(() => ({ loading: true }));
    axios
      .all([callApi("get", "currencies.json"), callApi("get", "latest.json")])
      .then(
        axios.spread((currencies, latest) => {
          setDataToSessionStorage(currencies, latest);
          this.setState(() => ({
            currenciesAvailable: convertApiValues(currencies.data),
            latest: latest.data.rates,
            loading: false
          }));
        })
      );
  };

  handleChange = baseCurrency => {
    this.setState(() => ({
      baseCurrency: baseCurrency
    }));
  };

  handleChangeDestinationCurrency = destCurrency => {
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

    this.setState(() => ({
      result: convertExchange(latest, amount, destinationCurrency, baseCurrency)
    }));
  };

  render() {
    const {
      amount,
      baseCurrency,
      destinationCurrency,
      result,
      currenciesAvailable,
      loading
    } = this.state;

    const value = baseCurrency && baseCurrency.value;
    const destValue = destinationCurrency && destinationCurrency.value;

    if (loading) {
      return <div>Loading</div>;
    }

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
            onChange={this.handleChangeDestinationCurrency}
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
              destCurrency={destinationCurrency}
              amount={amount}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Converter;
