const imageContainer = document.getElementById('image-container');
const leftButton = document.getElementById('left-arrow');
const rightButton = document.getElementById('right-arrow');
const thumbnailsContainer = document.querySelector('.thumbnails-container');


//! Funzioni ---------------------------------------------------------------

const logSomething = (something) =>  console.log(something);

const createImageTemplate = () => {

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

const createThumbnailsTemplate = () => {
    //creo il template con un reduce

    const thumbnails= videogames.reduce((result, videogame) => {

        const {name, image} = videogame;
        
        return result + `
        <img src="/images/${image}" alt="${name}" class="thumbnails">`

    }, '');

    return thumbnails

}

const changeActivePic = (target, i) => {

    // rimuovo all'elemento che è visibile attualmente la classe
    imagesElements[currentIndexImage].classList.remove('active');
    thumbnailsElements[currentIndexImage].classList.remove('colored');
    //in base al caso aumento o diminuisco
    
    switch (target) {
        case "next":
            if (currentIndexImage === imagesElements.length - 1) currentIndexImage = -1 
            currentIndexImage++;
            break;
        case "previous":
            if (currentIndexImage === 0) currentIndexImage = imagesElements.length
            currentIndexImage--;
            break;
        default:
            currentIndexImage = target
        
    }
    
    imagesElements[currentIndexImage].classList.add('active');
    thumbnailsElements[currentIndexImage].classList.add('colored');

    //gestisco il cambio thumbnails
    //questa è la logica iniziale, devo renderla dinamica invece di ripeterla così
    if (currentIndexImage >= 0 && currentIndexImage < 4) {
        logSomething('prima tabella');
        thumbnailsElements[0].classList.remove('d-none')
        thumbnailsElements[1].classList.remove('d-none')
        thumbnailsElements[2].classList.remove('d-none')
        thumbnailsElements[3].classList.remove('d-none')
        thumbnailsElements[4].classList.remove('d-none')
        thumbnailsElements[5].classList.add('d-none')
        thumbnailsElements[6].classList.add('d-none')
        thumbnailsElements[7].classList.add('d-none')
        thumbnailsElements[8].classList.add('d-none')
        thumbnailsElements[9].classList.add('d-none')
        thumbnailsElements[10].classList.add('d-none')
        thumbnailsElements[11].classList.add('d-none')
        thumbnailsElements[12].classList.add('d-none')
    } else if (currentIndexImage < 9 && currentIndexImage > 4){ 
        logSomething('seconda tabella');
        thumbnailsElements[0].classList.add('d-none')
        thumbnailsElements[1].classList.add('d-none')
        thumbnailsElements[2].classList.add('d-none')
        thumbnailsElements[3].classList.add('d-none')
        thumbnailsElements[4].classList.add('d-none')
        thumbnailsElements[5].classList.remove('d-none')
        thumbnailsElements[6].classList.remove('d-none')
        thumbnailsElements[7].classList.remove('d-none')
        thumbnailsElements[8].classList.remove('d-none')
        thumbnailsElements[9].classList.remove('d-none')
        thumbnailsElements[10].classList.add('d-none')
        thumbnailsElements[11].classList.add('d-none')
        thumbnailsElements[12].classList.add('d-none')
        
    }   else if (currentIndexImage > 9 && currentIndexImage < 14) {
        logSomething('terza tabella');
        thumbnailsElements[0].classList.add('d-none')
        thumbnailsElements[1].classList.add('d-none')
        thumbnailsElements[2].classList.add('d-none')
        thumbnailsElements[3].classList.add('d-none')
        thumbnailsElements[4].classList.add('d-none')
        thumbnailsElements[5].classList.add('d-none')
        thumbnailsElements[6].classList.add('d-none')
        thumbnailsElements[7].classList.add('d-none')
        thumbnailsElements[8].classList.add('d-none')
        thumbnailsElements[9].classList.add('d-none')
        thumbnailsElements[10].classList.remove('d-none')
        thumbnailsElements[11].classList.remove('d-none')
        thumbnailsElements[12].classList.remove('d-none')
    }

}


//! INIZIO DELLA PAGINA ----------------------------------------------------------------------


//appendo il template creato con la funzione alla pagina
imageContainer.innerHTML = createImageTemplate();

//appendo il template di thumbnails al container
thumbnailsContainer.innerHTML = createThumbnailsTemplate();


//Ora raccolgo tutte le figures e thumbnails create
const imagesElements = document.querySelectorAll('figure');
const thumbnailsElements = document.querySelectorAll('.thumbnails');

//Inizializzo una variabile d'appoggio
let currentIndexImage = 0;

//Alla prima di queste do la classe active e colored in modo che possa vedersi
imagesElements[currentIndexImage].classList.add('active');
thumbnailsElements[currentIndexImage].classList.add('colored');

//Assegno le variabili di inizio e fine per ogni pagina di thumbnails
// let currentPage = 1;
// const itemsPerPage = 5;
// const startIndex = (page - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;

//!EVENT LISTENERS----------------------------------------------------------------------

rightButton.addEventListener('click', () => {
    changeActivePic('next')
})

leftButton.addEventListener('click', () => {
    changeActivePic('previous')

});

thumbnailsElements.forEach((thumbnail, i) => {

    thumbnail.addEventListener('click', () => {
        changeActivePic(i)
    })
});

//se l'index è superiore a 4 devo mostrare le thumbnails da 5 a 9
//Voglio mostrare 5 thumbnails alla volta, quindi devo fare in modo che se supero una certa soglia con le freccie vedo le 5 thumbnails a partire da i numeri 0, 5, 10, 15 quindi multipli di 5
