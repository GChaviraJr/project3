import React, { Component } from 'react';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

    render() {
      const { name, pet, age, placeChosen } = this.props
    return (
      <div>
        <div className='white f3'>
          <h2>{`${name}, welcome to your home page`}</h2>
        </div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">Where do we want to go?</div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <label className='mt2 fw6' htmlFor='yelp-search'>Search for places to go</label>
            <input onChange={this.onFormChange} type='text' name='yelp-search' className='pa2 ba w-100' placeholder='bar, club...'></input>
        </div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">{`We are going to ${placeChosen}`}</div>
        <div className="white br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">If you need a ride, use Uber!</div>
        <button>Uber Button</button>
      </div>
      )
    }
}

export default Home;