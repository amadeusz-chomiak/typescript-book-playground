const chapter3 = new Chapter("Interfaces, Classes and Inheritance", 3, "95 - 128");


createChapter(chapter3, () => {
    test("Interface", 96, () => {
        enum iceCreamTastes {
            strawberry,
            chocolate,
            vanilla
        }
        enum iceCreamCones {
            chocolate,
            waffle
        }
        enum iceCreamTopping {
            chocolate,
            powderedSugar // = 'powdered sugar'
        }
        interface ICream {
            taste: iceCreamTastes;
            cone: iceCreamCones;
            topping?: iceCreamTopping;
        }
        const iceCreamForBoy: ICream = {
            taste: iceCreamTastes.strawberry,
            cone: iceCreamCones.chocolate
        };
        const iceCreamForGirl: ICream = {
            taste: iceCreamTastes.vanilla,
            cone: iceCreamCones.waffle,
            topping: iceCreamTopping.powderedSugar
        };
        logImportant("Paradigm: use \"I\" before interface name ex. ICream");
        logImportant("Interface is definition of properties object or class");
        logImportant("Interface is like a template");
        log("iceCreamForBoy: ", "iceCreamTastes[iceCreamForBoy.taste]", iceCreamTastes[iceCreamForBoy.taste],
            "iceCreamCones[iceCreamForBoy.cone]", iceCreamCones[iceCreamForBoy.cone],
            "iceCreamTopping[<number>iceCreamForBoy.topping]", iceCreamTopping[<number>iceCreamForBoy.topping]);
        log("iceCreamForGirl: ", "iceCreamTastes[iceCreamForGirl.taste]", iceCreamTastes[iceCreamForGirl.taste],
            "iceCreamCones[iceCreamForGirl.cone]", iceCreamCones[iceCreamForGirl.cone],
            "iceCreamTopping[<number>iceCreamForGirl.topping]", iceCreamTopping[<number>iceCreamForGirl.topping]);
        logWarning("iceCreamTopping[iceCreamForGirl.topping] I have to use iceCreamTopping[<number>iceCreamForGirl.topping] to prevent validator error", iceCreamTopping[<number>iceCreamForGirl.topping], iceCreamForGirl.topping);
    });

    testGroup("class", "99 - 113", () => {
        logWarning("only use class with methods inside", "for data use only interface, because interfaces don't compile in to js, they live only in dev environment");
        test("class constructor", 101, () => {
            class car {
                private speedLimit: number = 5;
                private crushed: boolean = false;
                private crush() {
                    this.crushed = true;
                }
                private checkSpeedLimit() {
                    if (this.speed >= this.speedLimit) {
                        this.crush();
                        log("Too fast, You crushed");
                    }
                }
                speedUp() {
                    if (this.crushed) {
                        log("You cannot speed up you have just crushed");
                    } else {
                        this.speed++;
                        log(`Speeding up to: ${this.speed}`);
                        this.checkSpeedLimit();
                    }
                }
                stop() {
                    this.speed = 0;
                }
                constructor(private speed: number) {
                    log(`Your initial speed: ${this.speed} with limit of ${this.speedLimit}`);
                }
            }
            const bobCar = new car(2);
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
        });
        test("class constructor with interface", 105, () => {
            interface car {
                readonly speedLimit: number;
                speed: number;
                crushed: boolean;
                crush(): void;
                checkSpeedLimit(): void;
                speedUp(): void;
                stop(): void;
            }
            class slowCar implements car {
                constructor(public speed: number) {
                    log(`Your initial speed: ${this.speed} with limit of ${this.speedLimit}`);
                }
                readonly speedLimit: number = 5;
                crushed: boolean = false;
                crush() {
                    this.crushed = true;
                }
                checkSpeedLimit() {
                    if (this.speed >= this.speedLimit) {
                        this.crush();
                        log("Too fast, You crushed");
                    }
                }
                speedUp() {
                    if (this.crushed) {
                        log("You cannot speed up you have just crushed");
                    } else {
                        this.speed++;
                        log(`Speeding up to: ${this.speed}`);
                        this.checkSpeedLimit();
                    }
                }
                stop() {
                    this.speed = 0;
                }
            }
            class fastCar implements car {
                constructor(public speed: number) {
                    log(`Your initial speed: ${this.speed}`);
                }
                readonly speedLimit: number = 10;
                crushed: boolean = false;
                crush() {
                    this.crushed = true;
                }
                checkSpeedLimit() {
                    if (this.speed >= this.speedLimit) {
                        this.crush();
                        log("Too fast, You crushed");
                    }
                }
                speedUp() {
                    if (this.crushed) {
                        log("You cannot speed up you have just crushed");
                    } else {
                        this.speed++;
                        log(`Speeding up to: ${this.speed}`);
                        this.checkSpeedLimit();
                    }
                }
                stop() {
                    this.speed = 0;
                    log("You stopped");

                }
            }
            logWarning("Dummy use case - do not use in real project");
            log("bob slow car");
            const bobCar = new slowCar(2);
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            log("jon fast car");
            const johnCar = new fastCar(2);
            johnCar.speedUp();
            johnCar.speedUp();
            johnCar.speedUp();
            johnCar.speedUp();
            johnCar.speedUp();
            johnCar.stop();
            logError("cannot use private variable and methods with interface template");
        });
        test("class set get OR property accessors", 109, () => {
            class car {
                private _speedLimit: number = 5;
                private _crushed: boolean = false;
                get crushed() {
                    logImportant("GETTER: getting crushed status");

                    return this._crushed;
                }
                set crushed(crushed: boolean) {
                    logImportant("SETTER: It is not up to you whether your car is crushed or not");
                }
                private crush() {
                    this._crushed = true;
                }
                private checkSpeedLimit() {
                    if (this._speed >= this._speedLimit) {
                        this.crush();
                        log("Too fast, You crushed");
                    }
                }
                speedUp() {
                    if (this._crushed) {
                        log("You cannot speed up you have just crushed");
                    } else {
                        this._speed++;
                        log(`Speeding up to: ${this._speed}`);
                        this.checkSpeedLimit();
                    }
                }
                stop() {
                    this._speed = 0;
                }
                constructor(private _speed: number) {
                    log(`Your initial speed: ${this._speed} with limit of ${this._speedLimit}`);
                }
            }
            const bobCar = new car(2);
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            log("get crushed: " + bobCar.crushed, "setting crushed to false...");
            bobCar.crushed = false;
        });
        test("class static", 111, () => {
            class car {
                static lawSpeedLimit: number = 10;
                private static carCounter: number = 0;
                private crushed: boolean = false;
                private crush() {
                    this.crushed = true;
                }
                static getCarsCount() {
                    return car.carCounter;
                }
                private checkSpeedLimit() {
                    if (this.speed >= this.speedLimit || this.speed >= car.lawSpeedLimit) {
                        this.crush();
                        log("Too fast, You crushed");
                    }

                }
                speedUp() {
                    if (this.crushed) {
                        log("You cannot speed up you have just crushed");
                    } else {
                        this.speed++;
                        log(`Speeding up to: ${this.speed}`);
                        this.checkSpeedLimit();
                    }
                }
                stop() {
                    this.speed = 0;
                }
                constructor(private speed: number, private speedLimit: number) {
                    log(`Your initial speed: ${this.speed} with limit of ${this.speedLimit}`);
                    car.carCounter++;
                }
            }
            logImportant("Static methods and values are shared between all instances of class");
            const bobCar = new car(0, 5);
            logImportant("bob car:");
            bobCar.speedUp();
            bobCar.speedUp();
            bobCar.speedUp();
            log("Cars amount: " + car.getCarsCount());
            logImportant("rob car:");
            const robCar = new car(0, 20);
            robCar.speedUp();
            robCar.speedUp();
            robCar.speedUp();

            car.lawSpeedLimit = 4;
            logImportant("New law speed limit: " + car.lawSpeedLimit);

            logImportant("bob car:");
            bobCar.speedUp();
            logImportant("rob car:");
            robCar.speedUp();
            log("Cars amount: " + car.getCarsCount());
        });
        test("class Namespace", 112, () => {
            // namespace nature {
            //     class car {
            //         constructor(public speed: number) {
            //         }
            //     }
            //     class rock {
            //         constructor(public name: string) { }
            //     }
            // }
            // namespace industrial {
            //     class car {
            //         constructor(public speed: number) {
            //         }
            //     }
            //     class rock {
            //         constructor(public name: string) { }
            //     }
            // }
            // new nature.car()
            // new industrial.car()
            logError("Only works when not in function");
        });

    });

    testGroup("inheritance", "113 - 122", () => {
        test("inheritance of interfaces", 114, () => {
            type gender = "woman" | "male"

            interface human {
                name: string;
                gender: gender;
            }
            interface wizard extends human {
                spellLvl: number;
            }
            const merlin: wizard = {
                name: "Merlin",
                gender: "male",
                spellLvl: 23
            };
            log("merlin wizard and human", Object.values(merlin));
        });

        test("inheritance of classes", 114, () => {
            type gender = "woman" | "male"

            class human {
                constructor(private name: string, public gender: gender) { }
                sayName() {
                    log("Hi I'm " + this.name);
                }
            }
            class wizard extends human {
                castSpell() {
                    log("casting spell", "fireball!");
                }
            }
            const merlin = new wizard("Merlin", "male");
            merlin.sayName();
            merlin.castSpell();
            log("merlin: " + Object.values(merlin));
        });

        test("super", 115, () => {
            type gender = "woman" | "male"

            class human {
                constructor(protected name: string, public gender: gender) { }
                sayName() {
                    log(`Hi I'm ${this.gender} My name is ${this.name}`);
                }
            }
            class wizard extends human {
                constructor(protected name: string, public gender: gender, private magicType: string) {
                    super(name, gender);
                }

                castSpell() {
                    log("casting spell", this.magicType + "ball!");
                }
                sayName() {
                    super.sayName();
                    log(`Also I'm ${this.magicType} wizard`);
                }
            }
            logWarning("To extend class you have to add \"super\" function in new constructor to pass new constructor values to parent class");
            const merlin = new wizard("Merlin", "male", "fire");
            log("Merlin: " + Object.values(merlin));
            merlin.sayName();
            merlin.castSpell();
            const Harry = new wizard("Harry", "male", "wind");
            log("Harry: " + Object.values(Harry));
            Harry.sayName();
            Harry.castSpell();
        });
        test("abstract", 118, () => {
            type gender = "woman" | "male"

            abstract class human {
                constructor(protected name: string, protected gender: gender) { }
                abstract sayName(): void;
                sayHi() {
                    log("Hi");
                }
            }
            class wizard extends human {
                constructor(protected name: string, protected gender: gender, private magicType: string) {
                    super(name, gender);
                }
                sayName() {
                    log(`I'm ${this.magicType} wizard. My name is ${this.name} My gender is ${this.gender}`);
                }
            }
            class king extends human {
                constructor(protected name: string, protected gender: gender, private country: string) {
                    super(name, gender);
                }
                sayName() {
                    log(`I'm a ruler of ${this.country}. My name is ${this.name} My gender is ${this.gender}`);
                }
            }
            logWarning("Abstract class can only extend another class", "use only when you have to use methods inside otherwise use an Interface");
            const merlin = new wizard("Merlin", "male", "fire");
            log("Merlin: " + Object.values(merlin));
            merlin.sayHi();
            merlin.sayName();
            const Henry = new king("Henry", "male", "England");
            log("Henry: " + Object.values(Henry));
            merlin.sayHi();
            Henry.sayName();
        });
    });

    test("Factory design pattern", "123 - 128", () => {
        const enum heroClasses {
            mage,
            warrior,
            priest
        }

        abstract class Hero {
            constructor(protected lvl: number) { }
            protected abstract canHeal(): boolean;
            logPower() {
                log(`I ${this.canHeal() ? "can" : "cannot"} heal your wounds`, `I have ${this.lvl} level`);
            }
        }
        class Mage extends Hero {
            protected canHeal() {
                return true;
            }
        }
        class Priest extends Hero {
            protected canHeal() {
                return true;
            }
        }
        class Warrior extends Hero {
            protected canHeal() {
                return false;
            }
        }
        class HeroFactory {
            getHero(heroClass: heroClasses, lvl: number) {
                switch (heroClass) {
                    case heroClasses.mage:
                        return new Mage(lvl);
                    case heroClasses.priest:
                        return new Priest(lvl);
                    case heroClasses.warrior:
                        return new Warrior(lvl);
                }
            }
        }
        const factory = new HeroFactory();
        logImportant("Mage");
        const mage = factory.getHero(heroClasses.mage, 15);
        mage.logPower();
        logImportant("Priest");
        const priest = factory.getHero(heroClasses.priest, 25);
        priest.logPower();
        logImportant("Warrior");
        const warrior = factory.getHero(heroClasses.warrior, 5);
        warrior.logPower();
    });
});