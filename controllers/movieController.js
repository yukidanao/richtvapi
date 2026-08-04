const express = require('express');
const app = express();
const apikey = process.env.MOVIEKEY

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apikey}`
    }
}

exports.getMovies = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/discover/movie';
    const response = await fetch(url, options);
    const data = await response.json();
    const result = data.results.slice(0, 6);

    res.status(200).send(result);
}

exports.getFullMovieList = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const { genre } = req.query;
    let url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;

    if (genre) {
        url += `&with_genres=${genre}`
    }

    const response = await fetch(url, options);
    const data = await response.json();

    res.status(200).send(data);
}

exports.searchMovie = async (req, res) => {
    const input = req.query.input;
    const url = `https://api.themoviedb.org/3/search/movie?query=${input}`;
    const response = await fetch(url, options);
    const data = await response.json();

    res.status(200).send(data);
}

exports.getMovieTitleLogo = async (req, res) => {
    const movieId = req.params.movieId;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/images?language=en-US&include_image_language=en,null`;
    const response = await fetch(url, options);
    const data = await response.json();
    const result = data.logos[0];

    res.status(200).send(result);
}

exports.getMovieCast = async (req, res) => {
    const movieId = req.params.movieId;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const response = await fetch(url, options);
    const data = await response.json();
    const result = data.cast.filter(actor => actor.order < 8)
        .map(actor => ({
            id: actor.id,
            name: actor.name,
            character: actor.character,
            profile_path: actor.profile_path
        }));

    res.status(200).send(result);
}

exports.getMovieDetails = async (req, res) => {
    const movieId = req.params.movieId;
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const response = await fetch(url, options);
    const data = await response.json();

    res.status(200).send(data);
}

exports.getMovieRecommendations = async (req, res) => {
    const movieId = req.params.movieId;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;
    const response = await fetch(url, options);
    const data = await response.json();

    res.status(200).send(data);
}

exports.getMovieByCategory = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const { category } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${category}`;
    const response = await fetch(url, options);
    const data = await response.json();

    res.status(200).send(data)
}

exports.getNowPlayingMovies = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing';
    const response = await fetch(url, options);
    const data = await response.json();
    const result = data.results.slice(0, 5);

    res.status(200).send(result);
}

exports.getGenres = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    const response = await fetch(url, options);
    const data = await response.json();

    res.status(200).send(data);
}

exports.getTVGenres = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/genre/tv/list';
    const response = await fetch(url, options);
    const data = await response.json();

    res.status(200).send(data)
}

exports.getTV = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/discover/tv';
    const response = await fetch(url, options);
    const data = await response.json();
    const result = data.results.slice(0, 6)

    res.status(200).send(result);
}