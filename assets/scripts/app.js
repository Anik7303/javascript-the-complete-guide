const fetchButton = document.querySelector('#available-posts button');
const listElement = document.querySelector('#available-posts ul.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const addPostBtn = document.querySelector('#new-post button');

const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: data,
    })
        .then((response) => {
            return {
                data: response.json(),
                status: response.status,
            };
        })
        .then((data, status) => {
            if (status >= 200 && status < 300) {
                return data;
            } else {
                throw new Error(`Something went wrong - error: ${data}`);
            }
        })
        .catch((error) => {
            throw error;
        });
};

function renderPosts(data) {
    console.log(data);
    if (data) {
        const postsList = data;
        // const postsList = JSON.parse(data);
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
            'https://jsonplaceholder.typicode.com/postss'
        );
        renderPosts(responseData);
    } catch (error) {
        console.log(error);
    }
}

const createPost = async (title, content) => {
    const userId = Math.random().toString();
    const post = new FormData(form);
    // post.append('title', title);
    // post.append('body', content);
    post.append('id', userId);
    try {
        const responseData = await sendHttpRequest(
            'POST',
            'https://jsonplaceholder.typicode.com/posts',
            post
        );
        const { id: postId } = responseData;
        // const { id: postId } = JSON.parse(responseData);
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
