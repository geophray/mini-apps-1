var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/miniapp3', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('MongoDB connection successful!');
});

var orderSchema = new mongoose.Schema({
  username: String,
  useremail: String,
  phone: String,
  shippingAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zipcode: Number
  },
  billing: {
    creditcard: Number,
    exp: String,
    cvv: Number,
    zipcode: Number
  }
});

var Order = mongoose.model('Order', orderSchema);

// ==================================== Create new order
var create = (userinfo, callback) => {

  var order = new Order(userinfo);
  order.save((err, order) => {
    callback(err, order);
  });

}


// ==================================== Find by id and update
var updateOrder = (userinfo, callback) => {
  Order.findByIdAndUpdate(userinfo._id, userinfo, (err, order) => {
    callback(err, order);
  });
}


// ===================================== Find all orders
// Order.find((err, orders) => {
//   if (err) return console.error(err);
//   console.log(orders);
// });


module.exports.create = create;
module.exports.updateOrder = updateOrder;