const addMovieBtn = document.querySelector('#add-movie-btn');
const searchBtn = document.querySelector('#search-btn');
const titleInput = document.querySelector('input#title');
const extraNameInput = document.querySelector('input#extra-name');
const extraValueInput = document.querySelector('input#extra-value');
const movieList = document.querySelector('ul#movie-list');

const movies = new Array();

const renderMovie = (movie) => {
    const newListItem = document.createElement('li');
    const { info, ...otherProps } = movie;
    // const { title: movieTitle } = info;
    let { getFormattedTitle: getTitle } = movie;
    // getTitle = getTitle.bind(movie);
    // let text = movieTitle + ' - ';
    let text = getTitle.call(movie) + ' - ';
    for (const key in info) {
        if (key !== 'title') {
            text = text + `${key} : ${info[key]}`;
        }
    }
    newListItem.textContent = text;
    movieList.prepend(newListItem);
};

const updateUI = () => {
    if (movies.length < 1) {
        movieList.classList.remove('visible');
        return;
    }
    if (!movieList.classList.contains('visible')) {
        movieList.classList.add('visible');
    }

    movieList.innerHTML = '';
    movies.forEach((movie) => {
        renderMovie(movie);
    });
};

const addMovieHandler = () => {
    const title = titleInput.value.toString();
    const key = extraNameInput.value.toString();
    const value = extraValueInput.value.toString();

    if (title.trim() === '' || key.trim() === '' || value.trim() === '') {
        return;
    }

    const movie = {
        info: {
            title,
            [key]: value,
        },
        id: Math.random().toString(),
        getFormattedTitle() {
            return this.info.title;
        },
    };

    movies.unshift(movie);
    console.log(movie);
    updateUI();
};

const searchMovieHandler = () => {
    const searchFilter = document
        .querySelector('#filter #filter-title')
        .value.toString();
    if (searchFilter.trim() === '') return;
    const filteredMovies = movies.filter((movie, index, movies) =>
        movie.info.title.toLowerCase().includes(searchFilter)
    );
    console.log(filteredMovies);
    movieList.innerHTML = '';
    filteredMovies.forEach((movie) => {
        renderMovie(movie);
    });
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
