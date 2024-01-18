const imageContainer = document.getElementById('image-container');
const leftButton = document.getElementById('left-arrow');
const rightButton = document.getElementById('right-arrow');
const thumbnailsContainer = document.querySelector('.thumbnails-container')

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


}

//reagisco al click delle thumbnails

const onThumbnailsClick = () => {

    thumbnailsElements.forEach ((thumbnail, i) => {
        currentIndexImage = thumbnail[i]
    })
}

//! INIZIO DELLA PAGINA


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



//!EVENT LISTENERS

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
