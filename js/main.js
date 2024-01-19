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

const changeThumbnailsDisplayed = (index) => {
    let currentPage = 1;
    const itemsPerPage = 5;
    const startIndex = 0;
    const endIndex = 4;
    // const startNewPage = startIndex + itemsPerPage;
    // const endNewPage = endIndex +itemsPerPage

    //se current index image è tra 0 e 4 current page è 1
    if (index >= startIndex && index <= endIndex) {
        currentPage = 1;
    }   else if (index <= 9 && index >= 5) {
        currentPage = 2;
    }   else if (index >= 10 && index <= 14) {
        currentPage = 3;
    }

    //rendo tutte hidden, se la pagina è uno tutte le thumb da 0 a 4 sono visibili
    thumbnailsElements.forEach((thumb) => {
        thumb.classList.add('d-none');
        switch (currentPage) {
            case 1:
                for (let i = startIndex; i <= endIndex; i++) {
                    thumbnailsElements[i].classList.remove('d-none')
                }
            case 2:
                for (let i = startIndex + itemsPerPage; i <= endIndex +itemsPerPage; i++) {
                    thumbnailsElements[i].classList.remove('d-none')
                }
            case 3:
                for (let i = startIndex + itemsPerPage * 2; i <= endIndex +itemsPerPage * 2; i++) {
                    thumbnailsElements[i].classList.remove('d-none')
                }
        }
        
    })

    


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

    changeThumbnailsDisplayed(currentIndexImage)
    



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
changeThumbnailsDisplayed(currentIndexImage);
console.log(currentIndexImage)

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
