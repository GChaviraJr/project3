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
            res.json(array)
        })
    },
    requestToken: (code, callback) => {
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
                redirect_uri: 'http://localhost:3000/callback',
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
            callback(tokenObject)
        });
    }, 
    requestMe: function(theToken) {
        var options = {
            method: "GET",
            url: "https://api.uber.com/v1.2/me",
            headers: {
                "Authorization" : "Bearer " + theToken.accessToken,
                "Content-Type" : "application/json",
                "Accept-Language" : "en_US"
            },
            formData: {

            }
        }
        request(options, (error, response, body) => {
            console.log(JSON.parse(body))
        })
    },
    getProducts: function(theToken) {
        var options = {
            method: "GET",
            url: "https://api.uber.com/v1.2/products?latitude=37.7752315&longitude=-122.418075",
            headers: {
                "Authorization" : "Bearer " + theToken.accessToken,
                "Content-Type" : "application/json",
                "Accept-Language" : "en_US"
            },
            formData: {

            }
        }
        request(options, (error, response, body) => {
            if(error) {
                console.log(error)
            }
            console.log(JSON.parse(body))
        })
    },
    geolocation: function() {
        if(navigator.geolocation) {
            console.log(true)
        } else {
            console.log(false)
        }
    }

}




module.exports = uber