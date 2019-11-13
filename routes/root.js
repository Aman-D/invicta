const express = require('express');
const router = express.Router();
const con = require('../db/db');
const bp = require('body-parser');
const alert = require ('alert-node');

var urlencodedParser = bp.urlencoded({ extended: false });

router.get('/', (req,res)=>{
    //    res.sendFile(path.join(__dirname, "public","index.html"));
        res.render('homepage.ejs',{title: "invicta20"});
    
    });
    
    
router.post('/', urlencodedParser,function (req, res) {
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        //checking if user already exists
        let sql = "select count(email) as count from  notification where email =  '"+req.body.email+"' ";

        con.query(sql,(err,result)=>{
            if(err) {console.log(err)}
            else if(JSON.stringify(result[0].count) === '1'){

                alert("This email is already registered with us:)", 'window');
                res.redirect('/');

            }
            else{
                
                //if not then enter it to the databse
               let sql2 = "insert into notification (date_created, email) values ('"+ date +"' ,'"+ req.body.email +"')";
               
               con.query(sql2,(err,result)=>{
               if(err) {console.log(err)};
               res.render('about.ejs',{title: "invicta20"});
           });
           }
        });
       

        
       
      });


router.get('/admin/admin_panel/:option',(req,res)=>{

    if(req.params.option === 'ca'){
        con.query('select * from campus_ambassador order by firstname',(err,result)=>{
            if(err) throw err;
            
            res.render('admin_panel',{title:"User data",user: result});
        })
    }
    console.log(req.params.option);
});

router.get('/admin', (req,res)=>{
 
    res.render('admin',
    {
        title:"Admin",
      
    });
});

module.exports = router;