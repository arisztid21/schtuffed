module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_products()
    .then(product => res.status(200).send(product))
    .catch(error => console.log('Unexpected error in retrieving photos', error))
  }
}
