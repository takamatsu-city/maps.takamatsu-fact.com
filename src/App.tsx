import { useEffect, useState } from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import MainMap from './MainMap'

// import type * as maplibregl from 'maplibre-gl';

import './App.scss';
import { useQuery } from 'react-query';
import { CatalogFeature, getCatalog } from './api/catalog';
import SidebarDetail from './SidebarDetail';

function App() {
  const catalog = useQuery('catalog', getCatalog);
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<CatalogFeature[]>([]);
  const [isOpenedSidebar, setIsOpenedSidebar] = useState<boolean>(true);

  const catalogSuccess = catalog.isSuccess;
  const catalogData = catalog.data;
  useEffect(() => {
    if (!catalogSuccess || !catalogData) {
      return;
    }

    // setSelectedLayers(catalogData.map(item => item.class));
  }, [ catalogSuccess, catalogData, setSelectedLayers ]);

  // useEffect(() => {
  //   console.log(selectedLayers);
  // }, [selectedLayers]);

  return (
    <div className="App">
      <Header
        isOpenedSidebar={isOpenedSidebar}
        setIsOpenedSidebar={setIsOpenedSidebar}
      />
      <div className="container">
        <Sidebar
          catalogData={catalog.data || []}
          selectedLayers={selectedLayers}
          isOpenedSidebar={isOpenedSidebar}
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
