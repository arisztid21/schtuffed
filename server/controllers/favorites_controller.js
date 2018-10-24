module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    console.log("REQ.BODY ============>",req.params);
    db.get_favorites(req.params.id)
    .then(favorites => {
      console.log(favorites);
      res.status(200).send(favorites)
    })
    .catch(error => console.log('Unexpected error in retrieving favorites', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    // console.log("REQ.BODY ============>",req.body);
    // console.log("REQ.PARAMS ============>",req.params);
    let { id, name, location, cuisines, price_range, thumb, user_rating } = req.body
    let { params } = req;
    let restaurant = {id, name, location, cuisines, price_range, thumb, user_rating}
    db.create_favorites([restaurant, params.id])
    .then(favorite => res.status(200))
    .catch(error => console.log('Unexpected error in adding to favorites', error))
  }
}
