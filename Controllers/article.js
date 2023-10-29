//ta saab selle, mis ta tegema peab controlleri kaustast
const Article = require('../models/article.model')
const getAllArticles = (req,res)=> {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).sent({
                message : err.message || 'Some error occured retrieving articles data'
            })
        }else {
            console.log(data)
            res.render('index', {
                articles:data
            })
        }
    })
};


//kuvab sellele artikli sisu
const getArticleBySlug = (req, res) =>{
    Article.getBySlug(req.params.slug, (err, data) =>{
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occured retrieving article data'
            })
        }else{
            console.log(data)
            res.render('article', {
                article: data
            })
        }
    })
}
//create new article
const createNewArticle = (req, res) => {
    // New article from POST data (example from form)
    console.log('Creating a new article');

    const newArticle = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id,
    };

    Article.createNew(newArticle, (err, data) => {
        if (err) {
            console.error('Error creating a new article:', err);
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the article',
            });
        } else {
            console.log('Created article:', data);
            res.redirect('/'); // Assuming you want to redirect to the newly created article's page
        }
    });
};
//naita artikli formi
const showNewArticleForm = (req, res) =>{
    res.render('create_article')
}
/*const getEditArticleForm = (req, res) => {
    const articleId = req.params.id;

}
const updateArticle = (req, res) =>{

}*/
module.exports = {
    getAllArticles,
    getArticleBySlug,
    createNewArticle,
    showNewArticleForm,
    /*getEditArticleForm,
    updateArticle*/
}