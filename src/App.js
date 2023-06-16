import React from 'react'
import './App.css';
import TwitterPage from './components/TwitterPage/TwitterPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Navbar />
        <TwitterPage />
      </div>

    </main>
  );
}

export default App;
