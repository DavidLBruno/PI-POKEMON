const axios = require('axios');
const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db');

const pokeApi = async (name) => {
    try{
        if(name){
            const pokeByName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if(pokeByName){
                return {
                    id: pokeByName.data.id,
                    name: pokeByName.data.name,
                    hp: pokeByName.data.stats[0].base_stat,
                    attack: pokeByName.data.stats[1].base_stat,
                    defense: pokeByName.data.stats[2].base_stat,
                    speed: pokeByName.data.stats[5].base_stat,
                    height: pokeByName.data.height,
                    weight: pokeByName.data.weight,
                    image: pokeByName.data.sprites.versions['generation-v']['black-white'].front_default,
                    Type: pokeByName.data.types.map((e) => { return { name: e.type.name } }),
                };
            }else{
                return [];
            }
        }else{
            const pokemonsApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
            const urlPokemons = await pokemonsApi.data.results.map( (e) => e.url);
            const allPokemons = [];
            for (let i = 0; i < urlPokemons.length; i++) {
                const getInfoPokemons = await axios.get(`${urlPokemons[i]}`);
                allPokemons.push(getInfoPokemons.data)
            };
            return allPokemons.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight,
                    image: e.sprites.versions['generation-v']['black-white'].front_default,
                    Type: e.types.map((e) => { return { name: e.type.name } }),
                }
            });
        };
    }catch{
        console.log('Pokemon Not Found');
    };
};

const pokeDb = async (name) => {
    try{
        let pokemon = await Pokemon.findAll({
            include:{
                model: Type,
                attributes: ['name'],
                through:{
                    attributes: []
                },
            },
        });
        if(name){
            return pokemon.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        }else{
            return pokemon;
        };
    }catch(error){
        console.log(error);
    };
};

const getPokemons = async (req, res) => {
    try{
        const { name } = req.query;
        const pokemonsApi = await pokeApi(name);
        const pokemonsDb = await pokeDb(name);
        let pokemonDbAndApi = [];
        if(!pokemonsApi && name){
            pokemonDbAndApi = pokemonsDb;
        }else if(!pokemonsDb && name){
            pokemonDbAndApi = pokemonsApi;
        }else{
            pokemonDbAndApi = pokemonsDb.concat(pokemonsApi);
        };
        res.send(pokemonDbAndApi);
    }catch(error){
        console.log(error);
    };
};

const getPokemonById = async (req, res, next) => {
    try{
        const { id } = req.params;
        if(id.length < 5){
            let pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            let pokemonByIdApi = [{
                id: pokemonApi.data.id,
                name: pokemonApi.data.name,
                hp: pokemonApi.data.stats[0].base_stat,
                attack: pokemonApi.data.stats[1].base_stat,
                defense: pokemonApi.data.stats[2].base_stat,
                speed: pokemonApi.data.stats[5].base_stat,
                height: pokemonApi.data.height,
                weight: pokemonApi.data.weight,
                image: pokemonApi.data.sprites.versions['generation-v']['black-white'].front_default,
                Type: pokemonApi.data.types.map((e) => { return { name: e.type.name } }),
            }];
            res.send(pokemonByIdApi);
        }else{
            let pokemon = await Pokemon.findAll({
                include:{
                    model: Type,
                    attributes: ['name'],
                    through:{
                        attributes: []
                    },
                },
            });
            let pokemonIdDb = pokemon.filter(e => e.id === id);
            res.send(pokemonIdDb);
        };
        res.send(pokesearch);
    }catch(error){
        console.log(error);
    };
};

const createPokemon = async (req, res) => {
    try{
        const { name, hp, attack, defense, speed, height, weight, image, type } = req.body;
        const findPokemon = await Pokemon.findOne({ where: { name: name.toLowerCase() }, });
        if(findPokemon){
                res.send('Pokemon already exists');
            }else{
                let newPokemon = await Pokemon.create({
                name: name.toLowerCase(),
                image: image,
                hp: hp,
                attack: attack,
                defense: defense,
                speed: speed,
                height: height,
                weight: weight,
            });
            let pokemonType = await Type.findAll({
                where: {
                    name: type,
                },
            });
            await newPokemon.setTypes(pokemonType);
            res.send("Pokemon Created");
        };
    }catch(error){
        console.log(error);
    }
};

module.exports = {
    getPokemons,
    createPokemon,
    getPokemonById,
};