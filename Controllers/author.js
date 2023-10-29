
const Author = require('../models/author.model');
const authors = (req, res) => {
    const authorId = req.params.author_id;

    Author.getAuthor(authorId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred retrieving articles data',
            });
        } else {
            //väljastab siin artikli
            res.render('author', {
                author_name: data.author_name,
                articles: data.articles,
            });
        }
    });
};

module.exports = {
    authors,
};
