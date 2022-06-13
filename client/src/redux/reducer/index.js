const initialState = {
    pokemon : [],
    pokemonFiltered : [],
    pokemonDetail : [],
    types : [],
};

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemon: action.payload,
                pokemonFiltered: action.payload,
            }
        case 'GET_BY_NAME':
            return {
                ...state,
                pokemon: action.payload,
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            }
        case 'ORDER_POKEMONS':
            if(action.payload === 'asc'){
            state.pokemonFiltered.sort(function(a, b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            })
        }else if(action.payload === 'des'){
            state.pokemonFiltered.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
            })
        }else if(action.payload === 'weakness'){
            state.pokemonFiltered.sort(function(a, b){
                if(a.attack  > b.attack ){
                    return 1;
                }
                if(b.attack  > a.attack ){
                    return -1;
                }
                return 0;
            })
        }else if(action.payload === 'stronger'){
            state.pokemonFiltered.sort(function(a, b){
                if(a.attack  > b.attack ){
                    return -1;
                }
                if(b.attack  > a.attack){
                    return 1;
                }
            })
        }else{
            return{
                ...state,
                pokemonFiltered: state.pokemonFiltered
            }
        }
        default:
            return state;
    };
};

export default rootReducer;