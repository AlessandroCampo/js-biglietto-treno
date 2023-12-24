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
// let passengers_info = document.getElementById("passengers_number")
let hours_info = document.getElementById("hours")
let price_info = document.getElementById("ticket_price")
let path_info = document.getElementById("path")
let hour_info = document.getElementById("chosen_time")
// let plus_button = document.getElementById("plus")
// let minus_button = document.getElementById("minus")
// let plus_elder_button = document.getElementById("elder_plus")
// let minus_elder_button = document.getElementById("elder_minus")
// let passenger_number = 1;
// let elder_number = 0;
// let passengers_number_selection = document.getElementById("passenger_number")
let trains_table = document.getElementById("trains")
let elders_number_selection = document.getElementById("elder_number")
let availableTimes = []
let currentDate = new Date()
let todayDate = currentDate.getDate()
let todayMonth = currentDate.getMonth()
let todayYear = currentDate.getFullYear()
let currentFullDate = `${todayYear}-${todayMonth + 1}-${todayDate}`;
let currentFullDateNextYear = `${todayYear + 1}-${todayMonth + 1}-${todayDate}`
let dep_hours = ["8:00", "9:17", "11:05", "13:30", "15:12", "17:00", "18:45", "19:30", "20:55", "22:04"]
let time_distance = "0:00"
let ticket_price = 0
let passenger_birth_date = document.getElementById("passenger_birth_date")
dep_day.setAttribute("min", currentFullDate)
dep_day.setAttribute("max", currentFullDateNextYear)
passenger_birth_date.setAttribute("max", currentFullDate)





function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}





// plus_button.addEventListener("click", () => {
//     if (passenger_number < 5) {
//         passenger_number++;
//         passengers_number_selection.value = passenger_number
//     }

//     else {
//         alert("il numero massimo di biglietti acquistabilli in una singola sessione è 5")
//     }

// })

// minus_button.addEventListener("click", () => {
//     if (passenger_number > 0) {
//         passenger_number--;
//         passengers_number_selection.value = passenger_number
//     }
// })

// plus_elder_button.addEventListener("click", () => {
//     if (passenger_number + elder_number < 10) {
//         elder_number++;
//         elders_number_selection.value = elder_number
//     }

//     else {
//         alert("il numero massimo di biglietti acquistabilli è 10")
//     }

// })

// minus_elder_button.addEventListener("click", () => {
//     if (elder_number > 0) {
//         elder_number--;
//         elders_number_selection.value = elder_number
//     }
// })

