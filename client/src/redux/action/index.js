import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function getPokemons() {
  return async function (dispatch) {
    let json = await axios.get(REACT_APP_API_URL + "pokemons");
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

function getTypes() {
  return async function (dispatch) {
    let json = await axios.get(REACT_APP_API_URL + "types");
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}

function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(REACT_APP_API_URL + "pokemons?name=" + name);
      return dispatch({
        type: "GET_BY_NAME",
        payload: json.data,
      });
    } catch {
      console.log("Pokemon Not Found");
    }
  };
}

function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(REACT_APP_API_URL + "pokemons/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch {
      console.log("Pokemon not found");
    }
  };
}

function orderByName(payload) {
  return {
    type: "ORDER_POKEMONS",
    payload,
  };
}

function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

function filterByState(payload) {
  return {
    type: "FILTER_BY_STATE",
    payload,
  };
}

function createPokemon(payload) {
  return async function (dispatch) {
    await axios.post(REACT_APP_API_URL + "pokemons", payload);
  };
}

function cleanMyStore() {
  return {
    type: "CLEAN_STORE",
  };
}

export {
  getPokemons,
  getTypes,
  getNamePokemon,
  getDetail,
  orderByName,
  filterByType,
  filterByState,
  createPokemon,
  cleanMyStore,
};
