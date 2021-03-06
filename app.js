var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var dotenv = require('dotenv');


app.use(cookieParser());
var auth = require('./controllers/user');
var {requireSignin ,renderHome, createBlog, showSingleBlog, showYourBlog, deletePost, updateBlog,updateBlogget} = require('./controllers/blog')


app.set('view engine', 'ejs');
app.use('/views', express.static('views'))
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true }).then(() => {console.log('Database Connected')});

app.get('/',requireSignin,renderHome);

app.get('/signup', function(req,res){
    var popup = {confPass:false,duplicateUser:false}
    res.render('signup',{popup:popup});   
})

app.get('/login', function(req,res){
    var popup1 = {incorrectuser:false,incorrectpassword:false}
    res.render('login',{popup1:popup1});   
})

app.get('/createBlog', function(req,res){
    let blogs = {firstname:req.cookies.firstname};
    res.render('createBlog',{blogs:blogs});
})

app.get("/blog/:id",showSingleBlog);
app.get("/showOwn",showYourBlog);

app.get('/blog/:id/update',updateBlogget);


app.post('/signup', auth.signup);
app.post('/login', auth.signin);
app.post('/signout',auth.signout);
app.post('/createBLog',createBlog);
app.post('/blog/:id/delete',deletePost);
app.post('/blog/:id/update',updateBlog);


app.listen(process.env.PORT, function(){
    console.log('Successful');
})
