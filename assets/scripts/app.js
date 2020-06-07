/*
class Person {
    name = 'Anik';
    constructor() {
        this.age = 30;
    }

    greet() {
        console.log(`Hi, ${this.name} of age ${this.age}`);
    }
}
*/

function Person() {
    this.name = 'Anik';
    this.age = 23;
    this.greet = function () {
        console.log(`Hi, ${this.name} of age ${this.age}`);
    };
}

// Person.prototype.printAge = function () {
//     console.log(this.age);
// };

Object.setPrototypeOf(Person, {
    ...Object.getPrototypeOf(Person),
    printAge() {
        console.log(this.age);
    },
});

const course = {
    title: 'JavaScript - The Complete Guide',
    rating: 4.5,
};

class App {
    constructor() {}
    static main() {
        // const person = new Person();
        // person.greet();
        // console.log(person.__proto__);
        // console.dir(Object);
        // console.log(person);
        // console.dir(Person);

        Object.setPrototypeOf(course, {
            ...Object.getPrototypeOf(course),
            printRating() {
                console.log(`${this.rating}/5`);
            },
        });

        const student = Object.create(
            {
                printProgress: function () {
                    console.log(this.progress);
                },
            },
            {
                name: {
                    configurable: false,
                    enumerable: true,
                    value: 'Anik',
                    writable: false,
                },
            }
        );
        console.log(course);
        console.log(student);
    }
}

App.main();
