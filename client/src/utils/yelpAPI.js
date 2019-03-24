const axios = require('axios')

const yelpAPI = {
    searchRestaurants: function (cityInput) {
      return fetch("api/restaurants", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(cityInput)
      })
    },
    
    getRestaurants () {
      return axios.get("api/restaurants")
    },

    deleteRestaurants () {
      return axios.delete("api/restaurants/") 
    },
    
    createSelectedLocation (locationInput) {
      return axios.post("api/selectedLocation", locationInput)
    },

    deleteSelectedLocations () {
      return axios.delete("api/selectedLocation/")
    }
  }
  
module.exports = {
yelpAPI
}