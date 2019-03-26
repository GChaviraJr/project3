import React, { Component } from 'react';
import Yelp from '../Yelp/Yelp'
import Card from '../Card/Card'
import { Col, Row } from '../Grid/index'
import { List } from '../List/index'
import { yelpAPI } from '../../utils/yelpAPI'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
        restaurants: [],
        search: '',
        restaurantId: '',
        restaurantName: '',
        restaurantAddress: '',
        coordinates: []
    }
  }

onSearchChange = event => {
  this.setState({
    search: event.target.value,
  })
}

onSelectedChange = event => {
  let locationInput = {
    name: event.target.value.name,
    address: event.target.value.address,
    coordinates: event.target.value.coordinates
  }
  
  yelpAPI.createSelectedLocation(locationInput)
    .then( (data) => {
      this.setState({
    restaurantID: data._id,
    restaurantName: data.name,
    restaurantAddress: data.address,
    coordinates: data.coordinates
  })
    console.log('this.state - Name:', this.state.restaurantName)
  console.log('this.state - Addy:', this.state.restaurantAddress)
  console.log('this.state - coordinates:', this.state.coordinates)
    })
}

onSubmitSearch = () => {
this.handleUserInput() ;
}


refreshRestaurants = function () {
  yelpAPI.getRestaurants().then(function(data) {
    return data
  }).then(response => response.json())
      .then(data => {
      let dataChange = [data]
      let $restaurants = dataChange.map(function(restaurant) {
        return restaurant
    })
    this.setState({
        restaurants: $restaurants[0]
      })
  })
};

handleUserInput = () => {
  yelpAPI.deleteRestaurantsInCurrentDatabase();

  const userCityInput = this.state.search
  const cityInput = {
    text: userCityInput
  }

  if (!userCityInput) {
    alert("You must enter a city!");
    return;
  }

  yelpAPI.searchRestaurants(cityInput).then(() => {
    this.refreshRestaurants()
  });
};

    render() {
      const { name } = this.props
      const { restaurants } = this.state
    return (
      <div>
        <div className='white f3'>
          <h2>{`${name}, welcome to your home page`}</h2>
        </div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">Where do we want to go?</div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <label className='mt2 fw6' htmlFor='yelp-search'>Search for places to go</label>
            <input type='text' name='yelp-search' className='pa2 ba w-100' onChange={this.onSearchChange} placeholder='bar, club...'></input>
            <button onClick={() => this.onSubmitSearch()}>
              Search
            </button>
        </div>
        <Row>
          <Col size='md-12'>
            <Card className="black-80" title='Searched Restaurants'>
              {restaurants.length ? (
                <List >
                  {restaurants.map(restaurant => (
                    <Yelp 
                      key={restaurant}
                      id={restaurant._id}
                      name={restaurant.name}
                      address={restaurant.address}
                      url={restaurant.URL}
                      onClick={() => this.onSelectedChange()}
                     />
                  ))}
                </List>
              ) : (
                <h3 className='text-center black-80'>No Searched Restaurants</h3>
              )}
            </Card>
          </Col>
        </Row>

        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">If you need a ride, use Uber!</div>
        <button>Uber Button</button>
      </div>
      )
    }
}

export default Home;