button.addEventListener("click", () => {


    if (starting_station.value == "Napoli") {
        startCoords.latitude = naples.latitude
        startCoords.longitude = naples.longitude
    }

    else if (starting_station.value == "Bologna") {
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

    else if (arrival_station.value == "Bologna") {
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

    checkTravelTime()


    if (arrival_station.value == starting_station.value) {
        alert("le stazioni di partenza e di arrivo non possono coincidere")
    }

    else if (currentDate.getHours() > dep_time.value.split(":")[0] && currentFullDate == dep_day.value) {
        alert("attenzione, a meno che tu non abbia una macchina del tempo non puoi prendere questo treno!")
    }

    else if (dep_day.value == "") {
        alert("Si prega di inserire una data di partenza")
    }


    else {

        generateTimeTables()
    }

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
    ticket_price = myDistance * price_multiplier
    price_info.innerText = (myDistance * price_multiplier).toFixed(2) + " euro"
    path_info.innerText = `${starting_station.value} - ${arrival_station.value}`



}

function checkTravelTime() {
    if ((starting_station.value == "Milano") && (arrival_station.value == "Bologna") ||
        (starting_station.value == "Bologna") && (arrival_station.value == "Milano")) {
        time_distance = "1:15"
    }

    if ((starting_station.value == "Milano") && (arrival_station.value == "Roma") ||
        (starting_station.value == "Roma") && (arrival_station.value == "Milano")) {
        time_distance = "3:40"
    }

    if ((starting_station.value == "Milano") && (arrival_station.value == "Napoli") ||
        (starting_station.value == "Napoli") && (arrival_station.value == "Milano")) {
        time_distance = "5:15"
    }

    if ((starting_station.value == "Milano") && (arrival_station.value == "Villa S.Giovanni") ||
        (starting_station.value == "Villa S.Giovanni") && (arrival_station.value == "Milano")) {
        time_distance = "8:45"
    }

    if ((starting_station.value == "Bologna") && (arrival_station.value == "Roma") ||
        (starting_station.value == "Roma") && (arrival_station.value == "Bologna")) {
        time_distance = "2:25"
    }

    if ((starting_station.value == "Bologna") && (arrival_station.value == "Napoli") ||
        (starting_station.value == "Napoli") && (arrival_station.value == "Bologna")) {
        time_distance = "3:45"
    }

    if ((starting_station.value == "Bologna") && (arrival_station.value == "Villa S.Giovanni") ||
        (starting_station.value == "Villa S.Giovanni") && (arrival_station.value == "Bologna")) {
        time_distance = "7:30"
    }

    if ((starting_station.value == "Roma") && (arrival_station.value == "Napoli") ||
        (starting_station.value == "Napoli") && (arrival_station.value == "Roma")) {
        time_distance = "1:15"
    }

    if ((starting_station.value == "Roma") && (arrival_station.value == "Villa S.Giovanni") ||
        (starting_station.value == "Villa S.Giovanni") && (arrival_station.value == "Roma")) {
        time_distance = "6:05"
    }

    if ((starting_station.value == "Napoli") && (arrival_station.value == "Villa S.Giovanni") ||
        (starting_station.value == "Villa S.Giovanni") && (arrival_station.value == "Napoli")) {
        time_distance = "4:03"
    }

}

function generateForm() {
    trains_table.classList.add("d-none")
    let class_selection = document.getElementById("ticket_class")
    let birth_date_selection = document.getElementById("passenger_birth_date")
    let form = document.querySelector("form")
    hour_info.innerText = event.target.getAttribute("data-ticket_time")
    form.classList.remove("d-none")
    class_selection.addEventListener("change", calcPrice)
    birth_date_selection.addEventListener("change", calcPrice)

}

function generateTimeTables() {
    let trs = document.querySelectorAll(".train")
    let table_body = document.getElementById("table_body")
    let displayed_solutions = 0;
    trains_table.classList.remove("d-none")
    trs.forEach((tr) => table_body.removeChild(tr))

    calcDistance()
    dep_hours.forEach((hour) => {

        let final_time
        function travelTimeCalc() {
            let minutes1 = Number(hour.split(":")[1])
            let hours1 = Number(hour.split(":")[0])
            let minutes2 = Number(time_distance.split(":")[1])
            let hours2 = Number(time_distance.split(":")[0])
            let result_hour = (hours1 + hours2)
            let result_minutes = (minutes1 + minutes2)
            if (result_minutes >= 60) {
                result_minutes = result_minutes - 60
                result_hour++;
            }

            if (result_hour >= 24) {
                result_hour = result_hour - 24;
            }


            result_hour = result_hour.toLocaleString("en-US", {
                minimumIntegerDigits: 2
            })

            result_minutes = result_minutes.toLocaleString("en-US", {
                minimumIntegerDigits: 2
            })

            final_time = `${result_hour}:${result_minutes}`

        }

        travelTimeCalc()



        let start_arrive = document.createElement("th")
        let time_dep_arr = document.createElement("th")
        let date = document.createElement("th")
        let duration = document.createElement("th")
        let total_price = document.createElement("th")
        let select = document.createElement("th")
        let train = document.createElement("tr")
        let select_button = document.createElement("button")



        train.className = "train"

        function display_timetable() {
            displayed_solutions++;
            start_arrive.innerText = `${starting_station.value} - ${arrival_station.value}`
            time_dep_arr.innerText = `${hour} - ${final_time}`
            duration.innerText = time_distance
            date.innerText = dep_day.value
            total_price.innerText = price_info.innerText
            select_button.classList.add("btn.btn-primary.select-button")
            select_button.setAttribute("data-ticket_time", time_dep_arr.innerText)
            select_button.innerText = "Seleziona"
            select_button.addEventListener("click", generateForm)
            table_body.appendChild(train)
            train.appendChild(start_arrive)
            train.appendChild(time_dep_arr)
            train.appendChild(duration)
            train.appendChild(date)
            train.appendChild(total_price)
            select.appendChild(select_button)
            train.appendChild(select)
        }

        if (Number(dep_time.value.split(":")[0]) < Number(hour.split(":")[0])) {
            display_timetable()
        }



    })
    if (displayed_solutions == 0) {
        alert("Non sono disponibili treni dopo l'orario da te indicato. Prova a modificare la data o l'orario di partenza")
    }
}

function calcPrice() {

    let class_selection = document.getElementById("ticket_class")
    let birth_date_selection = document.getElementById("passenger_birth_date")
    let ticket_class = class_selection.value
    let passenger_birth_date = birth_date_selection.value
    let starting_ticket_price = ticket_price
    let final_ticket_price
    let passenger_birth_year = passenger_birth_date.split("-")[0]

    console.log(event.target)

    if (event.target == class_selection) {
        switch (ticket_class) {
            case "economy":
                final_ticket_price = starting_ticket_price
                if ((todayYear - passenger_birth_year < 18 && !passenger_birth_date == "")) {
                    final_ticket_price = final_ticket_price * 0.8
                }

                else if ((todayYear - passenger_birth_year > 65 && !passenger_birth_date == "")) {
                    final_ticket_price = final_ticket_price * 0.6
                }
                price_info.innerText = final_ticket_price.toFixed(2)
                break;

            case "business":
                final_ticket_price = starting_ticket_price * 1.25
                if ((todayYear - passenger_birth_year < 18 && !passenger_birth_date == "")) {
                    final_ticket_price = final_ticket_price * 0.8
                }

                else if ((todayYear - passenger_birth_year > 65 && !passenger_birth_date == "")) {
                    final_ticket_price = final_ticket_price * 0.6
                }
                price_info.innerText = final_ticket_price.toFixed(2)
                break;

            case "premium":
                final_ticket_price = starting_ticket_price * 1.5
                if ((todayYear - passenger_birth_year < 18 && !passenger_birth_date == "")) {
                    final_ticket_price = final_ticket_price * 0.8
                }

                else if ((todayYear - passenger_birth_year > 65 && !passenger_birth_date == "")) {
                    final_ticket_price = final_ticket_price * 0.6
                }
                price_info.innerText = final_ticket_price.toFixed(2)
                break;
        }

    }

    else if (event.target == birth_date_selection) {
        if ((todayYear - passenger_birth_year < 18 && !passenger_birth_date == "")) {
            alert("è stato applicato lo sconto del 20% per i passeggeri minorenni")
            final_ticket_price = starting_ticket_price * 0.8
            price_info.innerText = final_ticket_price.toFixed(2)
        }

        else if ((todayYear - passenger_birth_year > 65 && !passenger_birth_date == "")) {
            alert("è stato applicato lo sconto del 40% per i passeggeri over 65")
            final_ticket_price = starting_ticket_price * 0.6
            price_info.innerText = final_ticket_price.toFixed(2)
        }

        else {
            final_ticket_price = starting_ticket_price
            price_info.innerText = final_ticket_price.toFixed(2)
        }

    }



}

