module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_products()
    .then(product => res.status(200).send(product))
    .catch(error => console.log('error getting item in shop controller', error))
  },
  add: (req, res) => {
    let cart = req.session.user.cart.findIndex((item) => {
     return item.id === req.body.id
    })
    if(cart === -1){
      req.session.user.cart.push(req.body)
    }else {
      req.session.user.cart[cart].quantity += 1
    }
    console.log('JSON.stringify(req.session.user.cart)', JSON.stringify(req.session.user.cart))
    console.log('cart', cart)
    console.log(req.body)
    console.log('req.session.user.cart', req.session.user.cart)
    res.json(req.session.user.cart);
  },
  checkOut: (req, res) => {
    const db = req.app.get('db')
    db.cart_checkout([+req.session.user.id, JSON.stringify(req.session.user.cart)])
    .then(() => console.log('worked'))
    .catch(error => console.log('error adding item to cart in shop controller', error))
  },
  userCart: (req, res) => {
    const db = req.app.get('db')
    db.get_user_cart([+req.session.user.id, JSON.stringify(req.session.user.cart)])
    .then(() => console.log('worked'))
    .catch(error => console.log('error adding item to cart in shop controller', error))
  },
  delete: (req, res) => {
    db.delete_item([])
    .then(cart => res.status(200).send(cart))
    .catch(error => console.log('error deleting item from cart in shop controller', error))
  }
}
