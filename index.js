//rakenduse paketid
const  express = require ('express'); //lisame Expressi raamistiku
const app = express() //loome Expressi rakenduse

const path = require ('path')

//lisame mallimootori
const hbs = require("express-handlebars");
app.use(express.urlencoded({extended: true}))
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
const AuthorRoutes = require('./routes/authors');

app.use('/', articleRoutes);
app.use('/article', articleRoutes);


app.use('/author', AuthorRoutes);

app.listen(3000, () => {
    console.log(`App is started at http://localhost:3000`)
})