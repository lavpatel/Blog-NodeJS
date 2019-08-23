var Model= require('../model/user');


exports.signup = function(req, res){
  Model.findOne({username:req.body.user.username},function(err,user){    
    console.log(user);
    if(user === null){
      Model.create(req.body.user,function(err,newuser){
        if(!err){
          console.log('Successful');
          res.redirect('/login');
        }else{
          console.log(err);
        }
      })
    }else{
      console.log("Already have an account. Please go to login page");
      var popup = {show:true}
      res.render('signup',{popup:popup})
    }
  });
}

exports.signin = function(req,res){
    console.log(req.body);

    Model.findOne({username:req.body.username},function(err,user){
        if(user == null){          
          console.log('No Such User');
          var popup1 = {incorrectuser:true}
          res.render('login',{popup1:popup1});
        }else{
          //console.log(user);
          if(user.password == req.body.password){
            res.cookie('id',user._id);
            res.redirect('/');
          }else{
            console.log('Incorrect Password');
            var popup1 = {incorrectpassword:true}
            res.render('login',{popup1:popup1});
          }
        }
    })
}

exports.signout = function(req,res){
  res.clearCookie("id");
  res.redirect('/login');
}