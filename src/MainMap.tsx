import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type * as maplibregl from 'maplibre-gl';
import { CatalogFeature, CatalogItem, walkCategories } from './api/catalog';
import { CustomStyle, customStyleToLineStringTemplate, customStyleToPointTemplate, customStyleToPolygonTemplate, DEFAULT_LINESTRING_STYLE, DEFAULT_POINT_STYLE, DEFAULT_POLYGON_STYLE, getCustomStyle, LayerTemplate, WEB_COLORS } from './utils/mapStyling';
import CityOS__Takamatsu from './cityos/cityos_takamatsu';

import mapStyle from './style.json';

declare global {
  interface Window {
    geolonia: any;
  }
}

const LAYER_TEMPLATES: [string, (idx: number, customStyle?: CustomStyle[]) => LayerTemplate[]][] = [
  [ "Polygon", (i, customStyle) => {
    const color = WEB_COLORS[i * 1999 % WEB_COLORS.length];
    return customStyle ?
      customStyle.flatMap((style) => customStyleToPolygonTemplate(style, color)) :
      DEFAULT_POLYGON_STYLE(color);
  } ],
  [ "LineString", (i, customStyle) => {
    const color = WEB_COLORS[i * 1999 % WEB_COLORS.length];
    return customStyle ?
      customStyle.flatMap((style) => customStyleToLineStringTemplate(style, color)) :
      DEFAULT_LINESTRING_STYLE(color);
  }],
  [ "Point", (i, customStyle) => {
    const color = WEB_COLORS[i * 1999 % WEB_COLORS.length];
    return customStyle ?
      customStyle.flatMap((style) => customStyleToPointTemplate(style, color)) :
      DEFAULT_POINT_STYLE(color);
  }],
];

interface Props {
  catalogData: CatalogItem[];
  selectedLayers: string[];
  setSelectedFeatures: React.Dispatch<React.SetStateAction<CatalogFeature[]>>
}

