import React from 'react';
import logo from './logo.svg';
import NewsFeed from './components/NewsFeed.js'

function App() {
  return (
    <div>
      <div className="container mx-auto">
        <img className="md:max-w-screen-md mx-auto" src={logo} alt=""/>
      </div>
      <div className="text-center">Hellow from React</div>
      <NewsFeed />
    </div>
  );
}

export default App;
