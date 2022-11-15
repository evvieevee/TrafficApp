let stations = [];
let stationsNames = [];

async function getData(url) {
    return await fetch(url).then(x => x.json())
}

async function onClickEvent(){
    console.log("hei, painoit minua")
   const text = document.getElementById("inputField").value
   console.log(text)
   const found = stations.find(x => x.stationName === text);
   console.log(found)
   const dateNow = new Date();
   const trains = await getData(`https://rata.digitraffic.fi/api/v1/routesets/station/${found.stationShortCode}/${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`);
   console.log(trains)
}


(async function init() {
    stations = await getData('https://rata.digitraffic.fi/api/v1/metadata/stations');
    stationsNames = stations.map(x => x.stationName)
    console.log(stationsNames)
})()