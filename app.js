var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose')
app = express()

mongoose.connect('mongodb://localhost/blog')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})

var Blog = mongoose.model('Blog', blogSchema)

// Blog.create({
//   title: 'Test blog',
//   image: 'https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/16q2/667349/2016-bmw-m2-automatic-test-review-car-and-driver-photo-668454-s-original.jpg',
//   body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
// })

app.get('/', function(req,res){
  res.redirect('index')
})

app.get('/blogs', function(req, res){
  Blog.find({}, function(err, blogs){
    if (err) {
      console.log('ERROR')
    } else {
      res.render('index', {blogs: blogs})
    }
  })
})


app.listen(3000, function(){
  console.log('server running')
})
