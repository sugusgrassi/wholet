const { Router } = require('express');
const { getTemperament } = require('../controllers/temperament')

const router = Router();

router.get('/', getTemperament)


module.exports = router;