import { useEffect, useState } from 'react';
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
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<CatalogFeature[]>([]);

  // TODO: https://github.com/takamatsu-city/maps.takamatsu-fact.com/issues/89 修正時に 初期値を true に変更する
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' })
  const [isOpenedSidebar, setIsOpenedSidebar] = useState<boolean>(isDesktop);

  const catalogSuccess = catalog.isSuccess;
  const catalogData = catalog.data;
  useEffect(() => {
    if (!catalogSuccess || !catalogData) {
      return;
    }

    // setSelectedLayers(catalogData.map(item => item.class));
  }, [ catalogSuccess, catalogData, setSelectedLayers ]);


  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar
          catalogData={catalog.data || []}
          selectedLayers={selectedLayers}
          isOpenedSidebar={isOpenedSidebar}
          setIsOpenedSidebar={setIsOpenedSidebar}
          setSelectedLayers={setSelectedLayers}
        />
        <div className="map-container">
          { selectedFeatures.length > 0 && <SidebarDetail
            selected={selectedFeatures}
            setSelected={setSelectedFeatures}
          /> }
          <MainMap
            catalogData={catalog.data || []}
            selectedLayers={selectedLayers}
            setSelectedFeatures={setSelectedFeatures}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
