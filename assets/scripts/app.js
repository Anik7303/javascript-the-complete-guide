const button = document.querySelector('button');

const getPosition = (options) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            },
            options
        );
    });
};

const setTimer = (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, duration);
    });
};

async function trackUserHandler() {
    let positionData;
    let timerData;
    try {
        positionData = await getPosition();
        timerData = await setTimer(2000);
    } catch (error) {
        console.log(error);
    }
    console.log(timerData, positionData);
}

button.addEventListener('click', trackUserHandler);

Promise.race([getPosition(), setTimer(1000)]).then((data) => console.log(data));
Promise.all([getPosition(), setTimer(1000)]).then((data) => console.log(data));
Promise.allSettled([getPosition(), setTimer(1000)]).then((data) =>
    console.log(data)
);
