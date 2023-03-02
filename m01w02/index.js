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

runMyFunction(function () {
  addTwo(10);
});

runMyFunction(() => addTwo(10));

const fruits = ['apple', 'orange', 'kiwi'];
for (const fruit of fruits) {
  console.log(fruit);
}

const logEach = function (arr) {
  for (const item of arr) {
    console.log(item);
  }
};

logEach(fruits);

const numbers = [1, 2, 3];
logEach(numbers);

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
