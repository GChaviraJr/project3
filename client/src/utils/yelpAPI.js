const axios = require('axios')

const yelpAPI = {
    searchRestaurants (cityInput) {
      return axios.post("api/restaurants", cityInput)
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