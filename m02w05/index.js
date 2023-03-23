const getRandomNumberPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber < 50) {
        reject(new Error('random number less than 50!'));
      } else {
        resolve(randomNumber);
      }
    }, 2000);
  });
};

getRandomNumberPromise()
  .then((randomNumber) => randomNumber * 2)
  .then((randomNumberTimes2) => randomNumberTimes2 + 100)
  .then((randomNumberTimes2Plus100) => console.log(randomNumberTimes2Plus100))
  .catch((err) => console.log(err));
