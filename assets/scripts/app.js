const fetchButton = document.querySelector('#available-posts button');

const listElement = document.querySelector('#available-posts ul.posts');
const postTemplate = document.getElementById('single-post');

const sendHttpRequest = (method, url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        try {
            xhr.open(method, url);
            // xhr.responseType = 'json';
            xhr.onload = () => resolve(xhr.response);
            xhr.send();
        } catch (error) {
            reject(error);
        }
    });
};

function renderPosts(data) {
    if (data) {
        const postsList = JSON.parse(data);
        for (const post of postsList) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            listElement.append(postEl);
        }
    }
}

async function fetchPostsHandler() {
    sendHttpRequest('get', 'https://jsonplaceholder.typicode.com/posts')
        .then((responseData) => {
            renderPosts(responseData);
        })
        .catch((error) => console.log(error));
}

fetchButton.addEventListener('click', fetchPostsHandler);
