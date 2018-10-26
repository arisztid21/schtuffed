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
      // .reduce((a, b, c) => {
      //  return c = a + b
      // })
      req.session.user.total += req.body.item_price
      console.log('req.session.user.cart', req.session.user.cart)
    }else {
      req.session.user.cart[cart].quantity += 1
      req.session.user.total += req.body.item_price
    }

    console.log('cart', cart)
    console.log('the shit we are working on rn', req.body)
    console.log('req.session.user.cart', req.session.user.cart, req.session.user.total)
    res.json(req.session.user.cart);
  },
  checkOut: (req, res) => {
    const db = req.app.get('db')
    let date = new Date()
    db.cart_checkout([+req.session.user.id, JSON.stringify(req.session.user.cart), req.session.user.total, date])
    .then(() => console.log('you checked out'))
    .catch(error => console.log('error adding item to cart in shop controller', error))
  },
  userCart: (req, res) => {
    res.json(req.session.user)
  },
  minus: (req, res) => {
    let cart = req.session.user.cart.findIndex((item) => {
      return item.id === req.body.id
     })
     if(cart !== -1){
      req.session.user.cart[cart].quantity -= 1
      if(req.session.user.cart[cart].quantity === 0){
        req.session.user.cart.splice([cart], 1)
      }
      req.session.user.total -= req.body.item_price
      console.log('req.session.user.cart', req.session.user.cart)
    }
    res.send(req.session.user)
  }
}
