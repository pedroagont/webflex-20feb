// Problem:
// Write a node program that takes in an unlimited number of command line arguments
// and prints out the sum of them.
// If any argument is not a whole number, skip it.
// Do not support negative numbers though.

const inputValues = process.argv.slice(2);

let total = 0;

for (const item of inputValues) {
  const converted = Number(item);
  if (Number.isInteger(converted) && converted > 0) {
    total += converted;
  }
}

console.log(total);
