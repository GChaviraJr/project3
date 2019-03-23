import React, {Component} from 'react';

class Yelp extends Component {
    constructor(props) {
      super(props)
      this.state = {
          search: '',
      }
    }


var refreshRestaurants = function () {
    API.getRestaurants().then(function (data) {    
      var $restaurants = data.map(function (restaurant) {
        var $a = $("<a>")
          .text(restaurant.name)
          .append(" " + restaurant.address);
          // .attr("href", "/input");
  
        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "id": restaurant.id,
            "name": restaurant.name,
            "address": restaurant.address
          })
          .append($a);
  
        var $button = $(
          "<a href=\"#\" class=\"btn btn-danger float-right delete\" role=\"button\">Select</a>"
        );
  
        $li.append($button);
  
        return $li;
      });
  
      $restaurantList.empty();
      $restaurantList.append($restaurants);
    });
  };
  
  // handleUserInput
  //  is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleUserInput = function (event) {
    console.log("Here I am");
    event.preventDefault();
    // deleteSelectedLocations();
    deleteRestaurantsInCurrentDatabase();
    var $userCityInput = $("#cityInput");
    var cityInput = {
      text: $userCityInput.val().trim()
    };
  
    if (!cityInput.text) {
      alert("You must enter a city!");
      return;
    }
  
    API.searchRestaurants(cityInput).then(function () {
      refreshRestaurants();
    });
  
    $userCityInput.val("");
  };

  render(){
      {/* const {
          name of variable (name)
      } = this.props */}
      return (
          <div>  
              {/* All html needs to be in here */}
          </div>
      )
  }
}

export default Yelp;