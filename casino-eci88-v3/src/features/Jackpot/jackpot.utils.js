const getRandomIncrement = (min, max) => {
  return Math.random() * (max - min) + min;
};

const formatNumberWithCommas = (number) => {
  const [wholePart, decimalPart] = number.toFixed(2).split(".");
  const formattedWholePart = addCommasToNumber(wholePart);
  const splitNumber = String(formattedWholePart).split(",");
  return {
    wholeNumber: `${formattedWholePart}.${decimalPart}`,
    first: splitNumber[0],
    second: splitNumber[1],
    third: splitNumber[2],
    decimal: decimalPart,
  };
};

const addCommasToNumber = (number) => {
  const reversed = number.split("").reverse();
  let result = [];
  for (let i = 0; i < reversed.length; i++) {
    if (i > 0 && i % 3 === 0) {
      result.push(",");
    }
    result.push(reversed[i]);
  }
  return result.reverse().join("");
};

export {getRandomIncrement, formatNumberWithCommas}