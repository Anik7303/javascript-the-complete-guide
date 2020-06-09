// const buttons = document.querySelectorAll('button');
const button = document.querySelector('button');

function onButtonClickHandler(event) {
    console.log(event);
    event.target.disabled = true;
}

function removeButtonClickListener() {
    button.removeEventListener('click', onButtonClickHandler);
}

const bindedClickListenerHandler = onButtonClickHandler.bind(this);

// button.addEventListener('click', onButtonClickHandler);
// button.addEventListener('mouseenter', onButtonClickHandler);

// setTimeout(removeButtonClickListener, 3000);

// document
//     .querySelector('.long-one--container')
//     .addEventListener('scroll', (event) => {
//         console.log(event);
//     });

// buttons.forEach((button) => {
//     button.addEventListener('click', onButtonClickHandler);
// });

// const submitBtn = document.querySelector('form button[type="submit"]');
const form = document.querySelector('form');
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     // event.stopPropagation();
//     // event.stopImmediatePropagation();
//     console.log(event);
// });

// const div = document.querySelector('div');
// div.addEventListener('click', (event) => {
//     event.stopPropagation();
//     console.log('Div Clicked');
//     console.log(event);
// });

// button.addEventListener('click', (event) => {
//     event.stopPropagation();
//     console.log('Button clicked');
//     console.log(event);
// });

const list = document.querySelector('ul');
list.addEventListener('click', function (event) {
    // console.log(this);
    // console.log(event.currentTarget);
    // event.target.classList.toggle('highlight');
    event.target.closest('li').classList.toggle('highlight');
    // form.submit();
    // button.click();
});
