import {
  convertExchange,
  convertValue,
  getCurrencyValueInUsd
} from "./Helpers";

const mockCurrency = {
  CZK: 20,
  USD: 1,
  EUR: 0.8,
  COP: 642
};

describe("#Helpers", () => {
  it("Convert values in USD to target currency", () => {
    expect(convertValue(mockCurrency, 2, "CZK")).toBe(40);
    expect(convertValue(mockCurrency, 3, "EUR").toFixed(1)).toBe("2.4");
  });

  it("Convert base currency to USD", () => {
    expect(getCurrencyValueInUsd(mockCurrency, "COP", 321).toFixed(1)).toBe(
      "0.5"
    );
    expect(getCurrencyValueInUsd(mockCurrency, "CZK", 80)).toBe(4);
  });

  it("Convert function (USD) -> (NON-USD)", () => {
    expect(
      convertExchange(mockCurrency, 10, { value: "CZK" }, { value: "USD" })
    ).toBe(200);

    expect(
      convertExchange(mockCurrency, 200, { value: "USD" }, { value: "CZK" })
    ).toBe(10);
  });

  it("Convert function (NON USD) -> (NON USD)", () => {
    expect(
      convertExchange(mockCurrency, 10, { value: "EUR" }, { value: "CZK" })
    ).toBe(0.4);
  });
});
