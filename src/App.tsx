import React from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
