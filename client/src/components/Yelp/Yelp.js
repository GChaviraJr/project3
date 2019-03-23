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

  render() {
      const { name } = this.props
      return (
          <div>
        <div className='white f3'>
          <h2>{`${name}, welcome to your home page`}</h2>
        </div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">Where do we want to go?</div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <label className='mt2 fw6' htmlFor='yelp-search'>Search for places to go</label>
            <input onSearchChange={this.search} type='text' name='yelp-search' className='pa2 ba w-100' placeholder='bar, club...'></input>
        </div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">{`We are going to ${this.search}`}</div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">If you need a ride, use Uber!</div>
        <button>Uber Button</button>
      </div>
      )
  };
};

export default Yelp;