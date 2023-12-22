const milan = {
    latitude: 45.4654219,
    longitude: 9.1859243
}

const turin = {
    latitude: 45.070312,
    longitude: 7.6868565
}

const rome = {
    latitude: 41.9027835,
    longitude: 12.4963655
}


const naples = {
    latitude: 40.8517746,
    longitude: 14.2681244
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

let travelDistance = 0;
let button = document.getElementById("button")
let starting_station = document.getElementById("starting-station")
let arrival_station = document.getElementById("arriving-station")
let distance_info = document.getElementById("distance_travelled")

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}




button.addEventListener("click", () => {


    if (starting_station.value == "Napoli") {
        startCoords.latitude = naples.latitude
        startCoords.longitude = naples.longitude
    }

    else if (starting_station.value == "Torino") {
        startCoords.latitude = turin.latitude
        startCoords.longitude = turin.longitude
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
        arrivalCoords.latitude = turin.latitude
        arrivalCoords.longitude = turin.longitude
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

    console.log(startCoords.latitude)
    calcDistance()



})

function calcDistance() {
    console.log(startCoords.latitude)
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
    distance_info.innerText = myDistance + "km"

}