var cityInput = document.querySelector('#city-name');
var cityContainerEl = document.querySelector('#cities-container');


var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInput.value.trim();
  
  if (city) {
    displayCities(city);

    cityContainerEl.textContent = '';
    cityInput.value = '';
  } else {
    alert('Enter city');
  }
};


var getCityWeather = function (city) {
  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={733b95829a33c6d5f7357c456d173759}' + city ;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCities(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to weather dashboard');
    });
};

var displayCities = function (cities, searchTerm) {
  if (cities.length === 0) {
    cityContainerEl.textContent = 'No cities found.';
    return;
  };

cityContainerEl.addEventListener('submit', formSubmitHandler);

};
