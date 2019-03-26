const yelp = require("yelp-fusion");
const apiKey = 'uQGKIDvAz-IshxibMcDVELD7LT_disuxdvp14BbxXBcqDHJAgRx20z3VCCyS67ePJZPg8IO9aabHdLOOdWYSGJLdgw1QJ4sLujEMJJ8_mzKsqXQlq0M5Vu1SIXOSXHYx';
const client = yelp.client(apiKey);
const db = require('../models')

module.exports = {
    getRest: function(req, res) { 
      db.Results.find({}).then(function(data) {
        res.json(data);
        return data;
      });
  },
    // Create a new restaurant
    clientSearch: function(req, res) {
      client.search({
          location: req.body.text,
          categories: "bars",
          limit: 10
        }).then(response => {
          for (let i = 0; i < 10; i++) {
           db.Results.create({
              name: JSON.stringify(response.jsonBody.businesses[i].name),
              address: JSON.stringify(response.jsonBody.businesses[
                i
              ].location.display_address.join(",")),
              coordinates: [
                response.jsonBody.businesses[
                i
              ].coordinates.latitude,
                response.jsonBody.businesses[
                  i
                ].coordinates.longitude 
              ],
              URL: JSON.stringify(response.jsonBody.businesses[i].url)
            })
          }
          console.log('before send', response.jsonBody.businesses)
          res.status(200).send(response.jsonBody.businesses);
        }).catch(err => {
          console.log(err);
        });
  },
  
   postSelectedLocation: function(req, res) { 
      db.selectedLocation.create({
        name: req.body.name,
        address: req.body.address
      }).then(() => {
        console.log("added selected location");
      });
  },

   deleteSelectedLocation: function(req, res) { 
      db.selectedLocation.deleteMany({
          name: req.body.name, 
          address: req.body.address
      }).then(function() {
        res.render("input");
        console.log("all selected locations deleted");
      });
  },

    deleteRestaurant: function(req, res) { 
      db.Results.deleteMany({
        name: req.body.name, 
        address: req.body.address,
        URL: req.body.URL
      }).then(function() {
        console.log("all rows deleted");
      });
  }
  }