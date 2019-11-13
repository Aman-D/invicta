const express = require('express');
const router = express.Router();
const conn = require('../db/db');
const bp = require('body-parser');

const { check, validationResult } = require('express-validator');

var urlencodedParser = bp.urlencoded({ extended: false });
//login
router.get('/login', (req,res)=>{
    res.render('login',{title:"Login",msg :""});
 
});


router.post('/login',urlencodedParser, async (req,res)=>{

    const {email,password} = req.body;
    
    let user_exists = "select exists ( select * from campus_ambassador where email = ? AND password = ? ) as exist";
    conn.query(user_exists,[email,password], (err,result)=>{
        if(err) throw err;
        if(result[0].exist === 1) res.send("welcome to the page");
        else{
            res.render('login',{title:'loign', msg:"Either email or password is incorrect"});
        }
    });

    
});


//register
router.get('/register', (req,res)=>{
    res.render('register',{title:"Register",msg:""});
});

router.post('/register',urlencodedParser,
[   check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('phone').isLength({min:10})  ],
    async (req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).render('register',{title : 'Register', msg:"Enter correct detials"});
          }
        const {firstname,lastname,email,college,year,programme,phone,password,refral} = req.body;
    
    


    //check if email already exists
    let email_exists = "select exists ( select * from campus_ambassador where email = ? ) as email_exist";
    conn.query(email_exists,[email],(err,result)=>{
        if(err) throw err;
        console.log(result[0]);
        if(result[0].email_exist === 1) res.render("register",{title:"Register",msg:"Email is already registered with us"});
    })

    if(refral){
        let search_refral =  "select email from campus_ambassador where refral =  '"+req.body.refral+"' ";
        conn.query(search_refral, (err,result)=>{
            if(err) throw err;
            if(typeof result[0] === 'undefined'){
                console.log("No refral");
            }else{
             
                let inc_points ="UPDATE campus_ambassador SET points = points + 10 WHERE email = '"+result[0].email+"'";
                conn.query(inc_points, (err,result)=>{
                    if(err) throw err;
                    console.log("refral");
                });
            }
        });
    }

    let refral_code = Math.floor(Math.random() * Math.floor(999));


    //query to insert into databse
    let sql = "insert into campus_ambassador (firstname,lastname,email,college,year,programme,phone,password,refral) values ('"+ firstname+"','"+lastname+"','"+email+"','"+college+"','"+year+"','"+programme+"','"+phone+"','"+password+"','"+firstname+refral_code+"')";

    conn.query(sql, (err,result)=>{
        if(err) throw err;
        res.set({'Content-Type': 'text/html',}).status(200).send("Welcome to the page");
    });

});

//profile
router.get('/profile', (req,res)=>{

});



module.exports = router;