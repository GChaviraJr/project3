import React, { Component } from 'react';
import Search from '../Portals/Search/Search'
import Select from '../Portals/Select/Select'
import Selected from '../Selected/Selected'
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
        longitude: 0,
        latitude: 0,
        isSelected: false,
        isSearching: true
    }
  }

onSearchChange = event => {
  this.setState({
    search: event.target.value,
  })
}

onSelectedChange = (name, address, coordinates) => {
  console.log('this is IT', name, address, coordinates)
  let locationInput = {
    name,
    address,
    longitude: coordinates[1],
    latitude: coordinates[0]
  }
  console.log(locationInput)

  this.setState({
    restaurantName: name,
    restaurantAddress: address,
    longitude: coordinates[1],
    latitude: coordinates[0],
    isSelected: true,
    isSearching: false
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
        console.log('This is data:', data)
      // let dataChange = [data]
    //   let $restaurants = data.map(function(restaurant) {
    //     return restaurant
    // })
    this.setState({
        restaurants: data
      })
      console.log('')
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

toggleSelected = () => {
  this.setState(state => ({
    ...state,
    isSelected: !state.isSelected,
  }));
}

toggleSearching = () => {
  this.setState(state => ({
    ...state,
    isSearching: state.isSearching,
  }));
}

    render() {
      const { name } = this.props
      const { restaurants, isSelected, isSearching } = this.state
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
      {
        isSearching &&
      <Search>
        <Row isSearching={isSearching} toggleSearching={this.toggleSearching}>
          <Col size='md-12'>
            <Card  className="black-80" title='Searched Restaurants'>
              {restaurants.length ? (
                <List >
                  {restaurants.map(restaurant => (
                    <Yelp 
                      key={restaurant._id}
                      id={restaurant._id}
                      name={restaurant.name}
                      address={restaurant.address}
                      url={restaurant.URL}
                      coordinates={restaurant.coordinates}
                      onClick={this.onSelectedChange}
                     />
                  ))}
                </List>
              ) : (
                <h3 className='text-center black-80'>No Searched Restaurants</h3>
              )}
            </Card>
          </Col>
        </Row>
      </Search>
      }
      {
        isSelected &&
      <Select>
        <Selected 
        isSelected={isSelected} 
        toggleSelected={this.toggleSelected}
        key={restaurants}
        id={this.state.restaurantId}
        name={this.state.restaurantName}
        address={this.state.restaurantAddress}
        longitude={this.state.longitude}
        latitude={this.state.latitude}
        />
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">If you need a ride, use Uber!</div>
        <button>Uber Button</button>
      </Select>
      }
      </div>
      )
    }
}

export default Home;