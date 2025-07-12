const weatherInfo = document.getElementById("weatherInfo"); 
const errorDiv = document.getElementById("errorDiv"); 
const input = document.getElementById("cities");
const forecastDiv = document.createElement("div");
forecastDiv.className = "forecast";
forecastDiv.id = "forecast";

 cityNames.forEach((city)=>{
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  input.appendChild(option);
})

function getIcon(desc) {
      console.log("hii")
      const lower = desc.toLowerCase();
      if (lower.includes("rain")) return "🌧️";
      if (lower.includes("clear")) return "☀️";
      if (lower.includes("cloud")) return "☁️";
      if (lower.includes("storm")) return "⛈️";
      if (lower.includes("snow")) return "❄️";
      return "🌡️";
    }

function getWeather() {
    const value = input.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=48b150323c0240c1eaf384d9100c5378&units=metric`)
        .then((res)=> res.json())
        .then((data)=>{
          console.log(data)
              weatherInfo.classList.remove("hidden");
              errorDiv.classList.add(  "hidden");
              
              const html = `
    <h2 class="city">${data.name}, ${data.sys.country}</h2>
    <p class="temp" id = "temp">🌡️ Temperature: <strong>${data.main.temp}°C</strong></p>
    <div class= "info-p"><h4> Today's Weather : </h4> <p class="weather">🌥️ Weather: ${data.weather[0].description}</p>
    <p class="humidity">💧 Humidity: ${data.main.humidity}%</p>
    <p class="wind">🌬️ Wind: ${data.wind.speed} m/s</p></div>
    <h3> Next Four Days Forecast </h3>
  `;
  weatherInfo.innerHTML = html;

        })
        .catch((error)=>{
          weatherInfo.classList.add("hidden");
          errorDiv.classList.remove("hidden");
       })

         

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=48b150323c0240c1eaf384d9100c5378&units=metric`)
  .then(res => res.json())
  .then(data => {
    const list = data.list;
    const dailyMap = new Map();
    forecastDiv.innerHTML = "";

    // Loop through forecast and store one entry per day
    list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyMap.has(date) && item.dt_txt.includes("12:00:00")) {
        dailyMap.set(date, item);
      }
    });
    let count = 0;
    // Log the next 5 days (or fewer)
    dailyMap.forEach((entry, date) => {
          if (count === 0) {
    count++; // skip the first
    return;
  }

            const card = document.createElement("div");
      card.className = "forecast-card"; // Add a custom class if needed

      const dateEl = document.createElement("h4");
      dateEl.className = "city";
      dateEl.textContent = `📅 ${date}`;

      const icon = getIcon(entry.weather[0].description);
      const iconEl = document.createElement("p");
      iconEl.className = "icon";
      iconEl.textContent = `${icon}`;

      const temp = document.createElement("p");
      temp.className = "card-temp";
      temp.innerHTML = `🌡️ Temp:<br /> ${entry.main.temp}°C`;

      const weather = document.createElement("p");
      weather.className = "card-p";
      weather.innerHTML = `☁️ Weather:<br /> ${entry.weather[0].description}`;

      card.appendChild(dateEl);
      card.appendChild(iconEl)
      card.appendChild(temp);
      card.appendChild(weather);

      forecastDiv.appendChild(card);

      weatherInfo.appendChild(forecastDiv)
      console.log(`📅 ${date}`);
      console.log(`🌡️ Temp: ${entry.main.temp}°C`);
      console.log(`☁️ Weather: ${entry.weather[0].description}`);
      console.log("----------------------");
    });
  })
  .catch(err => {
    forecastDiv.innerHTML = "<p>Error loading forecast. Please check city or try again.</p>";
 } );
}    




