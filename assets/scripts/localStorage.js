const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', () => {
    const userId = 'u123';
    const user = {
        _id: 'u123',
        name: 'Anik',
        age: 23,
    };
    window.sessionStorage.setItem('user-id', userId);
    window.localStorage.setItem('user', JSON.stringify(user));
});

retrBtn.addEventListener('click', () => {
    const extractedId = window.sessionStorage.getItem('user-id');
    const extractedUser = window.localStorage.getItem('user');

    if (extractedId) {
        console.log(extractedId);
    } else {
        console.log("Couldn't find id");
    }
    if (extractedUser) {
        console.log(extractedUser);
    } else {
        console.log("Couldn't find user");
    }
});
