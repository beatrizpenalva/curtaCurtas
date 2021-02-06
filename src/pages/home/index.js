/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { films } from './mock.js';
import { createMenu } from '../../components/menu/index.js';
import { header } from '../../components/header/index.js';
import { createMenuFilter } from '../../components/filter/index.js';
import { addFilm } from '../../services/index.js';

export const getFilms = (i) => {
  fetch(`https://www.omdbapi.com/?t=${i.title}&apikey=ce12da02`)
    .then((response) => response.json())
    .then((json) => {
      const getCatalogueSection = document.querySelector('#catalogue');
      getCatalogueSection.appendChild(printFilms(json));

      printFilms(json);
    });
};

export const Home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <section>
  <section class="main-page">
    <section id="header"></section>
    <section id="filters-area">
    <section id="info"></section>
    <section id="menu"></section>
  </section>
    <section id="catalogue" id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" databs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </section>
    <section id="movies-details-info" class="details-box"></section>
  </section>
</section>
`;

  const getAllFilms = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const i of films) {
      getFilms(i);
    }
  };
  getAllFilms();

  const getMenuSection = rootElement.querySelector('#menu');
  getMenuSection.appendChild(createMenu());

  const getHeaderSection = rootElement.querySelector('#header');
  getHeaderSection.appendChild(header());

  const getMenuFilterSection = rootElement.querySelector('#filters-area');
  getMenuFilterSection.appendChild(createMenuFilter());

 const catchCatalogue = rootElement.querySelector('#catalogue');
  showSerchResult(catchCatalogue)

  return rootElement;
};
export const showSerchResult = (section) => {
  const getCatalogueSection = section;
  return getCatalogueSection;

};
export const printFilms = (json) => {
  const filmsContainer = document.createElement('section');
  filmsContainer.classList.add('films-container');
  filmsContainer.innerHTML += `
    <section class="carousel-inner" data-id="${json.imdbID}">
      <p class="title">${json.Title}</p>
      <img class="image" class="d-block w-100" src="${json.Poster}">
      <button id="info-${json.imdbID}" class="info">
        <span class="material-icons">info</span>
      </button>
    </section>
  `;

  const allInfo = filmsContainer.querySelectorAll('.info');
  allInfo.forEach((button) => {
    button.addEventListener('click', (e) => {
      showDetailsContainer(e, json);
    });
  });

  return filmsContainer;
};

function showDetailsContainer(e, json) {
  const idFilmCard = e.target.parentNode.parentNode;
  const idNumber = idFilmCard.dataset.id;
  const getDetailsBox = document.getElementById('movies-details-info');
  getDetailsBox.innerHTML = `
  <section id="info-details" class="">
      <figure class="poster-details">
        <img class="image" class="d-block w-100" src="${json.Poster}">
      </figure>  
      <section class="sub-details-section">
        <p class="title-movie-details">${json.Title}</p>
        <p class="title-details">
           Director: 
           <p class="subtitle-1">${json.Director}</p>
        </p>
        <p class="title-details">
          Year:  
          <p class="subtitle-1">${json.Year}</p>
        </p> 
        <p class="title-details">
          Imdb score:
          <p class="subtitle-1">${json.imdbRating}</p>
        </p>  

      <section class="buttons-details">
        <button class="like" id="like-${json.imdbID}">
          <span class="material-icons">thumb_up_alt</span>
        </button>

        <button class="dislike" id="dislike-${json.imdbID}">
          <span class="material-icons">thumb_down_alt</span>
        </button>

        <button class="save" id="save-${json.imdbID}">
          <span class="material-icons">bookmark</span>
        </button>

        <button class="close-detail" id="close-container-${json.imdbID}">
          <span class="material-icons ">close</span>
        </button>
      </section>
      </section>  
      <section class="plot-box">
        <p class="title-movie-details">Plot:</p>
        <p class="subtitle-1">
          ${json.Plot}
        </p>
      </section>  
  </section>
  `
  const likeButton = getDetailsBox.querySelector(`#like-${json.imdbID}`);
  likeButton.addEventListener('click', () => {
    addFilm(json.imdbID, json.Title, json.Poster, 'likes');
    alert('Seu like foi recebido');
  });

  const dislikeButton = getDetailsBox.querySelector(`#dislike-${json.imdbID}`);
  dislikeButton.addEventListener('click', () => {
    addFilm(json.imdbID, json.Title, json.Poster, 'dislikes');
    alert('Seu dislike foi recebido');
  });

  const saveMovieButton = getDetailsBox.querySelector(`#save-${json.imdbID}`);
  saveMovieButton.addEventListener('click', () => {
    addFilm(json.imdbID, json.Title, json.Poster, 'watchlist');
    alert('Seu favorito foi recebido');

  });

  const closeDetailsButton = document.getElementById(`close-container-${idNumber}`);
  closeDetailsButton.addEventListener('click', () => {
    getDetailsBox.innerHTML = ""
  });
}
