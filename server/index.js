/* Establish Server */
require('dotenv').config()
const session = require('express-session')
const massive = require('massive')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const cloudinary = require('cloudinary');

/* Requiring Controllers */
const auth_controller = require('./controllers/auth_controller')
const profiles = require('./controllers/profiles_controller')
const reviews = require('./controllers/reviews_controller')
const testimonies = require('./controllers/testimonies_controller')
const favorites = require('./controllers/favorites_controller')
const followers = require('./controllers/followers_controller')
const photos = require('./controllers/photos_controller')

app.use(bodyParser.json())
app.use( express.static( `${__dirname}/../build` ) )

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}))

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
    console.log('Database is kickin')
}).catch(error => console.log(error, 'Unexpected error connecting to database'))

app.get('/auth/callback', (req, res) => {
  console.log('herro')
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };

function tradeCodeForAccessToken() {
  console.log('trade code for access token')
  return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
  }

function tradeAccessTokenForUserInfo(accessTokenResponse) {
  console.log('trade access token for admin')
  const accessToken = accessTokenResponse.data.access_token;
  return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
  }

function storeUserInfoDatabase (response) {
  console.log('store user info db')
  const auth0Id = response.data.sub;
  const db = req.app.get('db');
  return db.get_user(auth0Id).then(users => {
    if(users.length) {
      const user = users[0];
      req.session.user = user;
      res.redirect('/');
    } else {
      const userArray = [
        auth0Id,
        response.data.name,
        response.data.email,
        new Date()
      ];
      return db.create_user(userArray).then(newUser => {
      req.session.user = newUser[0];
      res.redirect('/');
      }).catch(error => {
        console.log('error in db.get_user', error);
        res.status(500).send('Unexpected error');
      })
    }
  }).catch(error => {
    console.log('error in db.get_user', error);
    res.status(500).send('Unexpected error');
  })
}

tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoDatabase)
    .catch(error => {
      console.log('Server error', error)
      res.status(500).send('An error occurred on the server. Check terminal')
    });
});

/* Favorite Controller: favorite restaurants for each user. */
app.get('/users/favorites/:id', favorites.get)
app.post('/users/favorites', favorites.post)

/* Followers Controller: followers for unique user. */
app.get('/users/followers/:id', followers.get)
app.post('/users/followers', followers.post)

/* User Photos Controller: photos for unique user */
app.get('/users/photos/:id', photos.get)
app.post('/users/photos', photos.post)
app.put('/users/photos/:id', photos.update)
app.delete('/users/photos/:id', photos.delete)

/* Restaurant Photos Controller: photos for unique restaurant */
app.get('/restaurants/photos/:id', photos.get)
app.post('/restaurants/photos', photos.post)
app.put('/restaurants/photos/:id', photos.update)
app.delete('/restaurants/photos/:id', photos.delete)

/* User Profile Controller: profile page for each user. */
app.get('/users/profiles/:id', profiles.get)
app.post('/users/profiles', profiles.post)
app.put('/users/profiles/:id', profiles.update)
app.delete('/users/profiles/:id', profiles.delete)

/* Restaurant Profile Reviews: reviews displayed on restaurant page. */
app.get('/restaurants/reviews', reviews.get)
app.post('/restaurants/reviews', reviews.post)
app.put('/restaurants/reviews/:id', reviews.update)
app.delete('/restaurants/reviews/:id', reviews.delete)

/* Testimonies: retrieves testimonies for the services */
app.get('/testimonies', testimonies.get)
app.post('/testimonies', testimonies.post)
app.put('/testimonies/:id', testimonies.update)
app.delete('/testimonies/:id', testimonies.delete)

app.get('/api/user-data', (req, res) => {
  res.json(req.session.user);
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

const path = require('path')
app.get('*', (req, res)=>{
 res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4000;
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
