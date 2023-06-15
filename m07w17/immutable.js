const redFerrari = {
  name: 'ferrari',
  color: 'red',
};

console.log(redFerrari);

// bad
// const blueFerrari = redFerrari;

// good
const blueFerrari = { ...redFerrari };

blueFerrari.color = 'blue';

console.log(blueFerrari);
console.log(redFerrari);
