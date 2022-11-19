// Tässä määritellään variablet(muuttujat) nimeltä asemat ja aseman nimet.
let stations = [];
let stationsNames = [];
//Tässä tapahtuu AJAX kutsu, jossa pyydetään dataa urlin takaa päivittämättä sivua. 
function createAjax(url) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState === 4) {
                resolve(JSON.parse(xhttp.responseText))
            }
        }
        xhttp.open('GET', url, true);
        xhttp.send();
    })
}

async function getData(url) {
    //return await fetch(url).then(x => x.json())
    // Tässä tarkistetaan mahdolliset errorit. 
    return await createAjax(url).catch(error => console.error(error));
}
// Tässä kohtaa etsitään aikatauluista haluttu aseman saapumis- ja lähtöajat.
function findTimeStamps(timeStamps, stationShortCode) {
    return timeStamps.filter(x => x.stationShortCode === stationShortCode);
}
// Tässä haetaan junien aikataululista. Listassa on saapumis- ja lähtöajat. 
//  Lista tulostaa päivämäärän, sekä tunnit ja minuutit. Sekunnit on otettu pois.
// ja lisätään käyttäjälle ne näkyviin.
function getTrainTime(listaJunia, stationShortCode) {
    const listElement = document.getElementById('list');
    listElement.innerHTML = "";
    listaJunia.forEach(juna => {
        const li = document.createElement("li");
        li.textContent = juna.trainNumber;
        const times = findTimeStamps(juna.timeTableRows, stationShortCode);
        const divArrival = document.createElement("div");
        divArrival.textContent = "Saapumisaika: " + new Date(times.find(x => x.type === "ARRIVAL").scheduledTime).toLocaleString("en-FI").slice(0, -3);
        divArrival.className="Saapumisaika";
        li.appendChild(divArrival);
        const divDeparture = document.createElement("div");
        divDeparture.textContent = "Lähtöaika: " + new Date(times.find(x => x.type === "DEPARTURE").scheduledTime).toLocaleString("en-FI").slice(0, -3);
        divDeparture.className="Lähtöaika"
        li.appendChild(divDeparture);
        listElement.appendChild(li);
    });
}
// Tässä haetaan junat inputfieldiin syötetyn aseman mukaisesti. Eli junat, jotka pysähtyvät kyseisellä asemalla.
async function onClickEvent(){
   const text = document.getElementById("inputField").value
   document.getElementById("asemanNimi").textContent = text;
   const found = stations.find(x => x.stationName.toLowerCase() === text.toLowerCase());
   const trains = await getData(`https://rata.digitraffic.fi/api/v1/live-trains/station/${found.stationShortCode}`);

   getTrainTime(trains, found.stationShortCode)
}

// Tässä haetaan junapysäkkien nimilista heti kun käyttäjä siirtyy sivulle.
(async function init() {
    stations = await getData('https://rata.digitraffic.fi/api/v1/metadata/stations');
    stationsNames = stations.map(x => x.stationName);
    autocomplete(document.getElementById("inputField"), stationsNames)
})()

