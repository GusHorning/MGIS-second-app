// script.js

// DATA: Contains units, ratios relative to metric base, and system designations
function getConversionData() {
  return {
    length: {
      metricBase: 'm',
      units: {
        mm: { name: 'Millimeters (mm)', ratio: 0.001, system: 'metric' },
        cm: { name: 'Centimeters (cm)', ratio: 0.01, system: 'metric' },
        m: { name: 'Meters (m)', ratio: 1, system: 'metric' },
        km: { name: 'Kilometers (km)', ratio: 1000, system: 'metric' },
        in: { name: 'Inches (in)', ratio: 0.0254, system: 'imperial' },
        ft: { name: 'Feet (ft)', ratio: 0.3048, system: 'imperial' },
        yd: { name: 'Yards (yd)', ratio: 0.9144, system: 'imperial' },
        mi: { name: 'Miles (mi)', ratio: 1609.344, system: 'imperial' }
      }
    },
    mass: {
      metricBase: 'g',
      units: {
        mg: { name: 'Milligrams (mg)', ratio: 0.001, system: 'metric' },
        g: { name: 'Grams (g)', ratio: 1, system: 'metric' },
        kg: { name: 'Kilograms (kg)', ratio: 1000, system: 'metric' },
        oz: { name: 'Ounces (oz)', ratio: 28.349523125, system: 'imperial' },
        lb: { name: 'Pounds (lb)', ratio: 453.59237, system: 'imperial' },
        st: { name: 'Stone (st)', ratio: 6350.29318, system: 'imperial' }
      }
    },
    volume: {
      metricBase: 'ml',
      units: {
        ml: { name: 'Milliliters (ml)', ratio: 1, system: 'metric' },
        l: { name: 'Liters (l)', ratio: 1000, system: 'metric' },
        tsp: { name: 'Teaspoons (US tsp)', ratio: 4.92892, system: 'imperial' },
        tbsp: { name: 'Tablespoons (US tbsp)', ratio: 14.7868, system: 'imperial' },
        fl_oz: { name: 'Fluid Ounces (US fl oz)', ratio: 29.5735, system: 'imperial' },
        cup: { name: 'Cups (US cup)', ratio: 240, system: 'imperial' },
        pt: { name: 'Pints (US pt)', ratio: 473.176, system: 'imperial' },
        qt: { name: 'Quarts (US qt)', ratio: 946.353, system: 'imperial' },
        gal: { name: 'Gallons (US gal)', ratio: 3785.41, system: 'imperial' }
      }
    },
    temperature: {
      type: 'temperature',
      units: {
        c: { name: 'Celsius (°C)', system: 'metric' },
        f: { name: 'Fahrenheit (°F)', system: 'imperial' }
      }
    }
  };
}

// LOGIC: Performs unit conversion computations between metric and imperial systems
function calculateConversion(categoryKey, fromUnitKey, toUnitKey, value) {
  const data = getConversionData();
  const category = data[categoryKey];
  
  if (value === '' || isNaN(value)) {
    return { result: '', formula: '' };
  }

  const numValue = parseFloat(value);

  if (category.type === 'temperature') {
    if (fromUnitKey === 'c' && toUnitKey === 'f') {
      const res = (numValue * 9 / 5) + 32;
      return { result: res, formula: `(${numValue} °C × 9/5) + 32 = ${res.toFixed(2)} °F` };
    } else if (fromUnitKey === 'f' && toUnitKey === 'c') {
      const res = (numValue - 32) * 5 / 9;
      return { result: res, formula: `(${numValue} °F - 32) × 5/9 = ${res.toFixed(2)} °C` };
    }
    return { result: numValue, formula: `${numValue} = ${numValue}` };
  }

  const fromUnit = category.units[fromUnitKey];
  const toUnit = category.units[toUnitKey];

  const valueInBase = numValue * fromUnit.ratio;
  const convertedValue = valueInBase / toUnit.ratio;

  return {
    result: convertedValue,
    formula: `1 ${fromUnitKey} = ${(fromUnit.ratio / toUnit.ratio).toFixed(6)} ${toUnitKey}`
  };
}

// DISPLAY: Manages DOM elements, event listeners, user interaction, and updates the UI
function initializeDisplay() {
  const data = getConversionData();
  
  const categorySelect = document.getElementById('category-select');
  const directionBtn = document.getElementById('direction-btn');
  const directionLabel = document.getElementById('direction-label');
  const fromUnitSelect = document.getElementById('from-unit-select');
  const toUnitSelect = document.getElementById('to-unit-select');
  const valueInput = document.getElementById('value-input');
  const resultDisplay = document.getElementById('result-display');
  const formulaDisplay = document.getElementById('formula-display');

  let currentDirection = 'metricToImperial';

  Object.keys(data).forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });

  function populateUnits() {
    const categoryKey = categorySelect.value;
    const category = data[categoryKey];
    
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    const sourceSystem = currentDirection === 'metricToImperial' ? 'metric' : 'imperial';
    const targetSystem = currentDirection === 'metricToImperial' ? 'imperial' : 'metric';

    Object.keys(category.units).forEach(unitKey => {
      const unit = category.units[unitKey];
      if (unit.system === sourceSystem) {
        const option = document.createElement('option');
        option.value = unitKey;
        option.textContent = unit.name;
        fromUnitSelect.appendChild(option);
      }
      if (unit.system === targetSystem) {
        const option = document.createElement('option');
        option.value = unitKey;
        option.textContent = unit.name;
        toUnitSelect.appendChild(option);
      }
    });

    updateResult();
  }

  function updateResult() {
    const categoryKey = categorySelect.value;
    const fromUnitKey = fromUnitSelect.value;
    const toUnitKey = toUnitSelect.value;
    const value = valueInput.value;

    if (!fromUnitKey || !toUnitKey) {
      resultDisplay.textContent = '-';
      formulaDisplay.textContent = '';
      return;
    }

    const { result, formula } = calculateConversion(categoryKey, fromUnitKey, toUnitKey, value);

    if (result === '') {
      resultDisplay.textContent = '-';
      formulaDisplay.textContent = '';
    } else {
      const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
      resultDisplay.textContent = `${formattedResult} ${toUnitKey}`;
      formulaDisplay.textContent = formula;
    }
  }

  directionBtn.addEventListener('click', () => {
    if (currentDirection === 'metricToImperial') {
      currentDirection = 'imperialToMetric';
      directionLabel.textContent = 'Imperial → Metric';
    } else {
      currentDirection = 'metricToImperial';
      directionLabel.textContent = 'Metric → Imperial';
    }
    populateUnits();
  });

  categorySelect.addEventListener('change', populateUnits);
  fromUnitSelect.addEventListener('change', updateResult);
  toUnitSelect.addEventListener('change', updateResult);
  valueInput.addEventListener('input', updateResult);

  document.body.addEventListener('click', () => {
    const iframe = document.getElementById('bg-video');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  }, { once: true });

  populateUnits();
}

document.addEventListener('DOMContentLoaded', initializeDisplay);
