const { Router } = require('express');
const { getPokemons } = require('../Controller/PokemonController');

const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemons/:id');
router.post('pokemons')

module.exports = router;

