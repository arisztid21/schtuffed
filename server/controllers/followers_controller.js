module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_followers()
    .then(follower => res.status(200).send(follower))
    .catch(error => console.log('Unexpected error in retrieving followers', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    db.create_followers([user_id, friends_id])
    .then(follower => res.status(200).send(follower))
    .catch(error => console.log('Unexpected error in adding followers', error))
  }
}
