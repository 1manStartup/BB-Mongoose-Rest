var express = require('express'),
    routes = require('./routes'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kush1')
var Schema = mongoose.Schema;
var Dog = new Schema({
  name: String,
  articles: [{
    articlename: String,
  }]
 
});

var Dog = mongoose.model('Dog', Dog);
var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/moo', routes.index);

app.get('/', function(req, res){
  res.render('demoj17.jade', { 
    title: 'Post new itemview without Refresh'
  });
});

app.post('/api/makedog', function( request, response ) {
    var dog = new Dog({
    name: request.body.name
  });
dog.articles.push({articlename: 'My First Article'});
  dog.save({});
  return response.send( dog );
   });


app.get( '/api/makedog/:id', function( request, response ) {
  return Dog.findById( request.params.id, function( err, dog ) {


    if( !err ) {
      return response.send( dog );
    } else {
      return console.log( err );
    }
  });
});

app.put( '/api/makedog/:id', function( request, response ) {
  return Dog.findById( request.params.id, function( err, dog ) {
   // dog.articles.push({articlename: request.body.articlename});
dog.articles.push = request.body.articlename;
    return dog.save( function( err ) {
      if( !err ) {
        console.log( 'dog just updated' );
      } else {
        console.log( err );
      }
      return response.send( dog );
    });
  });
});


app.get('/api/makedog', function(req, res){
  Dog.find({}, function (err, docs) {
    res.send(docs);
  });
});


app.delete( '/api/makedog/:id', function( request, response ) {
    console.log( 'Deleting dog with id: ' + request.params.id );
    return Dog.findById( request.params.id, function( err, dog ) {
        return dog.remove( function( err ) {
            if( !err ) {
                console.log( 'Dog removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

console.log("worker is loaded");
var bob = app.listen(3700);
