const googleIt = require('google-it')
var express = require('express');
var logger = require('morgan');
const port = 5000;
var path = require('path');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async function(req, res, next) {
  res.render( 'searchbar' );
});

app.post('/search', async function(req, res, next) {

  queryvar = req.body.query
  googleIt({'query': queryvar}).then(results => {
    res.redirect(results[0].link);
  }).catch(e => {
    res.send(e)
  })
});

app.post('/searchsecond', async function(req, res, next) {

  queryvar = req.body.query
  googleIt({'query': queryvar}).then(results => {
    res.redirect(results[1].link);
  }).catch(e => {
    res.send(e)
  })
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening at http://localhost:${port}`)
})