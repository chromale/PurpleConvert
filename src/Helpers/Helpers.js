import axios from "axios";

const server = "https://openexchangerates.org/api/";
const apiKey = "65964a5ce1734f43b72497c695f51979";

export const callApi = (method, url, payload) => {
  switch (method) {
    case "get":
      return axios.get(`${server}${url}?app_id=${apiKey}`);
    case "post":
      return axios.post(server + url, payload);
    default:
      return null;
  }
};

export const convertApiValues = object => {
  return Object.entries(object).map(([value, label]) => ({
    label: `${value} - ${label}`,
    value
  }));
};

export const getCurrencyValueInUsd = (rates, targetCurrency, amount) => {
  return amount / rates[targetCurrency];
};

export const convertValue = (rates, baseCurrency, targetCurrency) => {
  return baseCurrency * rates[targetCurrency];
};

export const convertExchange = (
  rates,
  amount,
  targetCurrency,
  baseCurrency
) => {
  const baseInUsd = getCurrencyValueInUsd(rates, baseCurrency, amount);
  return convertValue(rates, baseInUsd, targetCurrency);
};

export const setDataToSessionStorage = (currencies, latest) => {
  sessionStorage.setItem(
    "Currencies",
    JSON.stringify(convertApiValues(currencies.data))
  );
  sessionStorage.setItem("Rates", JSON.stringify(latest.data.rates));
  sessionStorage.setItem("Timestamp", Date.now());
};
