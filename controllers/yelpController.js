const yelp = require("yelp-fusion");
const apiKey = 'uQGKIDvAz-IshxibMcDVELD7LT_disuxdvp14BbxXBcqDHJAgRx20z3VCCyS67ePJZPg8IO9aabHdLOOdWYSGJLdgw1QJ4sLujEMJJ8_mzKsqXQlq0M5Vu1SIXOSXHYx';
const express = require('express')
const app = express();
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
          //   let tableData = {
          //     name: response.jsonBody.businesses[i].name,
          //     address: response.jsonBody.businesses[
          //       i
          //     ].location.display_address.join(","),
          //     coordinates: [
          //       response.jsonBody.businesses[
          //       i
          //     ].coordinates.latitude,
          //       response.jsonBody.businesses[
          //         i
          //       ].coordinates.longitude 
          //     ],
          //     URL: response.jsonBody.businesses[i].url
          // };
            db.Results.create({
              name: response.jsonBody.businesses[i].name,
              address: response.jsonBody.businesses[
                i
              ].location.display_address,
              coordinates: [
                response.jsonBody.businesses[
                i
              ].coordinates.latitude,
                response.jsonBody.businesses[
                  i
                ].coordinates.longitude 
              ],
              URL: response.jsonBody.businesses[i].url
            })
          }
          res.status(200).send(response);
        }).catch(e => {
          console.log(e);
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