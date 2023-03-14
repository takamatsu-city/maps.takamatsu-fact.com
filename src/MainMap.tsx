import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type * as maplibregl from 'maplibre-gl';
import { CatalogFeature, SingleCatalogItem } from './api/catalog';

declare global {
  interface Window {
    geolonia: any;
  }
}

type LayerSpecification = (
  maplibregl.FillLayerSpecification |
  maplibregl.LineLayerSpecification |
  maplibregl.SymbolLayerSpecification |
  maplibregl.CircleLayerSpecification
)
type LayerTemplate = (LayerSpecification & {
  source?: string | maplibregl.SourceSpecification | undefined;
});

const LAYER_TEMPLATES: [string, LayerTemplate][] = [
  [ "Polygon", {
    id: "",
    source: "takamatsu",
    "source-layer": "main",
    type: "fill",
    paint: {
      "fill-color": "#0f0",
      "fill-opacity": 0.8,
    },
  } ],
  [ "LineString", {
    id: "",
    source: "takamatsu",
    "source-layer": "main",
    type: "line",
    paint: {
      "line-color": "#0f0",
      "line-opacity": 0.8,
      "line-width": 1,
    },
  } ],
  [ "Point", {
    id: "",
    source: "takamatsu",
    "source-layer": "main",
    type: "circle",
    paint: {
      "circle-color": "#0f0",
      "circle-radius": 5,
    }
  } ],
];

interface Props {
  catalogData: SingleCatalogItem[];
  selectedLayers: string[];
  setSelectedFeatures: React.Dispatch<React.SetStateAction<CatalogFeature[]>>
}

const MainMap: React.FC<Props> = ({catalogData, selectedLayers, setSelectedFeatures}) => {
  const [map, setMap] = useState<maplibregl.Map | undefined>(undefined);
  const mapContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const map: maplibregl.Map = new window.geolonia.Map({
      container: mapContainer.current,
      style: "geolonia/gsi",
      hash: true,
      center: [ 134.0403, 34.334 ],
      zoom: 9.2,
    });

    (window as any)._mainMap = map;

    map.on("load", () => {
      map.addSource('takamatsu', {
        type: 'vector',
        url: "https://tileserver.geolonia.com/takamatsu_main_v0/tiles.json?key=YOUR-API-KEY"
      });

      setMap(map);
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point).filter(feature => feature.source === 'takamatsu');
      if(features.length === 0) {
        return
      }
      setSelectedFeatures(features.map(feature => {
        return {
          catalog: catalogData.find(item => item.class === feature.properties.class)!,
          properties: feature.properties,
        }
      }));
    });

    return () => {
      map.remove();
    };
  }, [catalogData, mapContainer, setMap, setSelectedFeatures]);

  useEffect(() => {
    if (!map) return;

    for (const definition of catalogData) {
      const layer = definition.class;
      const isSelected = selectedLayers.includes(layer);

      for (const [sublayerName, template] of LAYER_TEMPLATES) {
        const fullLayerName = `takamatsu/${layer}/${sublayerName}`;
        const mapLayer = map.getLayer(fullLayerName);
        if (!mapLayer && isSelected) {
          map.addLayer({
            ...template,
            filter: ["all", ["==", "$type", sublayerName], ["==", "class", layer]],
            id: fullLayerName,
          });
        } else if (mapLayer && !isSelected) {
          map.removeLayer(fullLayerName);
        }
      }
    }
  }, [map, catalogData, selectedLayers]);

  return (
    <div
      className='map'
      ref={mapContainer}
      data-lang="ja"
      data-navigation-control="on"
      data-gesture-handling="off"
    ></div>
  );
}

export default MainMap;
