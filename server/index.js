require('dotenv').config();
const session = require('express-session');
const massive = require('massive');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    // console.log('database is live!!', db);
})




const PORT = 4000;
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));