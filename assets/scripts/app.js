const fetchButton = document.querySelector('#available-posts button');
const listElement = document.querySelector('#available-posts ul.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const addPostBtn = document.querySelector('#new-post button');

const sendHttpRequest = (method, url, data) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        // xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(
                    new Error(
                        `Something went wrong! (status code: ${xhr.status})`
                    )
                );
            }
        };
        xhr.onerror = () => {
            reject(
                new Error(`Failed to send request (status code: ${xhr.status})`)
            );
        };
        xhr.send(JSON.stringify(data));
    });
};

function renderPosts(data) {
    if (data) {
        const postsList = JSON.parse(data);
        for (const post of postsList) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }
    }
}

async function fetchPostsHandler() {
    try {
        const responseData = await sendHttpRequest(
            'get',
            'https://jsonplaceholder.typicode.com/posts'
        );
        renderPosts(responseData);
    } catch (error) {
        console.log(error);
    }
}

const createPost = async (title, content) => {
    const userId = Math.random().toString();
    const post = {
        title: title,
        body: content,
        userId: userId,
    };
    try {
        const responseData = await sendHttpRequest(
            'POST',
            'https://jsonplaceholder.typicode.com/posts',
            post
        );
        const { id: postId } = JSON.parse(responseData);
        console.log(postId);
    } catch (error) {
        console.log(error);
    }
};

function createPostHandler(event) {
    event.preventDefault();
    const title = event.target
        .closest('form')
        .querySelector('#new-post #title')
        .value.toString();
    const content = event.target
        .closest('form')
        .querySelector('#new-post #content')
        .value.toString();
    console.log(`title: ${title}, content: ${content}`);
    createPost(title, content);
}

async function deletePostHandler(event) {
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id;
        const responseData = await sendHttpRequest(
            'delete',
            `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        console.log(responseData);
    }
}

fetchButton.addEventListener('click', fetchPostsHandler);
form.addEventListener('submit', createPostHandler);
// addPostBtn.addEventListener('click', createPostHandler);
listElement.addEventListener('click', deletePostHandler);
