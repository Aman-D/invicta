const express = require('express');
const path = require('path');
const cors = require('cors');


const PORT = process.env.PORT || 3000;
const app = express();

const root = require('./routes/root')
const ca = require('./routes/ca');

app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', root);
app.use('/ca',ca);


 

app.listen(PORT, ()=>{
    console.log("server is running on" + PORT);
});