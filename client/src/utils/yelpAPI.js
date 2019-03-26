

const yelpAPI = {
    searchRestaurants (cityInput) {
      return fetch("api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cityInput)
      })
    },
    
    getRestaurants () {
      return fetch("api/restaurants", {
        method: "GET"
      })
    },

    deleteRestaurants () {
      return fetch("api/restaurants/", {
        method: "DELETE"
      }) 
    },
    
    createSelectedLocation (locationInput) {
      return fetch("api/selectedLocation", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(locationInput)
      })
    },

    deleteSelectedLocations () {
      return fetch("api/selectedLocation/", {
        method: "DELETE"
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