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
        restaurants: {},
        search: '',
        restaurantId: '',
        restaurantName: '',
        restaurantAddress: '',
    }
  }

onSearchChange = event => {
  this.setState({
    search: event.target.value,
  })
}

onSubmitSearch = () => {
this.handleUserInput() ;
}


refreshRestaurants = function () {
  yelpAPI.getRestaurants().then(function (data) {
    console.log('Just data', data)
    console.log('data name', data.name)
    console.log('data address', data.address)
  })
};

// handleUserInput
//  is called whenever we submit a new example
// Save the new example to the db and refresh the list
handleUserInput = () => {
  // yelpAPI.deleteRestaurantsInCurrentDatabase();

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
      const { name, restaurantId, restaurantName, restaurantAddress } = this.props
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
            <Card title='Searched Restaurants'>
              {this.state.restaurants.length ? (
                <List>
                  {this.state.restaurants.map(restaurant => (
                    <Yelp
                      key={restaurantId}
                      name={restaurantName}
                      address={restaurantAddress}
                     />
                  ))}
                </List>
              ) : (
                <h2 className='text-center'>No Searched Restaurants</h2>
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