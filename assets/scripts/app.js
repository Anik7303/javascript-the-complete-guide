const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

let id = localStorage.getItem('count') | 0;
let db;

const dbRequest = indexedDB.open('cartStorage', 1);
dbRequest.onsuccess = (event) => {
    db = event.target.result;
};

dbRequest.onupgradeneeded = (event) => {
    db = event.target.result;
    if (db) {
        const objStore = db.createObjectStore('products', { keyPath: '_id' });
        objStore.transaction.oncomplete = (event) => {
            const productStore = getStoreFromDB();
            productStore.add({
                _id: (++id).toString(),
                title: 'First Product',
                price: 99.99,
                tags: ['Expensive', 'Luxury'],
            });
        };
        setCount();
    }
};

dbRequest.onerror = (event) => {
    console.log(event.target.result);
};

const setCount = () => {
    localStorage.setItem('count', id);
};

const getStoreFromDB = () => {
    if (!db) return false;
    return db.transaction('products', 'readwrite').objectStore('products');
};

storeBtn.addEventListener('click', (event) => {
    const productStore = getStoreFromDB();
    if (!productStore) return;
    productStore.add({
        _id: (++id).toString(),
        title: 'Another product',
        price: 59.99,
    });
    setCount();
});

retrBtn.addEventListener('click', (event) => {
    const productStore = getStoreFromDB();
    if (!productStore) return;
    console.log(id);
    const request = productStore.get(id.toString());
    request.onsuccess = (event) => {
        console.log(event.target.result);
    };
});
