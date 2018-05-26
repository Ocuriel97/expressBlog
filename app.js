var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
methodOverride = require('method-override')
app = express()

mongoose.connect('mongodb://localhost/blog')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

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
  res.redirect('/blogs')
})

//INDEX ROUTE
app.get('/blogs', function(req, res){
  Blog.find({}, function(err, blogs){
    if (err) {
      console.log('ERROR')
    } else {
      res.render('index', {blogs: blogs})
    }
  })
})

//NEW ROUTE
app.get('/blogs/new', function(req,res){
  res.render('new')
})

//CREATE ROUTE
app.post('/blogs', function(req,res){
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.render('new')
    }else{
      res.redirect('/blogs')
    }
  })
})

//SHOW ROUTE
app.get('/blogs/:id', function(req,res){
  Blog.findById(req.params.id,function(err,blog){
    if(err){
      res.redirect('/blogs')
    }else{
      res.render('show', {blog: blog})
    }
  })
})

//EDIT ROUTE
app.get('/blogs/:id/edit',function(req,res){
  Blog.findById(req.params.id, function(err,blog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('edit', {blog: blog})
    }
  })
})

//UPDATE ROUTE
app.put('/blogs/:id', function(req,res){
  Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
    if (err) {
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs/'+req.params.id)
    }
  })
})

app.listen(3000, function(){
  console.log('server running')
})
