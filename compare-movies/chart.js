import { getMovies } from './local-storage.js';
import movieData from './movie-data.json';

export const barChart = () => {
    const parentElement = document.getElementById("bar-chart"); 
    parentElement.innerHTML = ""; 

    const canvas = document.createElement("canvas"); 
    parentElement.appendChild(canvas);

    new Chart(canvas, {
        type: 'bar',
        data: {
          labels: getMovies().map((movie) => movie.title),
          datasets: [{
            label: 'Total Domestic Gross in $',
            data: getMovies().map((movie) => movie.domestic),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
}

export const doughnutChart = () => {
    const parentElement = document.getElementById("doughnut-chart"); 
    parentElement.innerHTML = ""; 

    const canvas = document.createElement("canvas"); 
    parentElement.appendChild(canvas);

    const genreCounts = getMovies().map((movie) => movie.genre)
        .reduce((accObj, movie) => {
            if (!accObj[movie]) {
                accObj[movie] = 1;
            } else {
                accObj[movie]++;
            }
            return accObj;
        }, {})

    console.log(genreCounts)

    new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: [...new Set(getMovies().map((movie) => movie.genre))],
          datasets: [{
            label: 'Movies in Each Genre',
            data: Object.values(genreCounts),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(0,128,128)',
                'rgb(0,128,43)',
                'rgb(128,0,0)',
                'rgb(225,77,255)',
                'rgb(230,0,76)',
                'rgb(255,179,102)',
                'rgb(128,255,149)',
                'rgb(255,153,238)',
            ],
            hoverOffset: 4
          }]
        },
      })
}

