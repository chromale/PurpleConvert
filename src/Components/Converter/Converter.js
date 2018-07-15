// @flow
import React from "react";
import axios from "axios";
import {
  callApi,
  convertApiValues,
  convertExchange,
  setDataToSessionStorage
} from "../../Helpers/Helpers";
import Select from "react-select";
import * as IonIcons from "react-icons/lib/io";

import "react-select/dist/react-select.css";
import "./Converter.css";
import Button from "../Button/Button";
import Result from "../Result/Result";

const initialState = {
  baseCurrency: { label: "", value: "" },
  targetCurrency: { label: "", value: "" },
  amount: 0,
  result: null,
  loading: false
};

type Currency = { label: string, value: string };

export type ResultType = {
  to: Currency,
  from: Currency,
  amount: number,
  result: number
};

type Props = {};

type State = {
  baseCurrency: Currency,
  targetCurrency: Currency,
  amount: number,
  result: ?ResultType,
  loading: boolean,
  currenciesAvailable: Array<Object>,
  rates: Array<Object>
};

class Converter extends React.Component<Props, State> {
  state = {
    currenciesAvailable: [],
    rates: [],
    ...initialState
  };

  componentDidMount() {
    if (!sessionStorage["Currencies"] || !sessionStorage["Rates"]) {
      return this.fetchData();
    }
    this.loadData();
  }

  loadData = () => {
    const currenciesAvailable = JSON.parse(
      //$FlowFixMe
      sessionStorage.getItem("Currencies")
    );
    //$FlowFixMe
    const rates = JSON.parse(sessionStorage.getItem("Rates"));
    this.setState({ rates, currenciesAvailable });
  };

  fetchData = () => {
    this.setState(() => ({ loading: true }));
    axios
      .all([callApi("get", "currencies.json"), callApi("get", "latest.json")])
      .then(
        axios.spread((currencies, rates) => {
          setDataToSessionStorage(currencies, rates);
          this.setState(() => ({
            currenciesAvailable: convertApiValues(currencies.data),
            rates: rates.data.rates,
            loading: false
          }));
        })
      );
  };

  resetConverter = () => {
    this.setState({ ...initialState });
  };

  handleChange = (baseCurrency: Currency) => {
    this.setState({ baseCurrency });
  };

  handleChangeDestinationCurrency = (targetCurrency: Currency) => {
    this.setState({ targetCurrency });
  };

  handleChangeAmount = (e: any) => {
    const val = e.target.value;
    this.setState({ amount: val });
  };

  convertValues = () => {
    const { amount, targetCurrency, baseCurrency, rates } = this.state;

    const result = {
      from: baseCurrency,
      amount,
      to: targetCurrency,
      result: convertExchange(
        rates,
        amount,
        targetCurrency.value,
        baseCurrency.value
      )
    };

    this.setState({ result });
  };

  render() {
    const {
      amount,
      baseCurrency,
      targetCurrency,
      result,
      currenciesAvailable,
      loading
    } = this.state;

    const value = baseCurrency && baseCurrency.value;
    const targetCurrencyValue = targetCurrency && targetCurrency.value;

    if (loading) {
      return <div>Loading</div>;
    }

    return (
      <div className="Converter">
        <div className="Converter-wrap">
          <label className="Converter-label">
            1. How much and which currency do you want to convert?
          </label>
          <div className="Converter-inputBase _shadow">
            <input
              type="number"
              min="0"
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

          <label className="Converter-label">2. Select target currency</label>
          <Select
            name="Converter-destinationCurrencySelect"
            className="Converter-destinationCurrencySelect _shadow _purpleSelectBox"
            value={targetCurrencyValue}
            placeholder="Select target currency"
            onChange={this.handleChangeDestinationCurrency}
            options={currenciesAvailable}
          />

          {result && <Result result={result} />}

          <Button
            text={result ? "Convert again" : "Convert"}
            icon={<IonIcons.IoShuffle size={20} />}
            type="primary"
            onClick={this.convertValues}
            disabled={
              !targetCurrencyValue ||
              !baseCurrency ||
              !baseCurrency ||
              amount < 0.1
            }
          />
          {result && (
            <Button
              text="Reset"
              icon={<IonIcons.IoIosArrowLeft size={20} />}
              type="secondary"
              onClick={this.resetConverter}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Converter;
