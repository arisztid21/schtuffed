const cloudinary = require('cloudinary');
module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_reviews()
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error in retrieving reviews', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    const {ratings, description, user_id, restaurant_id, review_photos} = req.body;
    let date_posted = new Date();
    db.create_reviews([ratings, description, date_posted, user_id, restaurant_id])
    .then(res => db.add_review_photos([res[0].restaurant_id, res[0].user_id, review_photos, res[0].id]))
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error posting in posting review', error))
  },

  update: (req, res) => {
    const db = req.app.get('db')
    db.update_reviews([params.id, body.user_id, body.description, body.rating, body.date_posted, body.restaurant_id])
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error in updating review', error))
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const {params} = req;
    db.delete_reviews([params.id])
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error in deleting review', error))
  }
}
