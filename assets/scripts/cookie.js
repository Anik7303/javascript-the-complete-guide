const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', (event) => {
    console.log('storing cookies');
    const user = {
        name: 'Anik',
        expireTime: 30,
    };
    document.cookie = `user-name=${user.name}; max-age=${user.expireTime}`;
    document.cookie = `user=${JSON.stringify(user)}; max-age=${
        user.expireTime
    }`;
});

retrBtn.addEventListener('click', (event) => {
    const cookieData = document.cookie.split(';');
    const data = cookieData.map((item) => item.trim());
    console.log(data);
});
