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
const shop = require('./controllers/shop_controller')

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
  console.log(response.data);

  const db = req.app.get('db');
  return db.get_user(auth0Id).then(users => {
    if(users.length) {
      console.log(users[0]);
      
      const user = users[0];
      req.session.user = user;
      res.redirect('/');
    } else {
      const userArray = [
        auth0Id,
        response.data.name,
        response.data.email,
        new Date(),
        response.data.picture
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
app.get('/users/:id/favorites', favorites.get)
app.post('/users/:id/favorites', favorites.post)

/* Followers Controller: followers for unique user. */
app.get('/users/followers/:id', followers.get)
app.post('/users/:id/followers', followers.post)

/* Products Controller: for functionality on shop and cart */
app.get('/shop', shop.get)

/* User Profile Controller: profile details for each user. */
app.get('/users/profiles/:id', profiles.get)

// User Profile Reviews: reviews displayed on profile page
app.get('/users/profiles/reviews/:id', profiles.getUserReviews)
/* Restaurant Profile Reviews: reviews displayed on restaurant page. */
app.get('/restaurants/reviews/:id', reviews.get)
app.get('/restaurants/profile/reviews/:id', reviews.getRestaurantReviews)
app.post('/restaurants/reviews/:id', reviews.post)
app.put('/restaurants/reviews/:id', reviews.update)
app.delete('/restaurants/reviews/:id', reviews.delete)

/* Testimonies: retrieves testimonies for the services */
app.get('/testimonies', testimonies.get)
app.post('/testimonies', testimonies.post)
app.put('/testimonies/:id', testimonies.update)
app.delete('/testimonies/:id', testimonies.delete)

/* Cloudinary: passes hashed secret api signature for cloudinary. */
app.get('/api/upload', reviews.get_photos)


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
