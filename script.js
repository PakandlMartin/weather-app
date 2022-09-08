// Načtení elementů z html
const cityHeader = document.querySelector(".city");
const infoAboutCityParagraph = document.querySelector(".infoAboutCity");
const descriptionParagraph = document.querySelector(".description");
const infoFromApiDiv = document.querySelector(".infoFromApi");
const btnRefresh = document.querySelector(".btnRefresh");
const infoAboutTimeSpan = document.querySelector(".infoAboutTime");


// Získání dat z API
const weatherApiFetch = () => {
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/prague?unitGroup=metric&include=current&key=8ERDF7HDL9UWN3VXBYJSLN3VH&contentType=json",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((data) => {
      displayInfoaboutWeater(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

// renderování dat získaných z API
const displayInfoaboutWeater = (data) => {
  const current = data.currentConditions;
  cityHeader.textContent = "Praha";
  infoAboutCityParagraph.textContent = data.resolvedAddress;
  descriptionParagraph.textContent = current.conditions;
  infoFromApiDiv.innerHTML = `
  <p>Temperature: ${current.temp}°C</p>
  <p>Feels like: ${current.feelslike}°C</p>
  <p>Humidity: ${current.humidity}°C</p>
  <p>Pressure: ${current.pressure}hPa</p>
  <p>UV Index: ${current.uvindex}</p>
  `;
};

// Každých 5 minut updatuje informace na stránce
const waitAndUpdateApi = () => {
  let minutesAgo = 1;

  window.setInterval(() => {
    const date = new Date();

    if (date.getMinutes() % 5 === 0) {
      weatherApiFetch();
      minutesAgo = 0;
    }

    infoAboutTimeSpan.textContent = `Updated before ${minutesAgo} minutes`;
    minutesAgo++;
  }, 60000);
};


// reaguje na kliknutí tlačítka Refresh - znovu dojde k volání API, získání dat a jejich renderování
const refreshButtonEvent = () => {
  btnRefresh.addEventListener("click", () => {
weatherApiFetch()
  })
}

// Zastřešuje všechny funkcionality
const AppOn = () => {
  weatherApiFetch()
  waitAndUpdateApi()
  refreshButtonEvent()
};

AppOn();

