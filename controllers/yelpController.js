const yelp = require("yelp-fusion");
const apiKey = 'uQGKIDvAz-IshxibMcDVELD7LT_disuxdvp14BbxXBcqDHJAgRx20z3VCCyS67ePJZPg8IO9aabHdLOOdWYSGJLdgw1QJ4sLujEMJJ8_mzKsqXQlq0M5Vu1SIXOSXHYx';

const client = yelp.client(apiKey);
const db = require('../models')

module.exports = function(app) {
    app.get("api/restaurants", function(req, res) {
      db.Results.find({}).then(function(data) {
        res.json(data);
        return data;
      });
    });
  
    // Create a new restaurant
    app.post("api/restaurants", function(req, res) {
      console.log(req.body.text)
      client.search({
          location: req.body.text,
          categories: "bars",
          limit: 10
        })
        .then(response => {
          console.log(response);
          for (var i = 0; i < 10; i++) {
            var tableData = {
              name: response.jsonBody.businesses[i].name,
              address: response.jsonBody.businesses[
                i
              ].location.display_address.join(","),
              URL: response.jsonBody.businesses[i].url
            };
            // console.log(JSON.stringify(response, null, 2));
            db.Results.create(tableData);
          }
          res.status(200).send(response);
        })
        .catch(e => {
          console.log(e);
        });
    });
  
    app.post("api/selectedLocation", (req, res) => {
      db.selectedLocation.create({
        name: req.body.name,
        address: req.body.address
      }).then(() => {
        console.log("added selected location");
      });
    });
  
    app.delete("api/selectedLocation", function(req, res) {
      db.selectedLocation.deleteMany({
          name: req.body.name, 
          address: req.body.address
      }).then(function() {
        res.render("input");
        console.log("all selected locations deleted");
      });
    });
  
    app.delete("api/restaurants/", function(req, res) {
      db.Results.deleteMany({
        name: req.body.name, 
        address: req.body.address,
        URL: req.body.URL
      }).then(function() {
        console.log("all rows deleted");
      });
    })

  }