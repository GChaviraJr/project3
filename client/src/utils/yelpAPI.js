import axios from 'axios';

export default {
    searchRestaurants: function (cityInput) {
      return axios.post("api/restaurants", cityInput)
    },
    getRestaurants: function () {
      return axios.get("api/restaurants")
    },
    deleteRestaurants: function () {
      return axios.delete("api/restaurants/") 
    },
    createSelectedLocation: function (locationInput) {
      return axios.post("api/selectedLocation", locationInput)
    },
    deleteSelectedLocations: function () {
      return axios.delete("api/selectedLocation/")
    }
  };
  
