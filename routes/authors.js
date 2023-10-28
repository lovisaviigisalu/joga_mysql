//Impordime ja loome Expressi marsruuteri
const express = require('express');
const router = express.Router();

// Impordime artikli kontrolleri ja ekspordime selle selle faili kasutamiseks.
const AuthorController = require('../Controllers/author');

//Määrame ruuteri, mis reageerib päringule, kui kasutaja külastab alamlehte '/'. See kasutab artikli kontrollerit ja käivitab funktsiooni "authors".
router.get('/:author_id', AuthorController.authors);

//expordib selle
module.exports = router;