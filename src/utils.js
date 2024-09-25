export function add(numbers) {
  if (!numbers) {
    return 0; // Return 0 for an empty input
  }

  let delimiter = /,|\n/; // Default delimiters are comma and newline

  // Check for custom delimiter at the start of the string
  if (numbers.startsWith("//")) {
    const delimiterEndIndex = numbers.indexOf("\n");
    const customDelimiter = numbers.substring(2, delimiterEndIndex);
    delimiter = new RegExp(customDelimiter); // Create a regex from the custom delimiter
    numbers = numbers.substring(delimiterEndIndex + 1); // Remove the delimiter line from the input
  }

  // Split the numbers using the delimiter
  const nums = numbers.split(delimiter);
  const negativeNums = [];

  // Calculate the sum and check for negative numbers
  const sum = nums.reduce((acc, num) => {
    const parsedNum = parseInt(num, 10); // Convert string to integer
    if (parsedNum < 0) {
      negativeNums.push(parsedNum); // Collect negative numbers
    }
    return acc + (isNaN(parsedNum) ? 0 : parsedNum); // Ignore NaN
  }, 0);

  // Throw an error if there are negative numbers
  if (negativeNums.length) {
    throw new Error(`Negative numbers not allowed: ${negativeNums.join(", ")}`);
  }

  return sum; // Return the calculated sum
}
