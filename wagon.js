// WAGON ------------------------------------------------------

module.exports = {
    heavywagon: heavyWagon,
    lightwagon: lightWagon, 
}

function prob(chance) {
    return chance < (Math.random() * 100);
}

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
    this.passengers = []; 
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
    this.passengers = []; 
    console.log("build a light wagon");
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