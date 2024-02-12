const apiKey = "api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const url = "https://api.themoviedb.org/3";
const path = "/discover/movie?sort_by=popularity.desc&";
const imgUrl = "https://image.tmdb.org/t/p/w500/";
const apiUrl = url + path + apiKey;

const main = document.getElementById("main") ? document.getElementById("main") : document.getElementById("movie_details");

if (main === document.getElementById("main")) {
    getMovies(apiUrl);
} else {
    getMovieDetails(apiUrl);
}

function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            showMovies(data.results);
        });
}

function showMovies(moviesData) {
    moviesData.forEach((movie, index, arr) => {
        const {
            title,
            poster_path,
            id
        } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <a href="movie_details_page.html?id=${id}">
        <img src="${imgUrl + poster_path}"">
        <h3>${title}</h3>
        `;
        main.appendChild(movieEl);
    });
}

var movieID = window.location.search.split("=")[1];
const movieDetails = document.getElementById("movie_details");

function getMovieDetails(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            data.results.forEach((movie) => {
                if (movie.id === +movieID) {
                    console.log(movie);
                    const {
                        title,
                        poster_path,
                        overview,
                    } = movie;
                    const movieDetailsEl = document.createElement("div");
                    movieDetailsEl.classList.add("movie_details_info");
                    movieDetailsEl.innerHTML = `
                    <img src="${imgUrl + poster_path}"">
                    <h3>${title}</h3>
                    `;
                    const movieDetailsOverview = document.createElement("div");
                    movieDetailsOverview.classList.add("overview");
                    movieDetailsOverview.innerHTML = `
                    <p>${overview}</p>
                    `;
                    movieDetails.appendChild(movieDetailsEl);
                    movieDetails.appendChild(movieDetailsOverview);
                }
            });
        }).catch((err) => {
            console.log(err);
        });
}