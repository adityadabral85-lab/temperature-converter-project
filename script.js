const form = document.querySelector("#converter-form");
const temperatureInput = document.querySelector("#temperature");
const fromUnitSelect = document.querySelector("#from-unit");
const toUnitSelect = document.querySelector("#to-unit");
const resultElement = document.querySelector("#result");

const unitLabels = {
  celsius: "C",
  fahrenheit: "F",
  kelvin: "K",
};

function convertToCelsius(value, fromUnit) {
  if (fromUnit === "fahrenheit") {
    return (value - 32) * (5 / 9);
  }

  if (fromUnit === "kelvin") {
    return value - 273.15;
  }

  return value;
}

function convertFromCelsius(value, toUnit) {
  if (toUnit === "fahrenheit") {
    return value * (9 / 5) + 32;
  }

  if (toUnit === "kelvin") {
    return value + 273.15;
  }

  return value;
}

function formatNumber(value) {
  return Number(value.toFixed(2)).toString();
}

function showError(message) {
  resultElement.textContent = message;
  resultElement.classList.add("error");
}

function showResult(value, unit) {
  resultElement.textContent = `${formatNumber(value)} °${unitLabels[unit]}`;
  resultElement.classList.remove("error");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const temperature = Number(temperatureInput.value);
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;

  if (!Number.isFinite(temperature)) {
    showError("Please enter a valid number.");
    return;
  }

  if (fromUnit === "kelvin" && temperature < 0) {
    showError("Kelvin cannot be below 0.");
    return;
  }

  const celsiusValue = convertToCelsius(temperature, fromUnit);
  const convertedValue = convertFromCelsius(celsiusValue, toUnit);

  if (toUnit === "kelvin" && convertedValue < 0) {
    showError("The converted Kelvin value is below 0.");
    return;
  }

  showResult(convertedValue, toUnit);
});
