import { useState } from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import MainMap from './MainMap'

// import type * as maplibregl from 'maplibre-gl';

import './App.scss';
import SidebarDetail from './SidebarDetail';
import { useMediaQuery } from 'react-responsive'

function App() {
  // TODO: https://github.com/takamatsu-city/maps.takamatsu-fact.com/issues/89 修正時に 初期値を true に変更する
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' })
  const [isOpenedSidebar, setIsOpenedSidebar] = useState<boolean>(isDesktop);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar
          isOpenedSidebar={isOpenedSidebar}
          setIsOpenedSidebar={setIsOpenedSidebar}
        />
        <div className="map-container">
          <SidebarDetail />
          <MainMap />
        </div>
      </div>
    </div>
  );
}

export default App;
