$(document).ready(() => {
  console.log('Hello from jquery app file!');

  //   document.querySelector('h1.title').innerHTML = 'New title changed!';
  $('h1.title').text('New title changed!');

  $('#myTextInput').on('keyup', (e) => {
    // const inputValue = e.target.value;
    const inputValue = $(e.target).val();

    $('h1.title').text(inputValue);
  });

  $('#image-container button').on('click', (e) => {
    const myImage = $(e.target).siblings('img');

    myImage.attr(
      'src',
      'https://www.gannett-cdn.com/presto/2021/09/24/PARN/9b276516-549f-47ba-9f07-d641e69c1e15-critters.jpg'
    );
  });
});
