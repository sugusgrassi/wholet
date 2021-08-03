const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { BASE_URL, DOG_URL } = require('../../constants');
const { v4: uuidv4 } = require('uuid');

const apiKey = process.env.API_KEY;
 
function getAllDogs(req, res, next){
    const dogFromApi = axios.get(`${BASE_URL}?api_key=${apiKey}`)    
    const dogFromDB = Dog.findAll({include: Temperament}); // findAll es una promesa de la búsqueda de datos en models/Dog.js que pasa por db para llegar hasta acá {limit: 4}
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    // Para traer ambas promesas
    Promise.all([dogFromApi, dogFromDB])
    .then((response) => {
        let [dogFromApiResponse, dogFromDBResponse] = response;
        let whoLetTheDogsOut = dogFromDBResponse.concat(dogFromApiResponse.data);
   
        if (req.query.name) {

            var filteredDogs = whoLetTheDogsOut.filter(o =>
                o.name.toLowerCase().includes(req.query.name.toLowerCase()));
            
            if (filteredDogs.length > 0) {
                // let firstEight = filteredDogs.splice(0, 8);
                 
                // req.query.name && !req.query.page = Paginado al front
                if (!req.query.page) {
                    // let firstEight = filteredDogs.slice(0, 8);
                    let firstEight = filteredDogs;
                    simplifiedDog(firstEight);
                    return res.json(firstEight);
                }

                // req.query.name && req.query.page = Paginado a la API
                simplifiedDog(filteredDogs);
                const page = parseInt(req.query.page)
                const limit = parseInt(req.query.limit)
                const startIndex = (page - 1) * limit;
                const endIndex = limit * page;
                // console.log(startIndex);
                // console.log(endIndex);
                const result = filteredDogs.slice(startIndex, endIndex);
                
                return res.json(result);
            } else {
                return res.status(404).send(`Ups, we couldn't find the 
                specimen ${req.query.name} 😬, but if it's a dog you can post it 😉`)
            }
            
        }

        if (!req.query.page) {
            // !req.query.name && !req.query.page = Paginado al front
            let firstEight = whoLetTheDogsOut;
            simplifiedDog(firstEight);
            return res.json(firstEight);
        }

        // !req.query.name && req.query.page = Paginado a la API
        simplifiedDog(whoLetTheDogsOut)  // trae los datos necesarios
        // https://medium.com/learnfactory-nigeria/create-a-pagination-middleware-with-node-js-fe4ec5dca80f
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit;
        const endIndex = limit * page;
        // console.log(startIndex);
        // console.log(endIndex);
        const result = whoLetTheDogsOut.slice(startIndex, endIndex);
        
        return res.json(result);

    })
    .catch((error) => next(error)); 

}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await#awaiting_a_promise.all
async function dogById(req, res, next){

    try {
        if (req.params.id.length > 3) {
        await Dog.findByPk(req.params.id, {include: Temperament}).then(dog => {
            if(dog) {
                var {id, name, height, weight, life_span, temperaments, image} = dog;
                var temperament = temperaments[0].temperament;
                return res.json({
                    id, 
                    name, 
                    height,
                    weight,
                    life_span,
                    temperament,
                    image
                })
            }
        })
        } else {
            console.log("La DB no lo tiene entonces vamos a la API")
            const response = await axios.get(`${BASE_URL}?api_key=${apiKey}`)
            for (var dog of response.data) {                
                if (dog.id == req.params.id){
                    dog.image = dog.image.url;
                    dog.weight = dog.weight.metric;
                    dog.height = dog.height.metric;
                    var {id, name, height, weight, life_span, temperament, image} = dog;
                    return res.json({
                        id, 
                        name, 
                        height,
                        weight,
                        life_span,
                        temperament,
                        image
                    })  
                }
            }
        }
    } catch (error) {
        if(error) {
                return res.status(404).json({ error: `Specimen with id ${req.params.id} not found 😬`})
        }  
    }
}



module.exports = {
    getAllDogs,
    dogById
}

function simplifiedDog(dogs){
    for (var dog of dogs){
        if (typeof dog.id === "number") {
            delete dog.origin;
            delete dog.breed_group;
            delete dog.reference_image_id;
            delete dog.bred_for;
            delete dog.description;
            delete dog.history;
            delete dog.country_code;
            dog.image = dog.image.url;
            dog.weight = dog.weight.metric;
            dog.height = dog.height.metric;
        }
        else {
            delete dog.dataValues.createdAt;
            delete dog.dataValues.updatedAt;
            dog.dataValues.temperament = dog.dataValues.temperaments[0].temperament;
            delete dog.dataValues.temperaments;
        }
    }
}
