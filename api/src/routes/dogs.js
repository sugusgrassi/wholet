const { Router } = require('express');
const { getAllDogs, dogById, addDog } = require('../controllers/dogs')
const router = Router();

router.get('/', getAllDogs)

router.get('/:id', dogById)

// router.get('/', (req, res) => {
//     console.log("llega")
//     res.send("Dogs")
// })

// router.post('/', addDog)


module.exports = router;