import React, { Component } from "react"
import axios from 'axios';
import "./Uber.css"

class Uber extends Component {
    constructor(props) {
        super(props)
        this.state = {
            randomThing: "",
            longitude: 0,
            latitude: 0,
            uberProduct: {
                name: "",
                productId: "",
                costPerDistance: 0,
                costPerMinute: 0,
            },
            uberFare: {
                fare_id: "",
                fare: "", 
                distance: ""
            },
            ride: {
                requestId: ""
            }
        }
    }

    componentDidMount() {
        this.getCode()
        this.geolocation()
        setTimeout(() => {
            this.heyThere()
            this.requestFare()
        }, 3000)
    }

    getCode = () => {
        let url = window.location
        this.postCode(url.search.split("=")[1])
    }

    searchProducts = () => {
        axios.get("/api/uber/products").then(function (response) {
            console.log(response)
        })
    }
    postCode = (code) => {
        axios.post("/api/uber/postCode", {
            params: {
                code
            }
        }).then((response) => {
            var data = response.data
            this.setState({
                randomThing: data[1]
            })
        })
    }
    geolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        } else {
            console.log(false)
        }
    }

    showPosition = (position) => {
        console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude)
        this.setState({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        })
    }

    heyThere = (event) => {
        event.preventDefault()
        let refreshToken = this.state.randomThing
        var send = {
            refreshToken,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        }
        console.log(send)
        axios.post("/api/uber/requestProducts", {
            params: send
        }).then( (response) => {
            var product = response.data[0][3]
            var refresh = response.data[1]
            var price = product.price_details
            this.setState({
                randomThing: refresh,
                uberProduct: {
                    name: product.display_name + ", " + product.description,
                    costPerDistance: price.cost_per_distance,
                    costPerMinute: price.cost_per_minute,
                    productId: product.product_id
                }
            })
        })
    }
    requestFare = (event) => {
        event.preventDefault()
        let refreshToken = this.state.randomThing
        var send = {
            refreshToken,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        }
        axios.post("/api/uber/requestFare", {
            params: send
        }).then( response => {
            var theStuff = response.data
            this.setState({
                randomThing: theStuff[1],
                uberFare: {
                    fare_id: theStuff[0].fare.fare_id,
                    fare: theStuff[0].fare.display, 
                    distance: theStuff[0].trip.distance_estimate + " " + theStuff[0].trip.distance_unit + "(s)"
                }
            })
            console.log(this.state)
        })
    }
    requestRide = () => {
        let refreshToken = this.state.randomThing
        var send = {
            refreshToken,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            productId: this.state.uberProduct.productId,
            fareId: this.state.uberFare.fare_id
        }
        
        axios.post("/api/uber/requestRide", {
            params: send
        }).then( response => {
            console.log(response)
            this.setState({
                randomThing: response.data[1],
                ride: {
                    requestId: response.data[0].request_id
                }
            })
        })
    }
    deleteRequest = (event) => {
        event.preventDefault()
        var requestId = this.state.ride.requestId
        var refreshToken = this.state.randomThing
        axios.delete("/api/uber/deleteRequest", {
            data: {
                requestId,
                refreshToken
            }
        }).then(function(response) {
            console.log(response)
        })
    }

    render() {
        return (
            <div className="firstBox">
                {/* <button onClick={this.getLocation}>is the other thing</button><br /> */}
                <button className="box" onClick={this.requestRide}>requestRide</button>
                <button className="box" onClick={this.deleteRequest}>delete ride request</button>
                {/* <button onClick={this.changeState}>change state</button> */}
            </div>
        )
    }
}

export default Uber