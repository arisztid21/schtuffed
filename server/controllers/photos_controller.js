module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_photos()
    .then(photo => res.status(200).send(photo))
    .catch(error => console.log('Unexpected error in retrieving photos', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    db.create_photos([restaurant_id, user_id, review_id, review_photos, user_photos])
    .then(photo => res.status(200).send(photo))
    .catch(error => console.log('Unexpected error in creating photos', error))
  },

  update: (req, res) => {
    const db = req.app.get('db')
    db.update_reviews([params.id, body.restaurant_id, body.user_id, body.review_id, body.review_photos, body.user_photos])
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const {params} = req;
    db.delete_photos([params.id])
    .then(photo => res.status(200).send(photo))
    .catch(error => console.log('Unexpected error in retrieving photos', error))
  }
}
