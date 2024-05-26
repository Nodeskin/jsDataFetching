'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// AJAX CALL METHOD

const renderCountry = function (data, className = ' ') {
  const html = `<article class="country ${className}">
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeigbour = country => {
//   //AJAX call country1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     //Render Country 1
//     renderCountry(data);

//     //Get Neighbor country 2
//     const neighbour = data.borders;
//     console.log(neighbour);
//     for (let i = 0; i < neighbour.length; i++) {
//       if (!neighbour) return;

//       //AJAX Call country2
//       const request2 = new XMLHttpRequest();
//       request2.open(
//         'GET',
//         `https://restcountries.com/v2/alpha/${neighbour[i]}`
//       );
//       request2.send();

//       request2.addEventListener('load', function () {
//         const data2 = JSON.parse(this.responseText);
//         console.log(data2);
//         renderCountry(data2, 'neighbour');

//         //Get Neighbour 3
//         const neighbour2 = data2.borders;

//         for (let j = 0; j < neighbour2.length; j++) {
//           const request3 = new XMLHttpRequest();
//           request3.open(
//             'GET',
//             `https://restcountries.com/v2/alpha/${neighbour2[j]}`
//           );
//           request3.send();

//           request3.addEventListener('load', function () {
//             const data3 = JSON.parse(this.responseText);
//             console.log(data3.borders);
//             // renderCountry(data3, 'neighbour');
//           });
//         }
//       });
//     }
//   });
// };
// getCountryAndNeigbour('Germany');

// FETCH API (PROMISES)
// A promise is an object used as a placeholder for the future result of an asynchronous operation
// or like a container for a future value.
//The fetch API helps build the promise and returns it to be consumed
// const request = new XMLHttpRequest();
//  request.open('GET', `https://restcountries.com/v2/name/${country}`);
//  request.send();

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(([data]) => {
      renderCountry(data);

      const neighbour = data.borders;
      console.log(neighbour);
      for (let i = 0; i < neighbour.length; i++) {
        if (!neighbour) return;
        fetch(`https://restcountries.com/v2/name/${neighbour[i]}`)
          .then(response2 => response2.json())
          .then(([data2]) => renderCountry(data2)
        
        );
      }
    });
};

getCountryData('germany');
