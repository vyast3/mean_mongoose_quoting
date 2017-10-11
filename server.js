
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();



app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var routes = require('./routes/route.js')(app);

mongoose.connect('mongodb://localhost/basic_mongoose');

var QuoteSchema = new mongoose.Schema({
 name: String,
 quote: String
} , {timestamps: true})
mongoose.model('quotes', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('quotes')




app.get('/',function(req,res){
         res.render('index');
     })

    app.post('/quotes', function(req, res) {
  
   var quoteSave = new Quote({name: req.body.name, quote: req.body.quote});
 
  quoteSave.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/quotes');
    }
  })
})

app.get('/quotes' ,function(req,res){

    Quote.find({}, function(err, results){
    if(err) { console.log(err); }
    else{
        console.log(results)
    res.render('quotes', { quotes: results });
    }
  });
})



app.listen(8000, function() {
    console.log("listening on port 8000");
})
