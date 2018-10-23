module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    console.log('GET_FOLLOWERS ==========>',req.params);
    
    db.get_followers(req.params.id)
    .then(followers => {
      console.log('FOLLOWERS ===========>',followers);
      res.status(200).send(followers)
      
    })
    .catch(error => console.log('Unexpected error in retrieving followers', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    let { id } = req.params;
    let { follower_id } = req.body
    db.create_follower([id, follower_id])
    .then(follower => res.status(200).send(follower))
    .catch(error => console.log('Unexpected error in adding followers', error))
  }
}
