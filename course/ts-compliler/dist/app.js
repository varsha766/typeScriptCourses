"use strict";
// Decorators in typescript
/**
 * Decorators are special kind of declaration that can be
 * attached to a class declaration, method, accessor,
 * property, or parameter.
 * Decorator use the form @expression, where expression must evalute to function
 * that get called at runtime with information about the
 * declaration
 * for writting decorator in TS    "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators and "emitDecoratorMetadata": true,  should
 * be set to true
 * */
// writing decorator
// For using particular decorator on class it must take at least one argument i.e constructor funcction
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// decortor is nothing but a function
function FirstDecorator(constructor) {
    console.log("Decorator Invoked");
    console.log(constructor);
}
let Aircraft = class Aircraft {
    constructor(_aircraftModel, pilot) {
        this._aircraftModel = _aircraftModel;
        this.pilot = pilot;
        console.log(" constructor function is invoked ");
    }
    pilotName() {
        console.log(this.pilot);
    }
    get aircraftModel() {
        return this._aircraftModel;
    }
};
Aircraft = __decorate([
    FirstDecorator,
    __metadata("design:paramtypes", [String, String])
], Aircraft);
// when decorator get invoked
/**
 * Decorators are invoked only once throughout the application execution process
 * They are invoked at the time when class is defined by typescript at the runtime
 * but not when the class is instantiated
 */
const aircraft = new Aircraft("Airbus A380", "John");
// advantage of decorator is we can add properties and methods to the prototype of the object generated by the class
var Manufacturer;
(function (Manufacturer) {
    Manufacturer["boeing"] = "boeing";
    Manufacturer["airbus"] = "airbus";
})(Manufacturer || (Manufacturer = {}));
function AircraftManufacturer(manufacturer) {
    return (target) => {
        if (manufacturer === Manufacturer.airbus) {
            target.prototype.origin = "United state of America";
            target.prototype.manufacturer = Manufacturer.airbus;
            target.prototype.type = "Jet";
        }
        else {
            target.prototype.origin = "France";
            target.prototype.manufacturer = Manufacturer.boeing;
            target.prototype.type = "Helicopter";
        }
    };
}
let Airplane = class Airplane {
    constructor(_aircraftModel, pilot) {
        this._aircraftModel = _aircraftModel;
        this.pilot = pilot;
        console.log(" constructor function is invoked ");
    }
    pilotName() {
        console.log(this.pilot);
    }
    get aircraftModel() {
        return this._aircraftModel;
    }
};
Airplane = __decorate([
    AircraftManufacturer(Manufacturer.airbus),
    __metadata("design:paramtypes", [String, String])
], Airplane);
const airplane = new Airplane("Airbus A380", "John");
// console.log(airplane);
// console.log(airplane.manufacturer);
// interface for prototype
/**
 * We are getting error `Property 'manufacturer' does not exist on type 'Airplane'.` if we do console.log(airplane.manufacturer)
 * because we have added  manufacturer tot he prototype using decorater rather adding them to class
 */
// adding function to prototype
function AircraftManufacturer2(manufacturer) {
    return (target) => {
        if (manufacturer === Manufacturer.airbus) {
            target.prototype.origin = "United state of America";
            target.prototype.manufacturer = Manufacturer.airbus;
            target.prototype.type = "Jet";
            target.prototype.airBusMethod = () => {
                console.log(" Function performed by airbus");
            };
        }
        else {
            target.prototype.origin = "France";
            target.prototype.manufacturer = Manufacturer.boeing;
            target.prototype.type = "Helicopter";
            target.prototype.boeingMethod = () => {
                console.log(" Function performed by boeing");
            };
        }
    };
}
let Airplane2 = class Airplane2 {
    constructor(_aircraftModel, pilot) {
        this._aircraftModel = _aircraftModel;
        this.pilot = pilot;
    }
    pilotName() {
        console.log(this.pilot);
    }
    get aircraftModel() {
        return this._aircraftModel;
    }
};
Airplane2 = __decorate([
    AircraftManufacturer2(Manufacturer.airbus),
    __metadata("design:paramtypes", [String, String])
], Airplane2);
const airplane2 = new Airplane2("Airbus A380", "John");
airplane2.airBusMethod
    ? airplane2.airBusMethod()
    : console.log("Method does not exists");
// use of decorator to multiple classes
let Helicopter = class Helicopter {
    constructor(_aircraftModel, pilot) {
        this._aircraftModel = _aircraftModel;
        this.pilot = pilot;
    }
    pilotName() {
        console.log(this.pilot);
    }
    get aircraftModel() {
        return this._aircraftModel;
    }
};
Helicopter = __decorate([
    AircraftManufacturer2(Manufacturer.boeing),
    __metadata("design:paramtypes", [String, String])
], Helicopter);
const helicopter = new Helicopter("H380", "Mark");
//console.log(helicopter);
//How to use decorator with method of classes
// Method decorator takes three argument
//1. classPrototype:Object,   class prototype
//2. methodName:string   //method name itself
//3. descriptor:PrototyDescriptor   // descriptor of the method
function MethodDecorator(classPrototype, methodName, descriptor) {
    console.log(classPrototype, methodName, descriptor);
    // we can set the value of descriptor in decorator itself
    descriptor.writable = false;
}
class Airplane3 {
    constructor(_aircraftModel, pilot) {
        this._aircraftModel = _aircraftModel;
        this.pilot = pilot;
    }
    pilotName() {
        console.log(this.pilot);
    }
    get aircraftModel() {
        return this._aircraftModel;
    }
}
__decorate([
    MethodDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Airplane3.prototype, "pilotName", null);
const airplane3 = new Airplane3("Airbus A380", "Varsha");
//airplane3.pilotName = () => console.log("Function changed");
//airplane3.pilotName(); // we can not change the function because pilotName is set to writable:false in its descriptor
// static method decorator
// in static method decorator we pass constructor
// for all static member the first argument that we get is constructor method
function StaticMethodDecorator(constructor, methodName, descriptor) {
    console.log(constructor, methodName, descriptor);
    // we can set the value of descriptor in decorator itself
    descriptor.writable = false;
}
class NewAirplane {
    constructor(_aircraftModel, pilot) {
        this._aircraftModel = _aircraftModel;
        this.pilot = pilot;
    }
    static seatCount() {
        console.log("156");
    }
    pilotName() {
        console.log(this.pilot);
    }
    get aircraftModel() {
        return this._aircraftModel;
    }
}
__decorate([
    MethodDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewAirplane.prototype, "pilotName", null);
__decorate([
    StaticMethodDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewAirplane, "seatCount", null);
const newResult = new NewAirplane("ATC 1231", "nandani");
// decorator factory
// Decorator factory is nothing but a function that encapsulates the original decorator function nd returns the original function
// convert FirstDecorator to decorator factory
// decorator factory can be invoked using parenthesis
function FirstDecoratorFactory(name) {
    return function (constructor) {
        console.log(`${name} Invoked`);
        console.log(constructor);
    };
}
let NewAirplane2 = class NewAirplane2 {
    constructor(_aircraftModel, pilot) {
        this._aircraftModel = _aircraftModel;
        this.pilot = pilot;
    }
    static seatCount() {
        console.log("156");
    }
    pilotName() {
        console.log(this.pilot);
    }
    get aircraftModel() {
        return this._aircraftModel;
    }
};
NewAirplane2 = __decorate([
    FirstDecoratorFactory("First decorator"),
    __metadata("design:paramtypes", [String, String])
], NewAirplane2);
const result = new NewAirplane2("ATC 1231", "nandani");
