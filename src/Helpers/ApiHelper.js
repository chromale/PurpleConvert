import axios from "axios";

export const callApi = (method, url, payload) => {
  const server = "https://openexchangerates.org/api/";
  const apiKey = "65964a5ce1734f43b72497c695f51979";

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
