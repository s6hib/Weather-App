const mainContainer = document.querySelector('.main-container');
const searchButton = document.querySelector('.location-search button');
const searchInput = document.querySelector('.location-search input');
const weatherSection = document.querySelector('.weather-info');
const detailsSection = document.querySelector('.additional-details');
const errorMessage = document.querySelector('.error-message');

searchButton.addEventListener('click', fetchWeatherData);
searchInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    fetchWeatherData();
  }
});

function fetchWeatherData() {
  const apiKey = 'a560d68b714427b11d781e88be6edb20';
  const locationName = document.querySelector('.location-search input').value;

  if (locationName === '')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        mainContainer.style.height = '400px';
        weatherSection.style.display = 'none';
        detailsSection.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.classList.add('fadeIn');
        return;
      }

      errorMessage.style.display = 'none';
      errorMessage.classList.remove('fadeIn');

      const temperatureValue = document.querySelector('.weather-info .temp');
      const weatherDescription = document.querySelector('.weather-info .weather-desc');
      const humidityValue = document.querySelector('.additional-details .humidity-info span');
      const pressureValue = document.querySelector('.additional-details .pressure-info span');
      const sunriseTime = document.querySelector('.additional-details .sunrise-info span');
      const sunsetTime = document.querySelector('.additional-details .sunset-info span');

      temperatureValue.innerHTML = `${parseInt(data.main.temp)}<span>°F</span>`;
      weatherDescription.innerHTML = `${data.weather[0].description}`;
      humidityValue.innerHTML = `${data.main.humidity}%`;
      pressureValue.innerHTML = `${data.main.pressure} hPa`;

      const sunriseDate = new Date(data.sys.sunrise * 1000);
      const sunsetDate = new Date(data.sys.sunset * 1000);
      sunriseTime.innerHTML = formatTime(sunriseDate);
      sunsetTime.innerHTML = formatTime(sunsetDate);

      weatherSection.style.display = '';
      detailsSection.style.display = '';
      weatherSection.classList.add('fadeIn');
      detailsSection.classList.add('fadeIn');
      mainContainer.style.height = '550px';
    });
}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'p.m.' : 'a.m.';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
