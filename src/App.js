import React from 'react';
import './App.css';

// Main page
import MyDesk from './pages/myDesk/index';
import Navbar from './components/Navbar/index';

function App() {
  return (
    <>
      <Navbar />
      <MyDesk></MyDesk>
    </>
  );
}

export default App;
