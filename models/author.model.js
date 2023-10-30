const con = require('../utils/db');

const Author = (author) => {
    this.author_id = author.id;
    this.author_name = author.author_name;
};

Author.getAuthor = (author_id, result) => {
    //sqli päringud
    let authorQuery = 'SELECT id AS author_id, name AS author_name FROM author WHERE id = ?';
    let articleQuery = 'SELECT article.name AS article_name, article.slug, article.image FROM article JOIN author ON article.author_id = author.id WHERE author.id = ?';

    let articles = [];

    con.query(authorQuery, [author_id], (err, authorResult) => {
        if (err) {
            console.log("Error in Author.getAuthor: ", err);
            result(err, null);
            return;
        }

        let author = authorResult[0];

        con.query(articleQuery, [author_id], (err, articlesResult) => {
            if (err) {
                console.log("Error in Author.getAuthor: ", err);
                result(err, null);
                return;
            }

            articles = articlesResult;
            const authorData = {
                author_id: author.author_id,
                author_name: author.author_name,
                articles: articles,
            };
            console.log("Author.getAuthor returned the following data: ", authorData);
            result(null, authorData);
        });
    });
};

module.exports = Author;
