import React from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import SidebarDetail from './SidebarDetail'
import Map from './Map'

import type * as maplibregl from 'maplibre-gl';

import './App.scss';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_map, setMap] = React.useState<maplibregl.Map | undefined>(undefined);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar />
        <SidebarDetail />
        <Map className='map' setMap={setMap} />
      </div>
    </div>
  );
}

export default App;
