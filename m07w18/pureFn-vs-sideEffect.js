// PURE FUNCTION
// Fn that affects only elements within its scope

const myNum = 100;

const addTwoHundred = (num) => {
  return num + 200;
};
const result = addTwoHundred(myNum);
console.log(result);

// SIDE EFFECTS
// Fn that affects elements outside of its scope

const sayHello = () => {
  console.log('Hello!');
};

sayHello();

//---

const myFerrari = {
  color: 'red',
};

const changeColor = () => {
  myFerrari.color = 'blue';
};

changeColor();
console.log(myFerrari);
