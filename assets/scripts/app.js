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

function trackUserHandler() {
    let positionData;
    getPosition()
        .then((posData) => {
            positionData = posData;
            return setTimer(2000);
        })
        .then((data) => {
            console.log(data, positionData);
        })
        .catch((error) => {
            console.log(error);
        });
    // navigator.geolocation.getCurrentPosition(
    //     (posData) => {
    //         setTimer(2000).then((data) => {
    //             console.log(data, posData);
    //         });
    //     },
    //     (error) => {
    //         console.log(error);
    //     }
    // );
    setTimer(1000).then((data) => {
        console.log('timer finished');
    });
}

button.addEventListener('click', trackUserHandler);
