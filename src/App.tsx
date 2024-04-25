import { useState } from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import MainMap from './MainMap'

// import type * as maplibregl from 'maplibre-gl';

import './App.scss';
import { useQuery } from 'react-query';
import { CatalogFeature, getCatalog } from './api/catalog';
import SidebarDetail from './SidebarDetail';
import { useMediaQuery } from 'react-responsive'

function App() {
  const catalog = useQuery('catalog', getCatalog);
  const [selectedFeatures, setSelectedFeatures] = useState<CatalogFeature[]>([]);

  // TODO: https://github.com/takamatsu-city/maps.takamatsu-fact.com/issues/89 修正時に 初期値を true に変更する
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' })
  const [isOpenedSidebar, setIsOpenedSidebar] = useState<boolean>(isDesktop);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar
          catalogData={catalog.data || []}
          isOpenedSidebar={isOpenedSidebar}
          setIsOpenedSidebar={setIsOpenedSidebar}
        />
        <div className="map-container">
          { selectedFeatures.length > 0 && <SidebarDetail
            selected={selectedFeatures}
            setSelected={setSelectedFeatures}
          /> }
          <MainMap
            catalogData={catalog.data || []}
            setSelectedFeatures={setSelectedFeatures}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
