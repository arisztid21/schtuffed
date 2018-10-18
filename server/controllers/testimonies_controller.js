module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_testimonies()
    .then(item => res.status(200).send(item))
    .catch(error => console.log('Unexpected error retrieving testimonies', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    const {user_id, title, description, rating} = req.body
    let date_posted = new Date();
    console.log(req.body)
    db.create_testimonies([user_id, title, description, rating, date_posted])
    .then(item => res.status(200).send(item))
    .catch(error => console.log('Unexpected error posting testimony', error))
  },

  update: (req, res) => {
    const db = req.app.get('db')
    db.update_testimonies([params.id, body.title, body.description, body.rating])
    .then(item => res.status(200).send(item))
    .catch(error => console.log('Unexpected error updating testimony', error))
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const { params } = req;
    db.delete_testimonies([params.id])
    .then(item => res.status(200).send(item))
    .catch(error => console.log('Unexpected error deleting testimony', error))
  }
}
