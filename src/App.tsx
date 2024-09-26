import { useState } from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import MainMap from './MainMap'
import NotFound from './components/NotFound'

// import type * as maplibregl from 'maplibre-gl';

import './App.scss';
import SidebarDetail from './SidebarDetail';
import { useMediaQuery } from 'react-responsive'
import MapStyleController from './components/mapStyleControler/mapStyleController';
import { MapStyleConfigType } from './config/mapStyleConfig';
import { Route, Routes } from 'react-router-dom';

function App() {
  // TODO: https://github.com/takamatsu-city/maps.takamatsu-fact.com/issues/89 修正時に 初期値を true に変更する
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' })
  const [isOpenedSidebar, setIsOpenedSidebar] = useState<boolean>(isDesktop);
  const [selectedBaseMap, setSelectedBaseMap] = useState<MapStyleConfigType | undefined>(undefined);

  return (
    <Routes>
      <Route path="/" element={
        <div className="App">
          <Header />
          <div className="container">
            <Sidebar
              isOpenedSidebar={isOpenedSidebar}
              setIsOpenedSidebar={setIsOpenedSidebar}
              baseMap={selectedBaseMap?.id || ''}
            />
            <div className="map-container">
              <SidebarDetail />
              <MainMap
                selectedBaseMap={selectedBaseMap}
                setSelectedBaseMap={setSelectedBaseMap}
              />
              <MapStyleController
                setSelectedBaseMap={setSelectedBaseMap}
                selectedBaseMap={selectedBaseMap}
              />
            </div>
          </div>
        </div>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
