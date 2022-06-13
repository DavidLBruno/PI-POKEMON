import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        });
    };
};

export function getTypes(){

};

export function getNamePokemon(name){
    return async function(dispatch){
        try{
            let json = await axios.get('http://localhost:3001/pokemons?name=' + name);
            return dispatch({
                type: 'GET_BY_NAME',
                payload: json.data
            });
        }catch(error){
            console.log(error);
        };
    };
};

export function orderByName(payload){
    return{
        type: 'ORDER_POKEMONS',
        payload
    };
};