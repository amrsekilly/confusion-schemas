var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected correctly to server");



  // create a new dish
  Leaders.create({
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, . . ."
}, function(err, leader) {
    // the callback
    if (err) throw err;
    console.log('Leadership created!');
    // to get the newly created promo info
    console.log(leader);

    // grab the id of the new dish
    var id = leader._id;

    // get all the dishes
    // the delay is used to learn about the modified date field
    setTimeout(function() {
      Leaders.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function(err, leader) {
          // the callback
          if (err) throw err;
          console.log('Updated leadership!');
          console.log(leader);

          db.collection('leaders').drop(function() {
            db.close();
          });
        });
    }, 3000);
  });
});