const fetchButton = document.querySelector('#available-posts button');
const listElement = document.querySelector('#available-posts ul.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url, callback) {
    const xhr = new XMLHttpRequest();
    try {
        xhr.open(method, url);
        xhr.requestType = 'json';
        xhr.onload = () => callback(xhr.response);
        xhr.send();
    } catch (error) {
        throw error;
    }
}

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
    try {
        sendHttpRequest(
            'GET',
            'https://jsonplaceholder.typicode.com/posts',
            renderPosts
        );
    } catch (error) {
        console.log(error);
    }
}

fetchButton.addEventListener('click', fetchPostsHandler);
