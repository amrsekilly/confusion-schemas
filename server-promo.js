var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected correctly to server");



  // create a new dish
  Promotions.create({
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      // "label": "New",
      "price": "19.99",
      "description": "Featuring . . ."
}, function(err, promo) {
    // the callback
    if (err) throw err;
    console.log('promo created!');
    // to get the newly created promo info
    console.log(promo);

    // grab the id of the new dish
    var id = promo._id;

    // get all the dishes
    // the delay is used to learn about the modified date field
    setTimeout(function() {
      Promotions.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function(err, promo) {
          // the callback
          if (err) throw err;
          console.log('Updated promo!');
          console.log(promo);

          db.collection('promotions').drop(function() {
            db.close();
          });
        });
    }, 3000);
  });
});
