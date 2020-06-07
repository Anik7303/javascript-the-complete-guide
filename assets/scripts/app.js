function Person() {
    this.name = 'Anik';
    this.age = 23;
    this.greet = function () {
        console.log(`Hi, ${this.name} of age ${this.age}`);
    };
}

class App {
    static main() {
        const person = new Person();
        person.greet();
    }
}

App.main();
