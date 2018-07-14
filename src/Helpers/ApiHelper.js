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

const getCurrencyValueInUsd = (latest, currency, amount) => {
  return (amount / latest[currency]).toFixed(20);
};

const convertValue = (latest, base, target) => {
  return base * latest[target];
};

export const convertExchange = (
  latest,
  amount,
  destinationCurrency,
  baseCurrency
) => {
  const baseInUsd = getCurrencyValueInUsd(latest, baseCurrency.value, amount);
  return convertValue(latest, baseInUsd, destinationCurrency.value);
};

export const setDataToSessionStorage = (currencies, latest) => {
  sessionStorage.setItem(
    "Currencies",
    JSON.stringify({
      data: convertApiValues(currencies.data)
    })
  );
  sessionStorage.setItem(
    "Rates",
    JSON.stringify({
      data: latest.data.rates
    })
  );
  sessionStorage.setItem("Timestamp", {
    timestamp: Date.now()
  });
};
