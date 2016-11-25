// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  // define schema
  var TempSchema = new Schema({
      time_of_mesure: {type:Date},
      mesure: Number
  });
  var Temp = mongoose.model('Temp', TempSchema);

  var App = function() {

  	var self = this;
    //add a data
    this.add = function(datafrompost, callback) {
        temp = new Temp({
            mesure: datafrompost.mesure,
            time_of_mesure: Date.now()
        });
        temp.save(function(err) {
            if (err) {
                return callback(err.msg, null);
            }
            callback(null, temp);
        });
    };
    //find all historique
    this.findall = function(callback) {
        Temp.find({}, function(err, historique) {
            var TempMap = {};
            historique.forEach(function(temp) {
                TempMap[temp._id] = temp;
            });
            if (err) {
                return callback(err.msg, null);
            }
            callback(null, historique);

        });
    };
    //find the last data
    this.findlast = function(callback) {
        Temp.find().sort({
            time_of_mesure: -1
        }).limit(1).exec(function(err, temp) {
            if (err) {
                callback(err.msg, null);
            } else if (temp == null) {
                callback("No temp found", null)
            } else {
                callback(null, temp[0]);
            }
        });
    }
  	this._Model = Temp;
  	this._Schema = TempSchema;
  }

  module.exports = new App();