const MainMap: React.FC<Props> = ({catalogData, selectedLayers, setSelectedFeatures}) => {
  const [map, setMap] = useState<maplibregl.Map | undefined>(undefined);
  const [cityOS, setCityOS] = useState<CityOS__Takamatsu | undefined>(undefined);
  const mapContainer = useRef<HTMLDivElement>(null);

  const catalogDataItems = useMemo(() => {
    return [...walkCategories(catalogData)];
  }, [catalogData]);

  useLayoutEffect(() => {
    const map: maplibregl.Map = new window.geolonia.Map({
      container: mapContainer.current,
      // style: `${process.env.PUBLIC_URL}/style.json`,
      style: mapStyle,
      hash: true,
      center: [ 134.0403, 34.334 ],
      fitBoundsOptions: { padding: 50 },
      maxRotate: 0,
      minZoom: 9,
      zoom: 9.2,
    });

    (window as any)._mainMap = map;

    const cityOS = new CityOS__Takamatsu(map);
    setCityOS(cityOS);

    map.on("load", () => {

      // start GSI base map modification
      for (const layer of map.getStyle().layers!) {
        const id = layer.id;
        // レイヤーを削除
        if (id.startsWith("oc-") || id === 'poi-z16' || id === 'poi-z16-primary' || (layer.metadata as any || {})['visible-on-3d']) {
          map.removeLayer(layer.id);
        } else if ("source-layer" in layer) {
          const sl = layer["source-layer"];
          const id = layer.id;

          if (sl === "landcover" || sl === "landuse" || sl === "building") {

            // landcover-wood は表示する
            if (id === "landcover-wood") {
              continue;
            }

            map.removeLayer(layer.id);
          }
        }
      }
      // end GSI base map modification

      // Start add GSI DEM
      map.addSource('gsidem', {
        type: 'raster-dem',
        url: 'https://tileserver.geolonia.com/gsi-dem/tiles.json?key=YOUR-API-KEY',
      });

      map.addLayer({
        id: 'takamatsu-dem',
        type: 'hillshade',
        source: 'gsidem',
        paint: {
          'hillshade-exaggeration': 0.5,
          'hillshade-shadow-color': 'rgba(71, 59, 36, 0.1)',
        }
      },'park');

      map.setTerrain({ 'source': 'gsidem', 'exaggeration': 1 });
      // End add GSI DEM

      map.addSource('negative-city-mask', {
        type: 'vector',
        url: 'https://tileserver.geolonia.com/takamatsu_negative_mask/tiles.json?key=YOUR-API-KEY',
      })
      map.addLayer({
        id: 'negative-city-mask-layer',
        source: 'negative-city-mask',
        'source-layer': 'negativecitymask',
        type: 'fill',
        paint: {
          'fill-color': '#0079C4',
          'fill-opacity': .3,
        }
      });
      map.addLayer({
        id: 'negative-city-mask-layer-border',
        source: 'negative-city-mask',
        'source-layer': 'negativecitymask',
        type: 'line',
        paint: {
          'line-color': '#0079C4',
          'line-opacity': 0.5,
          'line-width': 2,
        }
      })

      map.addSource('takamatsu', {
        type: 'vector',
        url: "https://tileserver.geolonia.com/takamatsu_main_v0/tiles.json?key=YOUR-API-KEY"
      });
      map.addSource('kihonzu', {
        type: 'vector',
        url: "https://tileserver.geolonia.com/takamatsu_kihonzu_v1/tiles.json?key=YOUR-API-KEY"
      });

      setMap(map);
    });

    map.on('click', (e) => {
      const features = map
        .queryRenderedFeatures(e.point)
        .filter(feature => (
          feature.source === 'takamatsu' ||
          feature.source === 'kihonzu' ||
          feature.properties._viewer_selectable === true
        ));
      if (features.length === 0) {
        setSelectedFeatures([]);
        return;
      }
      setSelectedFeatures(features.map(feature => {
        const catalogData = catalogDataItems.find(item => (
          item.type === "DataItem" && (
            ((feature.source === 'takamatsu' || feature.properties._viewer_selectable === true) && item.class === feature.properties.class) ||
            ('customDataSource' in item && item.customDataSource === feature.source)
          )
        ));
        if (!catalogData) {
          throw new Error(`Catalog data not available for feature: ${feature}`);
        }
        return {
          catalog: catalogData,
          properties: feature.properties,
        };
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
      let index = -1;
      for (const definition of walkCategories(catalogData)) {
        index += 1;
        if (shouldStop) return;

        const definitionId = definition.id;
        const isSelected = selectedLayers.includes(definitionId);

        if ("liveLocationId" in definition) {
          if (isSelected) {
            const color = WEB_COLORS[index * 1999 % WEB_COLORS.length];
            // CityOS SDK will take care of the data fetching
            // and the map will be updated automatically.
            // But we have to add a style layer to the map manually.
            const sourceId = cityOS?.addLiveDataSet(definition.liveLocationId, {
              featureFilter: (feature) => {
                feature.properties ||= {};
                feature.properties.class = definition.class;
                feature.properties!._viewer_selectable = true;
                return feature;
              }
            });
            if (sourceId) {
              map.addLayer({
                id: `${sourceId}-points`,
                type: 'circle',
                source: sourceId,
                paint: {
                  'circle-radius': 7,
                  'circle-color': color,
                  'circle-opacity': .8,
                  'circle-stroke-width': 1,
                  'circle-stroke-color': 'gray',
                  'circle-stroke-opacity': 1,
                }
              });
            }
          } else {
            cityOS?.removeLiveDataSet(definition.liveLocationId);
          }
          continue;
        }

        let geojsonEndpoint: string | undefined = undefined;
        if ("geojsonEndpoint" in definition) {
          // this is a GeoJSON layer
          geojsonEndpoint = definition.geojsonEndpoint;

          const mapSource = map.getSource(definitionId);
          if (!mapSource && isSelected) {
            const geojsonResp = await fetch(geojsonEndpoint);
            const geojson = await geojsonResp.json();
            for (const feature of geojson.features) {
              feature.properties.class = definition.class;
              feature.properties._viewer_selectable = true;
            }
            map.addSource(definitionId, {
              type: 'geojson',
              data: geojson,
            });
          }
        }

        for (const [sublayerName, template] of LAYER_TEMPLATES) {
          const fullLayerName = `takamatsu/${definitionId}/${sublayerName}`;
          const mapLayers = map.getStyle().layers.filter((layer) => layer.id.startsWith(fullLayerName));
          const customStyle = getCustomStyle(definition);
          for (const subtemplate of template(index, customStyle)) {
            if (mapLayers.length === 0 && isSelected) {
              const filterExp: maplibregl.FilterSpecification = ["all", ["==", "$type", sublayerName]];
              if (definition.class) {
                filterExp.push(["==", "class", definition.class]);
              }
              if (subtemplate.filter) {
                filterExp.push(subtemplate.filter as any);
              }
              const layerConfig: maplibregl.LayerSpecification = {
                ...subtemplate,
                filter: filterExp,
                id: fullLayerName + subtemplate.id,
              };
              if (geojsonEndpoint) {
                layerConfig.source = definitionId;
                delete layerConfig['source-layer'];
              } else if ('customDataSource' in definition) {
                layerConfig.source = definition.customDataSource;
                layerConfig['source-layer'] = definition.customDataSourceLayer || definition.customDataSource;
              }
              map.addLayer(layerConfig, 'poi');
              if (!map.getLayer(layerConfig.id)) {
                console.error(`Failed to add layer ${layerConfig.id}!!!`);
                debugger;
              }
            } else if (mapLayers.length > 0 && !isSelected) {
              for (const mapLayer of mapLayers) {
                map.removeLayer(mapLayer.id);
              }
            }
          }
        }
      }
    })();

    return () => {
      shouldStop = true;
    }
  }, [map, catalogData, selectedLayers, cityOS]);

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
