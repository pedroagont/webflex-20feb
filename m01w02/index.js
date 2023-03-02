// Functions as values
const name = 'Pedro';
const age = 29;
const santasWishlist = ['nintendo', 'bike'];
const car = {
  name: 'Ferrari',
  color: 'blue',
};

const sayHi = function () {
  console.log('Hi 👋');
};

// function calling vs function passing
const otherThing = sayHi;

otherThing();

const runMyFunction = function (myFn) {
  console.log('Running the function!');
  myFn();
};

const sayHello = function () {
  console.log('Hello!');
};

const addTwo = function (num) {
  console.log(num + 2);
};

runMyFunction(sayHello);

// functions that receive arguments as callbacks
runMyFunction(function () {
  addTwo(10);
});

// arrow functions
runMyFunction(() => addTwo(10));

// Higher order functions and callbacks
const welcomeUserHigherOrderFn = (username, cb) => cb(username);

const profileCompleteCb = function (username) {
  console.log(`Welcome ${username}, your profile is complete!`);
};

const profileMissingDataCb = function (username) {
  console.log(`Welcome ${username}, your profile is missing data!`);
};

welcomeUserHigherOrderFn('Aziz', profileCompleteCb);
welcomeUserHigherOrderFn('Nicol', profileMissingDataCb);

const mathResult = (num1, num2, operation) => operation(num1, num2);

const mySum = mathResult(2, 2, (num1, num2) => num1 + num2);
console.log(mySum);

const mySub = mathResult(2, 2, (num1, num2) => num1 - num2);
console.log(mySub);

const myMult = mathResult(2, 2, (num1, num2) => num1 * num2);
console.log(myMult);

const myDiv = mathResult(2, 2, (num1, num2) => num1 / num2);
console.log(myDiv);

// implementing callbacks for arrays iteration
const fruits = ['apple', 'orange', 'kiwi'];
for (const fruit of fruits) {
  console.log(fruit);
}

// logEach
const logEach = function (arr) {
  for (const item of arr) {
    console.log(item);
  }
};

logEach(fruits);

const numbers = [1, 2, 3];
logEach(numbers);

// forEach
const forEach = function (arr, action) {
  for (const item of arr) {
    action(item);
  }
};

forEach(fruits, function (fruit) {
  console.log(`happy ${fruit}`);
});

forEach(numbers, function (num) {
  console.log(num + 2);
});

// map
const map = (arr, cb) => {
  const result = [];

  for (const item of arr) {
    result.push(cb(item));
  }

  return result;
};

const original = [1, 2, 3, 4];
const mappedPlus2 = map(original, (num) => num + 100);
const mappedTimes2 = map(original, (num) => num * 2);
console.log(original);
console.log(mappedPlus2);
console.log(mappedTimes2);

const happyFruits = map(fruits, (f) => 'happy ' + f);
console.log(happyFruits);

logEach(happyFruits);

// filter
const filter = (arr, cb) => {
  const result = [];

  for (const item of arr) {
    if (cb(item)) {
      result.push(item);
    }
  }

  return result;
};

const ages = [32, 33, 16, 40, 12];

const adults = filter(ages, (age) => age >= 18);
console.log(adults);

const teens = filter(ages, (age) => age < 18);
console.log(teens);
