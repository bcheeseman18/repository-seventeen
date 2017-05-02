// import test from 'ava';

function prob(chance) {
    return chance < (Math.random() * 100);
}

// TRAVELER ---------------------------------------------------
function Traveler(name, hunger, home, sick) {
    this.name = name;
    this.hunger = hunger;
    this.home = home;
    this.sick = sick;
    this.alive = true;


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
            if(this.hunger < 0) { //if hunger is less than 0
                this.hunger = 0; // hunger is at 0 and i am full
            }

        }
    };

    this.sidekicks = function () {
        return this.home.passengers.length - 1; //members in the wagon minus the current person
    }
}

// WAGON ------------------------------------------------------



function Wagon(capacity, food, ammo) { // 5, 100, 100
    this.day = 1;
    this.capacity = capacity;
    this.food = food;
    this.ammo = ammo;
    this.passengers = [];

    this.join = function (traveler) {
        if (this.capacity > 0) { //if capacity is more than 0 (there is more than 0 spots left)
            this.passengers.push(traveler); // add traveler to wagon
            return this.capacity--; //return capacity after added traveler until...
        }
        return 0; //i can return 0 (after the loop is all done, there should be 5 travelers)
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
        let anyoneSick = false; //everyone starts out as safe
        let hunter = null; //a hunter has not been chosen until after the loop
        for(let i = 0; i < this.passengers.length; i++) {
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
                        anyoneSick = true; //if a passenger is sick then...
                        if (prob(20)) { //the probability of that passenger getting healthy is 20%
                            currPass.sick = false; //that passenger is no longer sick
                            anyoneSick = false; //and no one else is sick
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

        if(prob(p)) { //if the probability of getting sick is p
            for( let i = 0; i < this.passengers.length; i++) {
                this.passengers[i].sick = true; //then the current passenger is sick
            }
        }

        if (hunter) { //if a passenger is set to be the hunter then...
            hunter.hunt();//the current hunter hunts every day
        }
        
    };
}


let wagon = new Wagon(5, 100, 100);
wagon.join(new Traveler("Juan", 0, wagon, false));
wagon.join(new Traveler("John", 0, wagon, false));
wagon.join(new Traveler("Ben", 0, wagon, false));
wagon.join(new Traveler("Nancy", 0, wagon, false));
wagon.join(new Traveler("Clint", 0, wagon, false));

for (; wagon.ready() !== 0;) {
    // console.log('ready ' + wagon.ready());
    // console.log('day ' + wagon.day);  
    wagon.next();  
}

console.log("all are dead at day " + wagon.day);
