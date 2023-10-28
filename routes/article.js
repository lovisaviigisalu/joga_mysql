//Impordime ja loome Expressi marsruuteri
const express = require('express');
const router = express.Router();

// Impordime artikli kontrolleri ja ekspordime selle selle faili kasutamiseks.
const articleController = require ('../Controllers/article');

// Määrame ruuteri, mis reageerib päringule, kui kasutaja külastab alamlehte '/'. See kasutab artikli kontrollerit ja käivitab funktsiooni "getAllArticles".
router.get('/', articleController.getAllArticles);

// Määrame marsruuteri, mis reageerib päringule, kui kasutaja külastab alamlehte '/article/:slug'. See kasutab artikli kontrollerit ja käivitab funktsiooni "getArticleBySlug".
router.get('/article/:slug', articleController.getArticleBySlug);



// Ekspordime artikli ruuteri , et seda saaks kasutada rakenduse failis.
module.exports = router;