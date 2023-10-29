//Impordime ja loome Expressi marsruuteri
const express = require('express');
const router = express.Router();

// Impordime artikli kontrolleri ja ekspordime selle selle faili kasutamiseks(articleController).
const articleController = require ('../Controllers/article');

// Määrame ruuteri, mis reageerib päringule, kui kasutaja külastab alamlehte '/'. See kasutab artikli kontrollerit ja käivitab funktsiooni "getAllArticles".
router.get('/', articleController.getAllArticles);

// Määrame marsruuteri, mis reageerib päringule, kui kasutaja külastab alamlehte '/article/:slug'. See kasutab artikli kontrollerit ja käivitab funktsiooni "getArticleBySlug".
router.get('/article/:slug', articleController.getArticleBySlug);
router.get('/create', articleController.showNewArticleForm);
router.post('/create', articleController.createNewArticle);
/*router.get('/edit/:id', articleController.getEditArticleForm);
router.post('/edit/:id', articleController.updateArticle);*/

// Ekspordime artikli ruuteri , et seda saaks kasutada rakenduse failis.
module.exports = router;