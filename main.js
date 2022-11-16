let stations = [];
let stationsNames = [];

async function getData(url) {
    return await fetch(url).then(x => x.json())
}

function findTimeStamps(timeStamps, stationShortCode) {
    const times = timeStamps.filter(x => x.stationShortCode === stationShortCode);
    console.log(times);
    return times;
}

function getTrainTime(listaJunia, stationShortCode) {
    const listElement = document.getElementById('list');
    listaJunia.forEach(juna => {
        const li = document.createElement("li");
        li.textContent = juna.trainNumber;
        const times = findTimeStamps(juna.timeTableRows, stationShortCode);
        const divArrival = document.createElement("div");
        divArrival.textContent = "Saapumisaika: " + times.find(x => x.type === "ARRIVAL").scheduledTime;
        divArrival.className="Saapumisaika";
        li.appendChild(divArrival);
        const divDeparture = document.createElement("div");
        divDeparture.textContent = "Lähtöaika: " + times.find(x => x.type === "DEPARTURE").scheduledTime;
        divDeparture.className="Lähtöaika"
        li.appendChild(divDeparture);
        listElement.appendChild(li);
    });
}

async function onClickEvent(){
   const text = document.getElementById("inputField").value
   const found = stations.find(x => x.stationName === text);
   const dateNow = new Date();
   const trains = await getData(`https://rata.digitraffic.fi/api/v1/live-trains/station/${found.stationShortCode}`);

   //const trains = await getData(`https://rata.digitraffic.fi/api/v1/routesets/station/${found.stationShortCode}/${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`);
   console.log(trains)
   getTrainTime(trains, found.stationShortCode)

}


(async function init() {
    stations = await getData('https://rata.digitraffic.fi/api/v1/metadata/stations');
    stationsNames = stations.map(x => x.stationName)
    console.log(stations)
})()

