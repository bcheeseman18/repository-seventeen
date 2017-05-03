// import test from 'ava';

function prob(chance) {
    return chance < (Math.random() * 100);
}

// TRAVELER ---------------------------------------------------
function Traveler() {


    /**
     * if i have 5 ammo then i can hunt, if i can hunt then i have 
     * a 60% chance of getting 200 food
     */
    this.hunt = function () {
        if (this.home.ammo >= 5) { //if i have 5 ammo or more then i can hunt, then...
            this.home.ammo -= 5; // subtract 5 ammo from wagon 
            if (prob(60)) { // and if i have a probability of 60% i will get food then..
                this.home.food += 200;//add 200 to food count
            }
        } // do not need to return because the results will update the wagon (this.home)
    };

    this.eat = function () {
        if (this.alive && this.home.food > 0) { //if alive and food is more than 0...
            if (this.sick) { //and if i am sick 
                this.home.food -= 20; //subtract 20 from food to eat
            } else {
                this.home.food -= 10;//if not sick, subtract ten
            }
            if (this.home.food < 0) { // if food is less than 0 then...
                this.home.food = 0; //food equals 0 and i die
            }
            this.hunger -= 25; //decrease hunger by 25 after eating
            if (this.hunger < 0) { //if hunger is less than 0
                this.hunger = 0; // hunger is at 0 and i am full
            }

        }
    };

    this.sidekicks = function () {
        return this.home.passengers.length - 1; //members in the wagon minus the current person
    }
}

// HUNTER-----------------------------------------------

function Hunter(name, hunger, home, sick) {
    this.name = name;
    this.home = home;
    this.hunger = hunger;
    this.sick = sick;
    this.alive = true;

    this.hunt = function () {
        if (this.home.ammo >= 5) { //if i have 5 ammo or more then i can hunt, then...
            this.home.ammo -= 5; // subtract 5 ammo from wagon 
            if (prob(80)) { // and if i have a probability of 80% i will get food then..
                this.home.replenish( 200 );//add 200 to food count
            }
        } // do not need to return because the results will update the wagon (this.home)
    };
    this.eat = function () {
        if (this.alive && this.home.food > 0) { //if alive and food is more than 0...
            if (this.sick) { //and if i am sick 
                this.home.food -= 40; //subtract 20 from food to eat
            } else {
                this.home.food -= 20;//if not sick, subtract ten
            }
            if (this.home.food < 0) { // if food is less than 0 then...
                this.home.food = 0; //food equals 0 and i die
            }
            this.hunger -= 25; //decrease hunger by 25 after eating
            if (this.hunger < 0) { //if hunger is less than 0
                this.hunger = 0; // hunger is at 0 and i am full
            }

        }
    };
}

Hunter.prototype = new Traveler();

// -----------------------------------------------

//DOCTOR -----------------------------------------

function Doctor(name, hunger, home, sick) {
    this.name = name;
    this.home = home;
    this.hunger = hunger;
    this.sick = sick;
    this.alive = true;

    this.eat = function () {
        if (this.alive && this.home.food > 0) { //if alive and food is more than 0...
            if (this.sick) { //and if i am sick 
                this.home.food -= 60; //subtract 60 from food to eat
            } else {
                this.home.food -= 30;//if not sick, subtract thirty
            }
            if (this.home.food < 0) { // if food is less than 0 then...
                this.home.food = 0; //food equals 0 and i die
            }
            this.hunger -= 25; //decrease hunger by 25 after eating
            if (this.hunger < 0) { //if hunger is less than 0
                this.hunger = 0; // hunger is at 0 and i am full
            }
        }
    };

    this.heal = function (passenger) { //doctor takes one passenger
        if (passenger.sick) { // if the passenger is sick then...
            if (prob(50)) { //the probability of that passenger getting healthy is 50%
                passenger.sick = false; //that passenger is no longer sick
            }
        }
    };
}

Doctor.prototype = new Traveler();


//------------------------------------------------

//GUNSMITH ---------------------------------------

function Gunsmith(name, hunger, home, sick) {
    this.name = name;
    this.home = home;
    this.hunger = hunger;
    this.sick = sick;
    this.alive = true;

    this.makeAmmo = function (ammo) {
        return ammo + 1;
    };
}

Gunsmith.prototype = new Traveler();

//------------------------------------------------

//MONK -------------------------------------------

function Monk(name, hunger, home, sick) {
    this.name = name;
    this.home = home;
    this.hunger = hunger;
    this.sick = sick;
    this.alive = true;

    this.hunt = function () {
        if (this.home.ammo >= 5) { //if i have 5 ammo or more then i can hunt, then...
            this.home.ammo -= 5; // subtract 5 ammo from wagon 
            if (prob(0)) { // and if i have a probability of 0% i will get food then..
            }
        } // do not need to return because the results will update the wagon (this.home)
    };
}

Monk.prototype = new Traveler();

//------------------------------------------------

// WAGON ------------------------------------------------------



