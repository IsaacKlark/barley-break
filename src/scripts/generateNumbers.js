export let originalNumbers = [];
export let length = 5;

const generateNumbers = (newLength = 3) => {
  originalNumbers = [];
  length = newLength;

  for (let i = 0; i < length ** 2; i++) {
    originalNumbers.push(i + 1);
  }
  
  originalNumbers[originalNumbers.length - 1] = "";
  
  let numbers = [...originalNumbers];

  for (let i = 0; i < length ** 2; i++) {
    const random = Math.floor(Math.random() * (length ** 2));
    const currentNumber = numbers[random];
    numbers.splice(random, 1);
    numbers.push(currentNumber);
  }

  let workingNumbers = [];
  let row = [];

  for (let i = 0; i < length ** 2; i++) {
    row.push(numbers[i]);

    if (row.length === length) {
      workingNumbers.push({
        row,
        id: "row" + i
      });
      row = [];
    }
  }

  return workingNumbers;
}

export default generateNumbers;