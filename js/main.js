const imageContainer = document.getElementById('image-container')

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

    console.log(gamesElements)

    return gamesElements

};

//! inizio della logica

imageContainer.innerHTML = createTemplate();
