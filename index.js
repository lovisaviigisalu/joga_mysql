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

// Lisame MySQL andmebaasiga ühenduse loomiseks paketi
const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))


//db osad
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
})
//kui yhendus on andmebaasiga
con.connect(function (err){
    if (err) throw err;
    console.log("Connected to joga_mysql db");
})

//kuvab pildid
app.get('/',(req,res)=> {
    let query = "SELECT*FROM article";
    let articles = []
    con.query(query,(err, result) => {
        if (err) throw err;
        articles = result
        res.render('index',{
            articles:articles
        })
    })
});
app.get('/article/:slug',(req, res) =>{
    let query =`SELECT * FROM article WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article:article
        })
    })
})
app.listen(3000, () => {
    console.log(`App is started at http://localhost:3000`)
})