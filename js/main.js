const imageContainer = document.getElementById('image-container');
const leftButton = document.getElementById('left-arrow');
const rightButton = document.getElementById('right-arrow');


const logSomething = (something) =>  console.log(something);

const createTemplate = () => {

    //creo il template con un reduce
    const gamesElements = videogames.reduce((result, videogame, i) => {

        const {name, image} = videogame;
        
        return result + `
        <figure  id="image-${i}">
            <figcaption>
                <h3>${name}</h3>
            </figcaption>
            <img src="images/${image}" alt="${name}" class="img-fluid">
        </figure>`

    }, '');

    return gamesElements

};

//! INIZIO DELLA PAGINA


//appendo il template creato con la funzione alla pagina
imageContainer.innerHTML = createTemplate();

//Ora raccolgo tutte le figures create
const imagesElements = document.querySelectorAll('figure');

//Inizializzo una variabile d'appoggio
let currentIndexImage = 0;

//Alla prima di queste do la classe active in modo che possa vedersi
imagesElements[currentIndexImage].classList.add('active');



//!EVENT LISTENERS

rightButton.addEventListener('click', () => {
    
    // rimuovo all'elemento che è visibile attualmente la classe
    imagesElements[currentIndexImage].classList.remove('active');
    //se l'immagine mostrata è l'ultima faccio diventare il currentIndex - 1 così aumenta e torna a 0
    if (currentIndexImage === imagesElements.length - 1) {currentIndexImage = -1} 
    currentIndexImage++;
    //visto che ho aumentato l'index di uno mostrerò la figure dopo
    imagesElements[currentIndexImage].classList.add('active')


})