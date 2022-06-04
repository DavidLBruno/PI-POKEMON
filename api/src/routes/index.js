const { Router } = require('express');
const Pokemon = require('./Pokemon')
const Type = require('./Type');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', Pokemon);
router.use('/', Type);


module.exports = router;
