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
  userEmail: String,
  phone: String,
  shippingAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zipcode: Number
  },
  billing: {
    creditCard: Number,
    exp: String,
    cvv: Number,
    zipcode: Number
  }
});

var Order = mongoose.model('Order', orderSchema);

var order = new Order({username: 'Jeff'});
order.save((err, order) => {
  if (err) {
    return console.error(err);
  }
});