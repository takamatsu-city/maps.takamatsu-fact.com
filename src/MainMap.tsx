import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type * as maplibregl from 'maplibre-gl';
import { CatalogFeature, CatalogItem, walkCategories } from './api/catalog';
import { lineWidth_thin, WEB_COLORS } from './utils/mapStyling';

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

const LAYER_TEMPLATES: [string, (idx: number) => LayerTemplate[]][] = [
  [ "Polygon", (i) => {
    const color = WEB_COLORS[i * 1999 % WEB_COLORS.length];
    return [
      {
        id: "",
        source: "takamatsu",
        "source-layer": "main",
        type: "fill",
        paint: {
          "fill-color": color,
          "fill-opacity": 0.3,
        },
      },
      {
        id: "/outline",
        source: "takamatsu",
        "source-layer": "main",
        type: "line",
        paint: {
          "line-color": color,
          "line-width": lineWidth_thin,
        },
      },
    ]
  } ],
  [ "LineString", (i) => {
    const color = WEB_COLORS[i * 1999 % WEB_COLORS.length];
    return [{
      id: "",
      source: "takamatsu",
      "source-layer": "main",
      type: "line",
      paint: {
        "line-color": color,
        "line-width": lineWidth_thin,
      },
    }]
  }],
  [ "Point", (i) => {
    const color = WEB_COLORS[i * 1999 % WEB_COLORS.length];
    return [{
      id: "",
      source: "takamatsu",
      "source-layer": "main",
      type: "circle",
      paint: {
        'circle-radius': 7,
        'circle-color': color,
        'circle-opacity': .8,
        'circle-stroke-width': 1,
        'circle-stroke-color': 'gray',
        'circle-stroke-opacity': 1,
      }
    }]
  }],
];

interface Props {
  catalogData: CatalogItem[];
  selectedLayers: string[];
  setSelectedFeatures: React.Dispatch<React.SetStateAction<CatalogFeature[]>>
}

const MainMap: React.FC<Props> = ({catalogData, selectedLayers, setSelectedFeatures}) => {
  const [map, setMap] = useState<maplibregl.Map | undefined>(undefined);
  const mapContainer = useRef<HTMLDivElement>(null);

  const catalogDataItems = useMemo(() => {
    return [...walkCategories(catalogData)];
  }, [catalogData]);

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
      const features = map
        .queryRenderedFeatures(e.point)
        .filter(feature => feature.source === 'takamatsu' || feature.properties._viewer_selectable === true);
      if (features.length === 0) {
        setSelectedFeatures([]);
        return;
      }
      setSelectedFeatures(features.map(feature => {
        return {
          catalog: catalogDataItems.find(item => item.type === "DataItem" && item.class === feature.properties.class)!,
          properties: feature.properties,
        }
      }));
    });

    return () => {
      map.remove();
    };
  }, [catalogDataItems, mapContainer, setMap, setSelectedFeatures]);

  useEffect(() => {
    if (!map) return;

    let shouldStop = false;
    (async () => {
      let index = 0;
      for (const definition of walkCategories(catalogData)) {
        if (shouldStop) return;

        const layer = definition.class;
        const isSelected = selectedLayers.includes(layer);

        let geojsonEndpoint: string | undefined = undefined;
        if ("geojsonEndpoint" in definition) {
          // this is a GeoJSON layer
          geojsonEndpoint = definition.geojsonEndpoint;

          const mapSource = map.getSource(layer);
          if (!mapSource && isSelected) {
            const geojsonResp = await fetch(geojsonEndpoint);
            const geojson = await geojsonResp.json();
            for (const feature of geojson.features) {
              feature.properties.class = layer;
              feature.properties._viewer_selectable = true;
            }
            map.addSource(layer, {
              type: 'geojson',
              data: geojson,
            });
          }
        }

        for (const [sublayerName, template] of LAYER_TEMPLATES) {
          const fullLayerName = `takamatsu/${layer}/${sublayerName}`;
          const mapLayer = map.getLayer(fullLayerName);
          for (const subtemplate of template(index)) {
            if (!mapLayer && isSelected) {
              const layerConfig: maplibregl.LayerSpecification = {
                ...subtemplate,
                filter: ["all", ["==", "$type", sublayerName], ["==", "class", layer]],
                id: fullLayerName + subtemplate.id,
              };
              if (geojsonEndpoint) {
                layerConfig.source = layer;
                delete layerConfig['source-layer'];
              }
              map.addLayer(layerConfig);
            } else if (mapLayer && !isSelected) {
              map.removeLayer(fullLayerName + subtemplate.id);
            }
          }
        }

        index += 1;
      }
    })();

    return () => {
      shouldStop = true;
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
