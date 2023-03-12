import React from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import SidebarDetail from './SidebarDetail'
import Map from './Map'
import './App.scss';

function App() {
  const [map, setMap] = React.useState()

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar />
        <SidebarDetail />
        <Map className='map' setmap={setMap} />
      </div>
    </div>
  );
}

export default App;
