const cloudinary = require('cloudinary');
module.exports = {
  // Gets all reviews from all restaurants
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_reviews()
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error in retrieving all reviews', error))
  },

  //Gets all reviews for one specific restaurant of choice
  getRestaurantReviews: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params;
    console.log(id)
    db.get_restaurant_reviews([id])
    .then(reviews => {
      console.log(reviews)
      res.status(200).send(reviews)})
    .catch(error => console.log('Unexpected error in retrieving reviews for this restaurant', error))
  },
  post: (req, res) => {
    const db = req.app.get('db')
    console.log(req.body)
    const {ratings, description, user_id, review_photos} = req.body.reviewInput
    console.log(req.params)
    const {id} = req.params
    let date_posted = new Date();
    console.log(description, ratings, 'heyyyyyy')
    console.log('it was put in the databse', review_photos)
    db.create_reviews([ratings, description, date_posted, user_id, id])
    .then(res => db.add_review_photos([res[0].restaurant_id, res[0].user_id, review_photos, res[0].id]))
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error posting in posting review', error))
  },

  update: (req, res) => {
    const db = req.app.get('db')
    db.update_reviews([params.id, body.user_id, body.description, body.ratings, body.date_posted, body.restaurant_id])
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error in updating review', error))
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const {params} = req;
    db.delete_reviews([params.id])
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error in deleting review', error))
  },
  get_photos: (req, res) => {
    const timestamp = Math.round((new Date()).getTime() / 1000);

    const api_secret = process.env.CLOUDINARY_SECRET_API;

    const signature = cloudinary.utils.api_sign_request({timestamp: timestamp}, api_secret);

    const payload = {
      signature: signature,
      timestamp: timestamp
    };
    console.log(payload);
    res.send(payload);
  }
}
