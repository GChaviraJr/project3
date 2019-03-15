import React, { Component } from 'react';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

    render() {
      const { name, entries } = this.props
    return (
      <div>
        <div className='white f3'>
          <h2>{`${name}, welcome to your home page`}</h2>
        </div>
        <div className='white f1'>
          {entries}
        </div>
      </div>
      )
    }
}

export default Home;