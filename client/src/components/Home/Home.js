import React, { Component } from 'react';
import Search from '../Portals/Search/Search'
import Select from '../Portals/Select/Select'
import Selected from '../Selected/Selected'
import Yelp from '../Yelp/Yelp'
import Card from '../Card/Card'
import { Col, Row } from '../Grid/index'
import { List } from '../List/index'
import { yelpAPI } from '../../utils/yelpAPI'
import axios from "axios"




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
        this.setState({
          restaurants: data
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

searchProducts = () => {
    console.log("salkd")
    axios.get("/api/uber/products").then(function(response) {
      console.log(response)
    })
}
    render() {
      const { name } = this.props
      const { restaurants, isSelected, isSearching } = this.state
    return (
      <div>
        <div className='white f3'>
          <h2>{`${ window.sessionStorage.getItem('user') || name }, welcome to your home page`}</h2>
        </div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">Where do we want to go?</div>
        <div className="mt3">
            <input type='text' name='yelp-search' className='b pa2 input-reset ba bg-black white w-60' onChange={this.onSearchChange} placeholder='bar, club...'></input>
            <br/>
            <button onClick={() => this.onSubmitSearch()}>
              Search
            </button>
        </div>
      {
        isSearching &&
      <Search>
        <Row isSearching={isSearching} toggleSearching={this.toggleSearching}>
          <Col size='md-12'>
            <Card title='Searched Restaurants'>
              {restaurants.length ? (
                <List>
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
                <h3>No Searched Restaurants</h3>
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
        <div >If you need a ride, use Uber!</div>
        <button onClick={this.searchProducts}>Uber Button</button>
      </Select>
      }
      </div>
      )
    }
}

export default Home;