const addModalBtn = document.querySelector('header button');
const addModal = document.querySelector('#add-modal');
const deleteModal = document.querySelector('#delete-modal');
const backdrop = document.querySelector('#backdrop');
const addModalPassiveBtn = addModal.querySelector('.btn--passive');
const addModalSuccessBtn = addModal.querySelector('.btn--success');
const addModalInputElements = addModal.getElementsByTagName('input');
const entryTextSection = document.querySelector('#entry-text');
const movieList = document.querySelector('#movie-list');

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const showBackdrop = () => {
    backdrop.classList.add('visible');
};

const removeBackdrop = () => {
    backdrop.classList.remove('visible');
};

const clearModalValues = () => {
    for (element of addModalInputElements) {
        element.value = '';
    }
};

const showMovieModal = () => {
    clearModalValues();
    addModal.classList.add('visible');
    toggleBackdrop();
};

const closeMovieModal = () => {
    addModal.classList.remove('visible');
};

const closeDeleteModal = () => {
    deleteModal.classList.remove('visible');
};

const closeMovieDeleteModal = () => {
    toggleBackdrop();
    closeDeleteModal();
};

const backdropClickHandler = () => {
    toggleBackdrop();
    closeMovieModal();
    closeDeleteModal();
};

const addMovieHandler = () => {
    const titleValue = addModalInputElements[0].value.trim();
    const imageUrlValue = addModalInputElements[1].value.trim();
    const ratingValue = addModalInputElements[2].value.trim();
    if (
        titleValue === '' ||
        imageUrlValue === '' ||
        ratingValue === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid values (rating between 1 and 5).');
        return;
    }
    const newMovie = {
        _id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovie);
    closeMovieModal();
    toggleBackdrop();
    updateUI();
    renderNewMovieElement(newMovie);
};

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (movie of movies) {
        if (movie._id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    // movieList.removeChild(movieList.children[movieIndex]);
    movieList.children[movieIndex].remove();
    toggleBackdrop();
    closeDeleteModal();
    updateUI();
};

const deleteMovieHandler = (movieId) => {
    deleteModal.classList.add('visible');
    toggleBackdrop();
    let confirmBtn = deleteModal.querySelector('.btn--danger');
    const cancelBtn = deleteModal.querySelector('.btn--passive');
    confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    confirmBtn = deleteModal.querySelector('.btn--danger');
    cancelBtn.removeEventListener('click', closeMovieDeleteModal);
    confirmBtn.addEventListener('click', deleteMovie.bind(null, movieId));
    cancelBtn.addEventListener('click', closeMovieDeleteModal);
};

const updateUI = () => {
    if (movies.length > 0) {
        entryTextSection.style.display = 'none';
    } else {
        entryTextSection.style.display = 'block';
    }
};

const renderNewMovieElement = (movie) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${movie.image}" alt="${movie.title}">
        </div>
        <div class="movie-element__info">
            <h2>${movie.title}</h2>
            <p>${movie.rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener(
        'click',
        deleteMovieHandler.bind(null, movie._id)
    );
    movieList.appendChild(newMovieElement);
};

addModalBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
addModalPassiveBtn.addEventListener('click', () => {
    toggleBackdrop();
    closeMovieModal();
});
addModalSuccessBtn.addEventListener('click', addMovieHandler);
