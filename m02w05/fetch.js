// COMMON WAYS TO WORK WITH PROMISES
// Using fetch webAPI built in tool (or axios external library)

// To fetch data from an API endpoint
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((response) => response.json())
  .then((data) => console.log(data.name))
  .catch((err) => console.log(err));

// To fetch text as an object from a local or external host
fetch('./loremipsum.txt')
  .then((response) => response.text())
  .then((text) => console.log(text))
  .catch((err) => console.log(err));

// To fetch images as objects from a local or external host
fetch('./babyshiba.jpg')
  .then((response) => response.blob())
  .then((image) => console.log(image))
  .catch((err) => console.log(err));

// Working with many promises at the same time
const myPromises = [
  fetch('https://pokeapi.co/api/v2/pokemon').then((res) => res.json()),
  fetch('https://rickandmortyapi.com/api/character').then((res) => res.json()),
  fetch('https://swapi.dev/api/people/').then((res) => res.json()),
];

// Promise all - gives all results in the same order they were passed
Promise.all(myPromises).then((data) => {
  console.log('Promise all:', data);
});

// Promise race - gives only one result from the first promise that resolves
Promise.race(myPromises).then((data) => {
  console.log('Promise race:', data);
});
