console.log('Hello from app! 👋');

console.log(document);

// Access properties
document.title = 'Hello from app! 👋';

// Access elements/tags inside the docuemnt
const myTitle = document.querySelector('h1.title');
console.log('myTitle', myTitle);

// Change html element properties
myTitle.innerHTML = 'Title changed through JS! 😮';

const myTextInput = document.getElementById('myTextInput');

// Run html elements methods (like adding an event listener)
myTextInput.addEventListener('keyup', (event) => {
  const inputValue = event.target.value;

  myTitle.innerHTML = inputValue;
});
