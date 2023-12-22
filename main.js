const milan = {
    latitude: 45.4654219,
    longitude: 9.1859243,

}

const bologna = {
    latitude: 44.494887,
    longitude: 11.3426163,
}

const rome = {
    latitude: 41.9027835,
    longitude: 12.4963655,

}


const naples = {
    latitude: 40.8517746,
    longitude: 14.2681244,
}


const vsg = {
    latitude: 38.216746,
    longitude: 15.636238
}


let startCoords = {
    latitude: 0,
    longitude: 0
}



let arrivalCoords = {
    latitude: 0,
    longitude: 0
}


const price_multiplier = 0.21;
let button = document.getElementById("button")
let starting_station = document.getElementById("starting-station")
let arrival_station = document.getElementById("arriving-station")
let date_selector = document.getElementById("name")
let dep_time = document.getElementById("departure-time")
let dep_day = document.getElementById("date")
let distance_info = document.getElementById("distance_travelled")
let passengers_info = document.getElementById("passengers_number")
let hours_info = document.getElementById("hours")
let price_info = document.getElementById("ticket_price")
let plus_button = document.getElementById("plus")
let minus_button = document.getElementById("minus")
let plus_elder_button = document.getElementById("elder_plus")
let minus_elder_button = document.getElementById("elder_minus")
let passenger_number = 1;
let elder_number = 0;
let passengers_number_selection = document.getElementById("passenger_number")
let elders_number_selection = document.getElementById("elder_number")
let availableTimes = []
let currentDate = new Date()
let todayDate = currentDate.getDate()
let todayMonth = currentDate.getMonth()
let todayYear = currentDate.getFullYear()
let currentFullDate = `${todayYear}-${todayMonth + 1}-${todayDate}`;
let currentFullDateNextYear = `${todayYear + 1}-${todayMonth + 1}-${todayDate}`;
dep_day.setAttribute("min", currentFullDate)
dep_day.setAttribute("max", currentFullDateNextYear)


function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}


plus_button.addEventListener("click", () => {
    if (passenger_number + elder_number < 10) {
        passenger_number++;
        passengers_number_selection.value = passenger_number
    }

    else {
        alert("il numero massimo di biglietti acquistabilli è 10")
    }

})

minus_button.addEventListener("click", () => {
    if (passenger_number > 0) {
        passenger_number--;
        passengers_number_selection.value = passenger_number
    }
})

plus_elder_button.addEventListener("click", () => {
    if (passenger_number + elder_number < 10) {
        elder_number++;
        elders_number_selection.value = elder_number
    }

    else {
        alert("il numero massimo di biglietti acquistabilli è 10")
    }

})

minus_elder_button.addEventListener("click", () => {
    if (elder_number > 0) {
        elder_number--;
        elders_number_selection.value = elder_number
    }
})

button.addEventListener("click", () => {

    if (starting_station.value == "Napoli") {
        startCoords.latitude = naples.latitude
        startCoords.longitude = naples.longitude
    }

    else if (starting_station.value == "Torino") {
        startCoords.latitude = bologna.latitude
        startCoords.longitude = bologna.longitude
    }

    else if (starting_station.value == "Roma") {
        startCoords.latitude = rome.latitude
        startCoords.longitude = rome.longitude
    }

    else if (starting_station.value == "Milano") {
        startCoords.latitude = milan.latitude
        startCoords.longitude = milan.longitude
    }

    else if (starting_station.value == "Villa S.Giovanni") {
        startCoords.latitude = vsg.latitude
        startCoords.longitude = vsg.longitude
    }

    if (arrival_station.value == "Napoli") {
        arrivalCoords.latitude = naples.latitude
        arrivalCoords.longitude = naples.longitude
    }

    else if (arrival_station.value == "Torino") {
        arrivalCoords.latitude = bologna.latitude
        arrivalCoords.longitude = bologna.longitude
    }
    else if (arrival_station.value == "Roma") {
        arrivalCoords.latitude = rome.latitude
        arrivalCoords.longitude = rome.longitude
    }

    else if (arrival_station.value == "Milano") {
        arrivalCoords.latitude = milan.latitude
        arrivalCoords.longitude = milan.longitude
    }

    else if (arrival_station.value == "Villa S.Giovanni") {
        arrivalCoords.latitude = vsg.latitude
        arrivalCoords.longitude = vsg.longitude
    }

    if (arrival_station.value == starting_station.value) {
        alert("le stazioni di partenza e di arrivo non possono coincidere")
    }

    if ((starting_station.value == "Milano") && (arrival_station.value == "Bologna") ||
        (starting_station.value == "Bologna") && (arrival_station.value == "Milano")) {
        console.log("bologna-milano")
    }

    if ((starting_station.value == "Milano") && (arrival_station.value == "Roma") ||
        (starting_station.value == "Roma") && (arrival_station.value == "Milano")) {
        console.log("roma-milano")
    }

    if ((starting_station.value == "Milano") && (arrival_station.value == "Napoli") ||
        (starting_station.value == "Napoli") && (arrival_station.value == "Milano")) {
        console.log("napoli-milano")
    }

    if ((starting_station.value == "Milano") && (arrival_station.value == "Villa S.Giovanni") ||
        (starting_station.value == "Villa S.Giovanni") && (arrival_station.value == "Milano")) {
        console.log("villa-milano")
    }

    if ((starting_station.value == "Bologna") && (arrival_station.value == "Roma") ||
        (starting_station.value == "Roma") && (arrival_station.value == "Bologna")) {
        console.log("bolo-roma")
    }

    if ((starting_station.value == "Bologna") && (arrival_station.value == "Napoli") ||
        (starting_station.value == "Napoli") && (arrival_station.value == "Bologna")) {
        console.log("bolo-napoli")
    }

    if ((starting_station.value == "Bologna") && (arrival_station.value == "Villa S.Giovanni") ||
        (starting_station.value == "Villa S.Giovanni") && (arrival_station.value == "Bologna")) {
        console.log("bolo-villa")
    }

    if ((starting_station.value == "Roma") && (arrival_station.value == "Napoli") ||
        (starting_station.value == "Napoli") && (arrival_station.value == "Roma")) {
        console.log("roma-napoli")
    }

    if ((starting_station.value == "Roma") && (arrival_station.value == "Villa S.Giovanni") ||
        (starting_station.value == "Villa S.Giovanni") && (arrival_station.value == "Roma")) {
        console.log("roma-vila")
    }

    if ((starting_station.value == "Napoli") && (arrival_station.value == "Villa S.Giovanni") ||
        (starting_station.value == "Villa S.Giovanni") && (arrival_station.value == "Napoli")) {
        console.log("villa-napoli")
    }



    calcDistance()
    hours_info.innerText = dep_time.value



})

function calcDistance() {
    let startingLat = degreesToRadians(startCoords.latitude);
    let startingLong = degreesToRadians(startCoords.longitude);
    let destinationLat = degreesToRadians(arrivalCoords.latitude);
    let destinationLong = degreesToRadians(arrivalCoords.longitude);

    // Radius of the Earth in kilometers
    let radius = 6571;

    // Haversine equation
    let distanceInKilometers = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
        Math.cos(startingLat) * Math.cos(destinationLat) *
        Math.cos(startingLong - destinationLong)) * radius;

    let myDistance = Math.floor(distanceInKilometers)
    distance_info.innerText = myDistance + " km"
    passengers_info.innerText = passenger_number + " passeggeri adulti " + elder_number + " passeggeri anziani"
    price_info.innerText = ((myDistance * price_multiplier) * (passenger_number + (elder_number * 4 / 10))).toFixed(2) + " euro"


}