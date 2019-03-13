import React from 'react';

const Home = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, welcome to your home page`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Home;