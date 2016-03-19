var jwt = require('jwt-simple');
var models = require('../models');
var db = require('../models/index.js');
var request = require('request');

// Uber API Constants
var uberClientId = "lOP16uWPKTcEXgfG7Ps_FkvJ5_GK4Xni";
var uberServerToken = "DdO41YyjqatjtvzzIqQUoGPtyciAZLVnWP8PS5Xc";

// Create variables to store latitude and longitude
var userLatitude, userLongitude, partyLatitude = 40.7283405,
  partyLongitude = -73.994567;


module.exports = {
  // Uber API Constants
  uberClientId: "lOP16uWPKTcEXgfG7Ps_FkvJ5_GK4Xni",
  uberServerToken: "DdO41YyjqatjtvzzIqQUoGPtyciAZLVnWP8PS5Xc",
  // userLatitude: 40.7283405,
  // userLongitude: -73.994567,
  // partyLatitude: 40.7283405,
  // partyLongitude: -73.994567,

  //getEstimatesForUserLocation: function (latitude, longitude) {
  // $.ajax({
  //   url: "https://api.uber.com/v1/estimates/price",
  //   headers: {
  //     Authorization: "Token " + uberServerToken
  //   },
  //   data: {
  //     start_latitude: latitude,
  //     start_longitude: longitude,
  //     end_latitude: partyLatitude,
  //     end_longitude: partyLongitude
  //   },
  //   success: function (result) {
  //     //console.log(result);
  //     res.send(results)
  //   }
  // });


  getUberInfoFn: function (req, res) {

    var info
    var options = {
      url: "https://api.uber.com/v1/products",
      headers: {
        Authorization: 'Token DdO41YyjqatjtvzzIqQUoGPtyciAZLVnWP8PS5Xc'
      },
      qs: {
        latitude: "37.775818",
        longitude: "-122.418028"
      }
    }

    function callback(error, response, body) {
      if (!error && response.statusCode === 200) {
        var info = JSON.parse(body);
        console.log('uber infoooooo', info)
      }
    }

    request(options, callback)
    res.send(info)
  }

}