function Wagon(capacity, food, ammo) {
    console.log("build a wagon");
    this.capacity = capacity;
    this.ammo = ammo;
    this.passengers = [];
    this.day = 1;
    this.food = food;
    this.miles_traveled = 0;

    this.join = function (traveler) {
        if (this.capacity > 0) { //if capacity is more than 0 (there is more than 0 spots left)
            this.passengers.push(traveler); // add traveler to wagon
            return this.capacity--; //return capacity after added traveler until...
        }
        return 0; //it can return 0 (after the loop is all done, there should be 5 travelers)

    };

    this.quarantine = function (traveler) {
        for (let i = 0; i < this.passengers.length; i++)
            if (this.passengers[i] !== this.sick) { //if the current passenger is sick (this.sick was set to false)
                return true; //return true - passenger is sick
            } else {
                return false; //if not, return false
            }
    };

    this.ready = function () {
        let travelNum = 0; //travelers that are alive and ready to travel start at 0
        for (let i = 0; i < this.passengers.length; i++) { //loop through all passengers
            if (this.passengers[i].alive) { // if the passenger is alive then...
                travelNum++; //travel number = travel number + 1 (add new traveler to the existing travelers)
            }
        }
        return travelNum; // should be 5
    };

    this.next = function () {
        this.day++; //every day should increment by one
        this.travel();
        let anyoneSick = false; //everyone starts out as safe
        let hunter = null; //a hunter has not been chosen until after the loop

        let doctor = this.passengers.find(function(pass) { // iterate through every element in the 'passengers' array
            return pass instanceof Doctor; // if the passenger is the doctor - label him doctor
        });

        let gunsmith = this.passengers.find(function(pass) {
            return pass instanceof Gunsmith;
        });

        if (gunsmith) {
            this.ammo = gunsmith.makeAmmo(this.ammo);
        }

        for (let i = 0; i < this.passengers.length; i++) {
            let currPass = this.passengers[i]; //currPass is set to this.passengers[i] for readibility

            if (currPass.alive) {
                currPass.hunger += 10; //if the current passenger is alive, add 10 to hunger every day

                if (currPass.hunger >= 100) { //if the passengers hunger reaches 100 then...
                    currPass.alive = false;//passenger dies
                } else {
                    if (!hunter) { //if the current passenger is alive...
                        hunter = currPass;//they will be chosen as the hunter 
                    }
                    if (currPass.sick) {
                        if (doctor) {
                            doctor.heal(currPass);
                            if (currPass.sick) {
                                anyoneSick = true;
                            }
                        }
                    }
                    currPass.eat(); //every passenger eats once per day, need to call the eat function
                }
            }
        }

        let p = 5; //probability of someone getting sick starts at 5%
        if (anyoneSick) { //and if someone else is sick...
            p = 15; //that probability increases to 15%
        }

        if (prob(p)) { //if the probability of getting sick is p
            for (let i = 0; i < this.passengers.length; i++) {
                this.passengers[i].sick = true; //then the current passenger is sick
            }
        }

        if (hunter) { //if a passenger is set to be the hunter then...
            hunter.hunt();//the current hunter hunts every day
        }


    };
}

// HEAVY WAGON ------------------------------------

function heavyWagon(capacity, food, ammo) {
    console.log("build a heavy wagon");
    this.travel = function () {
        console.log("heavy wagon traveling");
        this.miles_traveled += 30;
    }

    this.replenish = function (amt) {
        console.log("heavy wagon replenishing");
        this.food += amt;
        if (this.food > 600) {
            this.food = 600;
        }
    }

    Wagon.call(this, capacity, food, ammo)
}

heavyWagon.prototype = new Wagon();
// ------------------------------------------------

//LIGHT WAGON -------------------------------------

function lightWagon(capacity, food, ammo) {
    console.log("build light a wagon");
    this.travel = function () {
        console.log("light wagon traveling");
        this.miles_traveled += 90;
    }

    this.replenish = function (amt) {
        console.log("light wagon replenishing")
        this.food += amt;
        if (this.food > 250) {
            this.food = 250;
        }
    }

    Wagon.call(this, capacity, food, ammo) //calls the function 'wagon'
}

console.log("making lightwagon prototype");
lightWagon.prototype = new Wagon();

//-------------------------------------------------


let wagon1 = new lightWagon(5, 100, 100);
let wagon2 = new heavyWagon(5, 100, 100); 

wagon1.join(new Hunter("Juan", 0, wagon1, false));
wagon1.join(new Doctor("John", 0, wagon1, false));
wagon1.join(new Monk("Ben", 0, wagon1, false));
wagon1.join(new Gunsmith("Nancy", 0, wagon1, false));
wagon1.join(new Traveler("Clint", 0, wagon2, false));

wagon2.join(new Hunter("Juan", 0, wagon2, false));
wagon2.join(new Doctor("John", 0, wagon2, false));
wagon2.join(new Monk("Ben", 0, wagon2, false));
wagon2.join(new Gunsmith("Nancy", 0, wagon2, false));
wagon2.join(new Traveler("Clint", 0, wagon2, false));

for (; wagon1.ready() !== 0;) {
    // console.log('ready ' + wagon.ready());
    // console.log('day ' + wagon.day);  
    wagon1.next();
}

for (; wagon2.ready() !== 0;) {
    // console.log('ready ' + wagon.ready());
    // console.log('day ' + wagon.day);  
    wagon2.next();
}

console.log("wagon1: all are dead at day " + wagon1.day);
console.log("wagon2: all are dead at day " + wagon2.day);
console.log('wagon1: miles traveled = ' + wagon1.miles_traveled); 
console.log('wagon2: miles traveled = ' + wagon2.miles_traveled); 