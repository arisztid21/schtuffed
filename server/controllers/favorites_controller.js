module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_favorites()
    .then(favorite => res.status(200).send(favorite))
    .catch(error => console.log('Unexpected error in retrieving favorites', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    db.create_favorites([user_id, restaurant])
    .then(favorite => res.status(200).send(favorite))
    .catch(error => console.log('Unexpected error in adding to favorites', error))
  }
}
