// TRAVELER ---------------------------------------------------

module.exports = {
    hunter: Hunter,
    doctor: Doctor,
    gunsmith: Gunsmith,
    monk: Monk,
}

function prob(chance) {
    return chance < (Math.random() * 100);
}

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
        if (this.home) {
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
                this.home.replenish(200);//add 200 to food count
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