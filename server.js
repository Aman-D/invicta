const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req,res)=>{
    res.send('This is going to be awesome');
});

app.listen(PORT, ()=>{
    console.log("server is running");
});