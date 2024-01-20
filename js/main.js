const imageContainer = document.getElementById('image-container');
const leftButton = document.getElementById('left-arrow');
const rightButton = document.getElementById('right-arrow');
const thumbnailsContainer = document.querySelector('.thumbnails-container');
const videogamesButton = document.getElementById('videogames');
const tvshowsButton = document.getElementById('tv-shows');


//! Funzioni ---------------------------------------------------------------

const logSomething = (something) =>  console.log(something);

/** Creates the template for the images to display
 * 
 * @param {array} array 
 * @returns template of images 
 */
const createImageTemplate = (array) => {

    //creo il template con un reduce
    const images = array.reduce((result, element, i) => {

        const {name, image} = element;
        
        return result + `
        <figure  id="image-${i}">
            <figcaption>
                <h3>${name}</h3>
            </figcaption>
            <img src="images/${image}" alt="${name}" class="img-fluid">
        </figure>`

    }, '');

    return images

};

/**Creates the template for the thumbnails to display
 * 
 * @param {array} array 
 * @returns template of thumbnails
 */
const createThumbnailsTemplate = (array) => {
    //creo il template con un reduce

    const thumbnails= array.reduce((result, element) => {

        const {name, image} = element;
        
        return result + `
        <img src="/images/${image}" alt="${name}" class="thumbnails">`

    }, '');

    return thumbnails

}

/** Handle the set of 5 thumbnails displayed according to the current image index
 * 
 * @param {number} index 
 */
const changeThumbnailsDisplayed = (index) => {
    let currentPage = 1;
    const endIndex = 4;
    const firstGroup = 0;
    const secondGroup = 5;
    const thirdGroup = 10;

    //se current index image è tra 0 e 4 current page è 1 e così via
    if (index >= firstGroup && index <= endIndex) {
        currentPage = 1;
    }   else if (index >= secondGroup && index <= secondGroup+endIndex) {
        currentPage = 2;
    }   else if (index >= thirdGroup && index <= thirdGroup+endIndex) {
        currentPage = 3;
    }

    //rendo tutte hidden, se la pagina è uno tutte le thumb da 0 a 4 sono visibili e così via
    thumbnailsElements.forEach((thumb) => {
        
        
        thumb.classList.add('d-none');
        switch (currentPage) {
            case 1:
                for (let i = firstGroup; i <= endIndex; i++) {
                    thumbnailsElements[i].classList.remove('d-none');
                }
            case 2:
                for (let i = secondGroup; i <= secondGroup+endIndex; i++) {
                    thumbnailsElements[i].classList.remove('d-none');
                }
            case 3:
                for (let i = thirdGroup; i <= thirdGroup+endIndex; i++) {
                    thumbnailsElements[i].classList.remove('d-none');
                }
        }
        
    })


}

/** Handles the events of changing the current image
 * 
 * @param {*} target 
 */
const changeActivePic = (target) => {

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


/** Sets the beginning of the logic, also when changing the array of chosen images
 * 
 * @param {array} array 
 */
const startApp = (array) => {
    // risetto index a 0
    currentIndexImage = 0;

    //svuoto i container
    imageContainer.innerHTML = ''
    thumbnailsContainer.innerHTML = ''

    //appendo il template creato con la funzione alla pagina
    imageContainer.innerHTML = createImageTemplate(array);

    //appendo il template di thumbnails al container
    thumbnailsContainer.innerHTML = createThumbnailsTemplate(array);

    //Ora raccolgo tutte le figures e thumbnails create
    imagesElements = document.querySelectorAll('figure');
    thumbnailsElements = document.querySelectorAll('.thumbnails');
    
    //Alla prima di queste do la classe active e colored in modo che possa vedersi
    imagesElements[currentIndexImage].classList.add('active');
    thumbnailsElements[currentIndexImage].classList.add('colored');

    
    
   
}

/** Resets autoplay
 * 
 */
const resetAutoplay = () => {
    clearInterval(autoplay);
    autoplay = setInterval( () => {
        changeActivePic('next')
    },3000)
}

/** Handles the on thumbnail click event
 * 
 */
const onThumbnailsClick = () => {
    thumbnailsElements.forEach((thumbnail, i) => {

        thumbnail.addEventListener('click', () => {
            changeActivePic(i);
            resetAutoplay()
            
        })
    });
}

//! INIZIO DELLA PAGINA ----------------------------------------------------------------------

//inizializzo la mia variabile d'appoggio
let currentIndexImage = 0;
let imagesElements;
let thumbnailsElements;
let autoplay;

startApp(videogames);
changeThumbnailsDisplayed(currentIndexImage);

autoplay = setInterval( () => {
    changeActivePic('next')
},3000)

onThumbnailsClick();
    

//!EVENT LISTENERS----------------------------------------------------------------------

rightButton.addEventListener('click', () => {
    changeActivePic('next');
    resetAutoplay();
    
})

leftButton.addEventListener('click', () => {
    changeActivePic('previous')
    resetAutoplay()
    
});


videogamesButton.addEventListener('click', () => {
    
    startApp(videogames);
    resetAutoplay();
    onThumbnailsClick();
    
})

tvshowsButton.addEventListener('click', () => {
    
    startApp(tvshows)
    resetAutoplay();
    onThumbnailsClick();
    
    
    
    
})