module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    const {params} = req;
    db.get_profiles([params.id])
    .then(profile => res.status(200).send(profile))
    .catch(error => console.log('Unexpected error in retrieving profile', error))
  },
  getUserReviews: (req, res) => {
    const db = req.app.get('db');
    console.log(req.params)
    db.get_profile_reviews(req.params.id)
      .then(userReviews => {
        console.log(userReviews)
        res.status(200).send(userReviews)
      })
      .catch(err => console.log('Err in getUserReviews', err));
  },
  post: (req, res) => {
    const db = req.app.get('db')
    db.create_profiles([name, join_date, followers, reviews, photos, saved_restaurants])
    .then(profile => res.status(200).send(profile))
    .catch(error => console.log('Unexpected error in creating profile', error))
  },

  update: (req, res) => {
    const db = req.app.get('db')
    db.update_profiles([params.id, body.name, body.join_date, body.followers, body.reviews, body.photos, body.saved_restaurants])
    .then(profile => res.status(200).send(profile))
    .catch(error => console.log('Unexpected error in updating profile', error))
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const {params} = req;
    db.delete_profiles([params.id])
    .then(profile => res.status(200).send(profile))
    .catch(error => console.log('Unexpected error in deleting profile', error))
  }
}
