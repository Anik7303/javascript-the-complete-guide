const fetchButton = document.querySelector('#available-posts button');
const listElement = document.querySelector('#available-posts ul.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const addPostBtn = document.querySelector('#new-post button');

const sendHttpRequest = (method, url, data) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        try {
            xhr.open(method, url);
            // xhr.responseType = 'json';
            xhr.onload = () => resolve(xhr.response);
            xhr.send(JSON.stringify(data));
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
    const responseData = await sendHttpRequest(
        'POST',
        'https://jsonplaceholder.typicode.com/posts',
        post
    );
    const { id: postId } = JSON.parse(responseData);
    console.log(postId);
};

function createPostHandler(event) {
    event.preventDefault();
    const inputTitle = document.querySelector('#new-post #title');
    const inputContent = document.querySelector('#new-post #content');
    const title = inputTitle.value.toString();
    const content = inputContent.value.toString();
    console.log(`title: ${title}, content: ${content}`);
    createPost(title, content);
}

fetchButton.addEventListener('click', fetchPostsHandler);
form.addEventListener('submit', createPostHandler);
// addPostBtn.addEventListener('click', createPostHandler);
