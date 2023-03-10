import React from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import SidebarDetail from './SidebarDetail'
import Map from './Map'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar />
        <SidebarDetail />
        <Map />
      </div>
    </div>
  );
}

export default App;
