// Using axios javascript library

const fetchButton = document.querySelector('#available-posts button');
const listElement = document.querySelector('#available-posts ul.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const addPostBtn = document.querySelector('#new-post button');

function renderPosts(data) {
    if (data) {
        const postsList = data;
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
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        console.log(response);
        renderPosts(response.data);
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
        const response = await axios.post(
            'https://jsonplaceholder.typicode.com/posts',
            post
        );
        console.log(response);
        const { id: postId } = response.data;
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
        const response = await axios.delete(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        console.log(response);
    }
}

fetchButton.addEventListener('click', fetchPostsHandler);
form.addEventListener('submit', createPostHandler);
// addPostBtn.addEventListener('click', createPostHandler);
listElement.addEventListener('click', deletePostHandler);
