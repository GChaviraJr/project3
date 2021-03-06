import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from '../src/components/Navigation/Navigation'
import Signin from '../src/pages/Signin/Signin';
import Register from '../src/pages/Register/Register';
import Home from '../src/pages/Home/Home';
import Profile from '../src/components/Profile/Profile';
import Modal from '../src/components/Portals/Modal/Modal';
import './App.css'


const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
}

const currentRoute = window.sessionStorage.getItem('route')
const currentUser = window.sessionStorage.getItem('superState')

const initialState = {
  input: '',
  route: currentRoute || 'signin',
  isProfileOpen: false,
  isSignedIn: currentUser || false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: 0,
    pet: ''
  } || currentUser.user
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data._id) {
            fetch(`/profile/${data._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => response.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(user)
                this.onRouteChange('home');
              }
            })
          }
        })
        .catch(console.log)
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data._id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.date
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  

  onRouteChange = (route) => {
    if (route === 'signout') {
      sessionStorage.clear()
      sessionStorage.setItem('route', 'signin')
      this.setState(initialState)
      return window.location.reload()
    } else if (route === 'home') {
      this.setState({isSignedIn: true })
      window.sessionStorage.setItem('route', this.state.route)
      window.sessionStorage.setItem('superState', this.state)
      window.sessionStorage.setItem('user', this.state.user.name)
    }
    this.setState({route: route});
    window.sessionStorage.setItem('route', this.state.route)
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
      
    }));
    if (this.isProfileOpen) {
      this.setState({
        isSelected: false,
        isSearching: false
      })
    } else {
      return
    }
  }

  componentWillUnmount() {
    window.sessionStorage.setItem('superState', this.state)
  }

  render() {
    const { isSelected, isSearching, isSignedIn, route, isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
        {
          isProfileOpen && 
          <Modal>
            <Profile isSelected={isSelected} isSearching={isSearching} isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
          </Modal>
        }
        { route === 'home'
          ? <div>
              <Home key={this.state.user._id}
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;