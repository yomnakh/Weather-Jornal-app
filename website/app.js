/* Global Variables */
const apiKey = '7ea2d8eef180336b3866fe5569aace2f'; // Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+ 1) + '.'+ d.getDate()+'.'+ d.getFullYear();

async function getWeather(zip) {
    const response = await fetch(`${baseUrl}?zip=${zip}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  }

  document.getElementById('generate').addEventListener('click', performAction);
function performAction() {
  const zip = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;
  getWeather(zip)
    .then((data) => {
      const newData = {
        temperature: data.main.temp,
        date: newDate,
        userResponse
      };
      return postData('/addWeatherData', newData);
    })
    .then(updateUI);
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateUI() {
    const request = await fetch('/getWeatherData');
    try {
      const allData = await request.json();
      document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}°C`;
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
    } catch (error) {
      console.error("Error:", error);
    }
  }