function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
Number.isFinite(Number.POSITIVE_INFINITY);
Number.isFinite(Number.NEGATIVE_INFINITY);
Number.isNaN(20);

console.log('Hello'.toUpperCase());
console.log('Hello'.toLowerCase());
console.log('hello'.startsWith('he'));

function description(string, ...values) {
    console.log(string);
    console.log(values);
    return {
        text: string,
        values: values,
    };
}

let prodName = 'A Carpet';
let prodPrice = 99.99;

console.log(description`This product (${prodName}) is ${prodPrice}`);

let regex = /^\S+@\S+\.\S+$/; // new RegExp();

console.log(regex.test('test@test.com'));
console.log(regex.compile('test@test.com'));
console.log(regex.exec('test@test.com'));
console.log('test@test.com'.match(regex));

regex = /.e(l|L)lo/;
// console.log(regex);
console.log('hello'.match(regex));
console.log(regex.test('Jello'));
console.log(regex.exec('JeLlo'));
