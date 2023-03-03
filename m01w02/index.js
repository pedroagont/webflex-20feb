// Primitive values
const name = 'Pedro';
const age = 29;
const isAlive = true;

// Mutable values
const santasWishlist = ['xbox', 'bike'];
santasWishlist[0] = 'nintendo';
santasWishlist.push('');

const car = {
  name: 'Ferrari',
  color: 'red',
};
car.color = 'blue';
car.engine = 'V8';

// Functions as values
const sayHi = function () {
  console.log('Hi 👋');
};

// function passing
const otherThing = sayHi;

// function calling
otherThing();

// functions that receive other functions as arguments
const runMyFunction = function (myFn) {
  console.log('Running the function!');
  myFn();
};

// we call those arguments CALLBACKS!
const sayHello = function () {
  console.log('Hello!');
};

const addTwo = function (num) {
  console.log(num + 2);
};

// passing a callback function without arguments
runMyFunction(sayHello);

// passing a callback function with arguments
// we need another  wrapper anonymous function
runMyFunction(function () {
  addTwo(10);
});

// better using arrow syntax!
runMyFunction(() => addTwo(10));

// Higher order functions and callbacks
// Example with side effects (logging)
const welcomeUserHigherOrderFn = (username, cb) => cb(username);

const profileCompleteCb = function (username) {
  console.log(`Welcome ${username}, your profile is complete!`);
};

const profileMissingDataCb = function (username) {
  console.log(`Welcome ${username}, your profile is missing data!`);
};

welcomeUserHigherOrderFn('Aziz', profileCompleteCb);
welcomeUserHigherOrderFn('Nicol', profileMissingDataCb);

// Example with returned values
const mathResult = (num1, num2, operation) => operation(num1, num2);

const mySum = mathResult(5, 2, (num1, num2) => num1 + num2);
console.log(mySum);

const mySub = mathResult(5, 2, (num1, num2) => num1 - num2);
console.log(mySub);

const myMult = mathResult(5, 2, (num1, num2) => num1 * num2);
console.log(myMult);

const myDiv = mathResult(5, 2, (num1, num2) => num1 / num2);
console.log(myDiv);

// implementing callbacks for arrays iteration
// regular iteration
const fruits = ['apple', 'orange', 'kiwi'];
for (const fruit of fruits) {
  console.log(fruit);
}

// creating a logEach function to log each item
const logEach = function (arr) {
  for (const item of arr) {
    console.log(item);
  }
};

logEach(fruits);

const numbers = [1, 2, 3];
logEach(numbers);

// FOREACH
// to invoke an action on each item
const forEach = function (arr, action) {
  for (const item of arr) {
    action(item);
  }
};

// invoking forEach with callback as an inline anonymous function
forEach(fruits, function (fruit) {
  console.log(`happy ${fruit}`);
});

forEach(numbers, function (num) {
  console.log(num + 2);
});

// better with arrow syntax!
forEach(fruits, (fruit) => console.log(`happy ${fruit}`));
forEach(numbers, (num) => console.log(num + 2));

// MAP
// to invoke a callback on each item an return an array with its resulting values
const map = (arr, cb) => {
  const result = [];

  for (const item of arr) {
    result.push(cb(item));
  }

  return result;
};

const original = [1, 2, 3, 4];
const mappedPlus100 = map(original, (num) => num + 100);
const mappedTimes2 = map(original, (num) => num * 2);
console.log(original);
console.log(mappedPlus100);
console.log(mappedTimes2);

const happyFruits = map(fruits, (f) => 'happy ' + f);
console.log(happyFruits);

// FILTER
// to invoke a callback on each item and if its resulting value its truthy it will be added to a returning array
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
