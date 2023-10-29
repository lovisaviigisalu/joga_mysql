//db ühendus
const con = require('../utils/db')
const Author = require('./author.model')
const Article = function(article){
    this.name = article.name
    this.slug = article.slug
    this.image = article.image
    this.body = article.body
    this.published = article.published
    this.author_id = article.author_id
}
//saame koik artiklid
Article.getAll = (result)=>{
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, res) =>{
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        articles = res
        console.log("articles: ", articles);
        result(null, articles)
    })
};
//saame artikli slugi järgi
Article.getBySlug = (slug, result) => {
    let query = `SELECT article.*, author.name as authorName from article inner join author on article.author_id = author.id where slug ="${slug}"`
    let article
    con.query(query, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
    if(res.length){
        //saame kasutada res[0], sest kui andmetega on kõik fine, siis on esimene saadud vastus õige
        console.log("found article: ", res[0]);
        result(null, res[0]);
    }
})
};
Article.createNew = (newArticle, result) => {
        let query = `INSERT INTO article 
    (name, slug, image, body, published, author_id) 
    VALUES 
    ("${newArticle.name}", "${newArticle.slug}", "${newArticle.image}", 
    "${newArticle.body}", "${newArticle.published}", "${newArticle.author_id}")`;

        con.query(query, (err, res) => {
            if (err) {
                console.error('Error creating a new article:', err);
                result(err, null);
                return;
            }
            console.log('Created article:', { id: res.insertId, ...newArticle });
            result(null, { id: res.insertId, ...newArticle });
        });
    };



module.exports = Article;