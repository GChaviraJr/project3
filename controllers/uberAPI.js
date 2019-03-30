var axios = require("axios")
var request = require("request")

var uber = {
    searchProducts: function (req, res) {
        axios.request({
            url: "https://api.uber.com/v1.2/products?latitude=37.7752315&longitude=-122.418075",
            data: "",
            headers: {
                "Authorization": "Token ciVTKyB-Bj93iDZNwvn7a0JpknZqnIaCkj167SPq",
                "Content-Type": "application/json",
                "Accept-Language": "en_US"
            },
            method: "get"
        }).then(function (response) {
            var array = []
            response.data.products.forEach(function (product) {
                array.push(product.display_name)
            })
            res.send(array)
        })
    },
    requestToken: (code, callback, req, res) => {
        var options = {
            method: 'POST',
            url: 'https://login.uber.com/oauth/v2/token',
            headers:
            {
                'Content-Type': 'multipart/form-data',
            },
            formData:
            {
                client_secret: '2Q5A5qm_v8eW4Y0w8oNi78QFfHEmduMTXYjGxTwL',
                client_id: 'w8BiFEe_pvOo9cg6VFa-oxIs_lpyL_ll',
                grant_type: 'authorization_code',
                redirect_uri: 'https://project3team2.herokuapp.com/',
                code: code
            }
        };
        request(options, function (error, response, body) {
            var theBody = JSON.parse(body)
            let tokenObject = {
                accessToken: theBody.access_token,
                tokenType: theBody.token_type,
                expiresIn: theBody.expires_in,
                refreshToken: theBody.refresh_token,
                scope: theBody.scope
            }
            callback(tokenObject, req, res)
        });
    },
    requestMe: function (theToken, req, res) {
        var options = {
            method: "GET",
            url: "https://api.uber.com/v1.2/me",
            headers: {
                "Authorization": "Bearer " + theToken.accessToken,
                "Content-Type": "application/json",
                "Accept-Language": "en_US"
            },
            formData: {

            }
        }
        request(options, (error, response, body) => {
            var array = []
            array.push(JSON.parse(body))
            array.push(theToken.refreshToken)
            res.json(array)
        })
    },
    getProducts: function (theToken, req, res) {
        console.log(theToken)
        var options = {
            method: "GET",
            url: "https://api.uber.com/v1.2/products?latitude=" +
                theToken.latitude + "&longitude= " + theToken.longitude,
            headers: {
                "Authorization": "Bearer " + theToken.accessToken,
                "Content-Type": "application/json",
                "Accept-Language": "en_US"
            },
            formData: {

            }
        }
        request(options, (error, response, body) => {
            if (error) {
                console.log(error)
            }
            var array = []
            array.push(JSON.parse(body).products)
            array.push(theToken.refreshToken)
            res.json(array)
        })
    },
    refreshToken: function (refreshToken, callback, req, res) {
        var options = {
            method: 'POST',
            url: 'https://login.uber.com/oauth/v2/token',
            headers:
            {
                'Content-Type': 'multipart/form-data',
            },
            formData:
            {
                client_secret: '2Q5A5qm_v8eW4Y0w8oNi78QFfHEmduMTXYjGxTwL',
                client_id: 'w8BiFEe_pvOo9cg6VFa-oxIs_lpyL_ll',
                grant_type: 'refresh_token',
                refresh_token: refreshToken.refreshToken
            }
        };
        request(options, function (error, response, body) {
            var theBody = JSON.parse(body)
            let tokenObject = {
                accessToken: theBody.access_token,
                tokenType: theBody.token_type,
                expiresIn: theBody.expires_in,
                refreshToken: theBody.refresh_token,
                scope: theBody.scope,
                longitude: refreshToken.longitude,
                latitude: refreshToken.latitude
            }
            callback(tokenObject, req, res)
        });
    },
    requestFare: function (theToken, req, res) {
        var options = {
            method: "POST",
            url: "https://api.uber.com/v1.2/requests/estimate",
            headers: {
                "Authorization": "Bearer " + theToken.accessToken,
                "Content-Type": "application/json",
                "Accept-Language": "en_US"
            },
            json: {
                start_longitude: theToken.longitude,
                start_latitude: theToken.latitude,
                end_longitude: theToken.longitude - 1,
                end_latitude: theToken.latitude + 1
            }
        }
        request(options, (error, response, body) => {
            if (error) {
                console.log(error)
            }
            var array = []
            array.push(body)
            array.push(theToken.refreshToken)
            res.json(array)
            console.log(array)
        })
    },
    requestFromSandBox: function (theToken, req, res) {
        var theSent = req.body.params
        var options = {
            method: "POST",
            url: "https://sandbox-api.uber.com/v1.2/requests",
            headers: {
                "Authorization": "Bearer " + theToken.accessToken,
                "Content-Type": "application/json",
            },
            json: {
                fare_id: theSent.fareId,
                product_id: theSent.productId,
                start_longitude: theToken.longitude,
                start_latitude: theToken.latitude,
                end_longitude: theToken.longitude - 1,
                end_latitude: theToken.latitude + 1
            }
        }
        request(options, (error, response, body) => {
            if (error) {
                console.log(error)
            }
            var array = []
            array.push(body)
            array.push(theToken.refreshToken)
            res.json(array)
        })
    },
    deleteRequest: function(theToken, req, res) {
        var theSent = req.body
        var requestId = theSent.requestId
        console.log(requestId)
        var options = {
            method: "DELETE",
            url: 'https://sandbox-api.uber.com/v1.2/requests/' + requestId,
            headers: {
                "Authorization": "Bearer " + theToken.accessToken,
                "Content-Type": "application/json",
            }
        }
        request(options, (error, response, body) => {
            if (error) {
                console.log(error)
            }
            res.json(body)
        })
    }
}




module.exports = uber