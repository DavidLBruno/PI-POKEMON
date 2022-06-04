const axios = require('axios');
const { Pokemon, Type } = require('../db');

const pokeApi = async () => {
    try{
        const infoApi = await axios.get('https://pokeapi.co/api/v2/pokemon');
        return infoApi;
    }catch(error){
        console.log(error);
    };
};

const getPokemons = async (req, res) => {
    try{
        let pokemons =  await pokeApi();
        res.send(pokemons);
    }catch(error){
        console.log(error);
    }
};

module.exports = {
    getPokemons
};