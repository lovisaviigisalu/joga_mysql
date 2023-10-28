//rakenduse paketid
const  express = require ('express'); //lisame Expressi raamistiku
const app = express() //loome Expressi rakenduse

const path = require ('path')

//lisame mallimootori
const hbs = require("express-handlebars");

// Seadistame mallimootori kataloogi ja faililaiendid
app.set ('views', path.join(__dirname, 'views')); // Määrame mallide asukoha
app.set('view engine', 'hbs'); //Määrame vaadete kasutatava mallimootori (hbs)

//Seadistame Handlebarsi mallimootori
app.engine('hbs', hbs.engine({
    extname: 'hbs',// Määrab mallilaiendi
    defaultLayout: 'main',// Vaikimisi üldine paigutus
    layoutsDir: __dirname + '/views/layouts/',// Paigutuste kataloogi asukoht
}))


app.use(express.static('public'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const articleRoutes = require('./routes/article');

app.use('/', articleRoutes);
app.use('/article', articleRoutes)


//kui vajutada autori peale, siis tuleb ette selle autori artiklid
app.get('/author/:author_id', (req, res) => {

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

            //Renderdab autori malli andmetega
            res.render('author', {
                author: author,
                articles: articles
            });
        });
    });
});
app.listen(3000, () => {
    console.log(`App is started at http://localhost:3000`)
})