// Problem:
// Write a node program that takes in an unlimited number of command line arguments
// and prints out the sum of them.
// If any argument is not a whole number, skip it.
// Do not support negative numbers though.

// console.log('Hi from terminal!');
// console.log(process.argv);

const inputValues = process.argv.slice(2);

let sum = 0;

for (const item of inputValues) {
  //   console.log(typeof Number(item));

  const converted = Number(item);

  if (Number.isInteger(converted) && converted > 0) {
    sum = sum + converted;
  }
}

console.log(sum);
