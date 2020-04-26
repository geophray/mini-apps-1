var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/miniapp3', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('MongoDB connection successful!');
// });

var orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: Number,
  creditCard: Number,
  exp: String,
  cvv: Number,
  billingZip: Number
});

var Order = mongoose.model('Order', orderSchema);

// ==================================== Create new order
var create = (userinfo, callback) => {
  // console.log('Inside db.create => ', userinfo);
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