// import test from 'ava';

let travelers = require('./traveler');
let wagons = require('./wagon');


function mapStatus(trav) {
    if (trav.sick) {
        return "sick";
    }

    return "well";
}


// -------- BUTTONS ---------------------------------------------

window.addEventListener('load', function () {
    let wagon = null;

    let startBtn = document.querySelector('.depart');

    startBtn.addEventListener('click', function () {
        console.log('Trail team created!');

        let statusLabels = document.querySelectorAll('.status');

        let huntBtn = document.querySelectorAll('.hunt'); 
        for (let i = 0; i < huntBtn.length; i++) {
            if (wagon.passengers[i]) {
                console.log("wagon" + "exists");
                let pass = wagon.passengers[i];
                let status = statusLabels[i];
                passhunt = function () {
                    pass.hunt();
                    status.innerHTML = mapStatus(pass);
                    console.log('The hunt is on!');
                }
                huntBtn[i].addEventListener('click', passhunt);
            }
        }

        let eatBtn = document.querySelectorAll('.eat');
        for (let i = 0; i < eatBtn.length; i++) {
            if (wagon.passengers[i]) {
                console.log("wagon " + " exists")
                let pass = wagon.passengers[i];
                let status = statusLabels[i];
                passeat = function () {
                    pass.eat();
                    status.innerHTML = mapStatus(pass);
                    console.log('Eating!');
                }
                eatBtn[i].addEventListener('click', passeat);
            }
        }

        //Show the game play (next view)
        let playView = document.querySelector('#play-game-view');
        playView.classList.add('show');

        //hide the start game (current view)
        let startView = document.querySelector('#new-game-view');
        startView.classList.remove('show')
    });

    let playBtn = document.querySelector('.play');

    playBtn.addEventListener('click', function () {
        console.log('Good Luck!');
        //Show the game play (next view)
        let playView = document.querySelector('#new-game-view');
        playView.classList.add('show');

        //hide the start game (current view)
        let startView = document.querySelector('#play-game-view');
        startView.classList.remove('show')
    });

    // ----------------add Hunter ----------------



    let hunterBtn = document.querySelector('.hunter')
    hunterBtn.addEventListener('click', function () {
        let createHunter = new travelers.hunter('Tom', 0, wagon, false);
        console.log(createHunter);
        wagon.passengers.push(createHunter);
        console.log('Hunter Added');

    });


    let docBtn = document.querySelector('.doctor')
    docBtn.addEventListener('click', function () {
        let createDoctor = new travelers.doctor('Doc', 0, wagon, false);
        console.log(createDoctor);
        wagon.passengers.push(createDoctor);
        console.log('Doctor Added');
    });



    let gunBtn = document.querySelector('.gunsmith')
    gunBtn.addEventListener('click', function () {
        let createGun = new travelers.gunsmith('Marty', 0, wagon, false);
        console.log(createGun);
        wagon.passengers.push(createGun);
        console.log('Gunsmith Added');
    });



    let monkBtn = document.querySelector('.monk')
    monkBtn.addEventListener('click', function () {
        let createMonk = new travelers.monk('Ming', 0, wagon, false);
        console.log(createMonk);
        wagon.passengers.push(createMonk);
        console.log('Monk Added');
    });

    let heavyBtn = document.querySelector('.heavyWag')
    heavyBtn.addEventListener('click', function () {
        wagon = new wagons.heavywagon(4, 600, 50);
        console.log(wagon);
    });

    let lightBtn = document.querySelector('.lightWag')
    lightBtn.addEventListener('click', function () {
        wagon = new wagons.lightwagon(4, 250, 25)
        console.log(wagon);
    });

    // ---------- display team -----------------------




}); 