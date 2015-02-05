/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , exphbs = require('express-handlebars')
  , bodyparser = require('body-parser')
  , http = require('http').Server(app)
  , io = require('socket.io')(http)


 var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
// app.set('view engine', 'jade')
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))
app.use(bodyparser.urlencoded({extended: false}));

// app.get('/', function (req, res) {
//   res.render('dice',
//   { title : 'dice!',
//    post: req.body.str}
//   )
// })
app.get('/', function (req, res) {
  res.render('dice.handlebars');
})

// app.post('/', function(req, res) {
//   var post_array = req.body
//   res.render('dice',
//     { title: 'nice rollin',
//     post: calculateRoll(post_array.sides, post_array.how_many)})
// })

app.post('/', function(req, res) {
  res.render('dice.handlebars', {result: calculateRoll(req.body.sides, req.body.how_many)});
})

io.on('connection', function(socket){
  socket.on('dice roll', function(msg){
    io.emit('dice roll', msg);
  });
});

function calculateRoll(sides, how_many){
  var total = 0;
  for (i = 0; i < how_many; i++){
    var rand = Math.floor((Math.random() * sides) + 1);
    total += rand;
    console.log(rand);
  }
  return total;
}

// exphbs.registerHelper("post", function(fn, req){
//   var post_array = req.body; 
//   $('div').html(fn(this))

//   return calculateRoll(post_array.sides, post_array.how_many);
// })

app.listen(3000)

console.log('listening on 3000')