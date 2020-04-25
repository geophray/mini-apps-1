var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/miniapp3', {useNewUrlParser: true, useUnifiedTopology: true});

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
// var order = new Order({username: 'Jeff'});
// order.save((err, order) => {
//   if (err) {
//     return console.error(err);
//   }
// });


// ==================================== Find by id and update
// Order.findByIdAndUpdate('5ea4a9b4f4c77e7bf93c7b2c', { username: 'Kallie', useremail: 'kallie.maughan@gmail.com' }, (err, doc) => {
//   if (err) console.error(err);
//   console.log(doc);
// });


// ===================================== Find all orders
// Order.find((err, orders) => {
//   if (err) return console.error(err);
//   console.log(orders);
// });