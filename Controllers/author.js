
const con = require('../utils/db');

//kui vajutada autori peale, siis tuleb ette selle autori artiklid
const authors = (req, res) => {

    let authorId = req.params.author_id;
    //SQL-päring autorite andmete leidmiseks
    let authorQuery = `SELECT * FROM author WHERE id=${authorId}`;
    //SQL-päring autoriga seotud artikle leidmiseks
    let articlesQuery = `SELECT * FROM article WHERE author_id=${authorId}`;

    let author;
    let articles;
    //Päring autorite andmete leidmiseks
    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err;
        //Salvestab autorite andmed
        author = authorResult[0];
        //Päring autoriga seotud artiklite leidmiseks
        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err;
            //Salvestab artiklite andmed
            articles = articlesResult;

            //Renderdab auori malli andmetega
            res.render('author', {
                author: author,
                articles: articles
            });
        });
    });
};
module.exports = {
    authors
};