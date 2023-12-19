import './style.css'
import {
  getMovies,
  setMovies,
  addMovie,
  initMoviesIfEmpty
} from './local-storage.js';
import { barChart, doughnutChart } from './chart.js'

const renderMovies = () => {
  const movies = getMovies(); 
  const moviesList = document.querySelector("#movies-list");
  moviesList.textContent = ``; 

  movies.forEach((movie) => {
    const li = document.createElement("li"); 
    const div = document.createElement("div"); 
    
    const h3 = document.createElement("h3")
    h3.textContent = movie.title;
    
    const criticScoreP = document.createElement("p")
    criticScoreP.textContent = `Critic Score: ${movie.criticScore}%`; 
    
    const audienceScoreP = document.createElement("p")
    audienceScoreP.textContent = `Audience Score: ${movie.audienceScore}%`;
    
    const domesticP = document.createElement("p")
    domesticP.textContent = `Domestic Gross: $${movie.domestic}`; 

    const genreP = document.createElement("p")
    genreP.textContent = `Genre: ${movie.genre}`; 
    
    li.append(div);   
    div.append(h3, criticScoreP, audienceScoreP, domesticP, genreP);
    moviesList.append(li);
  });

  barChart();
  doughnutChart();
}

const handleSubmit = (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const newMovie = Object.fromEntries(formData);

  console.log('here is your data:', newMovie);
  console.log(getMovies());

  addMovie(newMovie);

  renderMovies();

  form.reset();
}

const resetMovies = () => {
  
  setMovies(null);
 
  initMoviesIfEmpty();
 
  renderMovies(); 
};

const main = () => {
  const form = document.querySelector("form"); 
  form.addEventListener("submit", handleSubmit);

  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", resetMovies);

  initMoviesIfEmpty();
  renderMovies();

}

main(); 