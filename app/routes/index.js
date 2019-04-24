const express = require('express')
const { root } = require('../controllers/root')
const { draw } = require('../controllers/draw')
const { notFound } = require('../controllers/notfound')

const router = express.Router()

// Routes
router.get('/', root)

router.post('/draw', draw)

// Fall Through Route
router.use(notFound)

module.exports = router