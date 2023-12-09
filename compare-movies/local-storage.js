import initialMovies from './movie-data.json';

// sets a new key-value pair in local storage.
const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  // tries to get a value from local storage.
  const getLocalStorageKey = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const setMovies = (movies) => setLocalStorageKey('movies', movies); 

export const getMovies = () => getLocalStorageKey('movies'); 

export const addMovie = (movie) => setMovies([movie, ...getMovies()]);

export const resetMovies = () => {
  setMovies(initialMovies);
  console.log(getMovies());
};

export const initMoviesIfEmpty = () => {
    if (!getMovies()) setMovies(initialMovies);

}