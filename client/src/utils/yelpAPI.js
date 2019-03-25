
const yelpAPI = {
    searchRestaurants (cityInput) {
      return fetch("api/restaurants", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cityInput)
      })
    },
    
    getRestaurants () {
      return fetch("api/restaurants", {
        method: "get"
      })
    },

    deleteRestaurants () {
      return fetch("api/restaurants/", {
        method: "delete"
      }) 
    },
    
    createSelectedLocation (locationInput) {
      return fetch("api/selectedLocation", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(locationInput)
      })
    },

    deleteSelectedLocations () {
      return fetch("api/selectedLocation/", {
        method: "delete"
      })
    },

    deleteRestaurantsInCurrentDatabase () {
      yelpAPI.deleteRestaurants().then(function () {
        console.log("DELETE")
      })
    }
  }
  
module.exports = {
yelpAPI
}