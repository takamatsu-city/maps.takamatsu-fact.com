import { useEffect, useMemo, useRef, useState } from 'react';
import type * as maplibregl from 'maplibre-gl';
import { CatalogDataItem, CatalogFeature, walkCategories } from './api/catalog';
import { CustomStyle, customStyleToLineStringTemplate, customStyleToPointTemplate, customStyleToPolygonTemplate, DEFAULT_LINESTRING_STYLE, DEFAULT_POINT_STYLE, DEFAULT_POLYGON_STYLE, getCustomStyle, LayerTemplate, WEB_COLORS } from './utils/mapStyling';
import CityOS__Takamatsu from './cityos/cityos_takamatsu';

import { FaMountain } from "react-icons/fa";

import { mapObjAtom, selectedThirdPartyLayersAtom, thirdPartyCatalogAtom } from './atoms';

import mapStyleConfig from './config/mapStyleConfig.json';
import classNames from 'classnames';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { catalogDataAtom, selectedFeaturesAtom, selectedLayersAtom } from './atoms';
import { MapStyleConfigType } from './config/mapStyleConfig';
import { useSearchParams } from 'react-router-dom';
import { addLayerStyle, removeLayerStyle } from './utils/mapStyleController';
import { ThirdPartyCatalogDataItem, walkThirdPartyCategories } from './api/thirdPartyCatalog';
import { moveMaskLayer2Top } from './utils/moveMaskLayer2Top';

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

const BASE_PITCH = 0;

export const SOURCES: {[key: string]: string} = {
  MUNICIPALITY_ID: 'takamatsu',
  TERRAIN_DEM_ID: 'gsidem',
  NEGATIVE_MASK_ID: 'negative-city-mask',
  KIHONZU: 'kihonzu',
}

interface Props {
  selectedBaseMap: MapStyleConfigType | undefined;
  setSelectedBaseMap: React.Dispatch<React.SetStateAction<MapStyleConfigType | undefined>>;
}

const MainMap: React.FC<Props> = (props) => {
  const { selectedBaseMap, setSelectedBaseMap } = props;
  // const [map, setMap] = useState<maplibregl.Map | undefined>(undefined);
  const selectedLayers = useAtomValue(selectedLayersAtom);
  const setSelectedFeatures = useSetAtom(selectedFeaturesAtom);
  const catalogData = useAtomValue(catalogDataAtom);
  const thirdPartyCatalogData = useAtomValue(thirdPartyCatalogAtom);
  const [cityOS, setCityOS] = useState<CityOS__Takamatsu | undefined>(undefined);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [show3dDem, setShow3dDem] = useState<boolean>(false);
  const [pitch, setPitch] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [map, setMap] = useAtom(mapObjAtom);
  const [ selectedThirdPartLayers, setSelectedThirdPartLayers ] = useAtom(selectedThirdPartyLayersAtom);

  const catalogDataItems = useMemo(() => {
    return [...walkCategories(catalogData)];
  }, [catalogData]);

  const thirdPartySource = useMemo(() => {
    return [...walkThirdPartyCategories(thirdPartyCatalogData)];
  }, [thirdPartyCatalogData]);


  /* ***************
   * 3Dボタンクリック時処理
   * ***************/
  const onClick3dBtn = async () => {
    if(!map) { return; }
    const newPitch = show3dDem ? 0 : 60;
    map.flyTo({ pitch: newPitch });
  }

  const { initialCenter, initialZoom, initialPitch, initialBaseMap } = useMemo(() => {
    const center = searchParams.get('center')?.split('/').map(v => parseFloat(v));
    const zoomStr = searchParams.get('zoom');
    const pitch = searchParams.get('pitch');
    const zoom = zoomStr ? parseFloat(zoomStr) : undefined;
    const baseMap = searchParams.get('baseMap');
    const selectedFeature = searchParams.get('feature');
    return {
      initialCenter: center || [134.046550, 34.342788],
      initialZoom: zoom || 11,
      initialPitch: pitch ? parseFloat(pitch) : 0,
      initialBaseMap: baseMap ? baseMap : undefined,
      initialSelectedFeature: selectedFeature ? selectedFeature : undefined
    };
  }, [searchParams]);


  useEffect(() => {
    if(!map) {
      const target = mapStyleConfig.find((style) => style.id === initialBaseMap);
      const baseMap = target ? target : mapStyleConfig[0];
      setSelectedBaseMap(baseMap);

      const map: maplibregl.Map = new window.geolonia.Map({
        container: mapContainer.current,
        style: baseMap.endpoint,
        hash: 'map',
        fitBoundsOptions: { padding: 50 },
        center: initialCenter as maplibregl.LngLatLike,
        // 意図せず傾き・回転を変更してしまうことを防ぐ
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        maxRotate: 0,
        pitch: initialPitch,
        zoom: initialZoom,
        minZoom: 9,
        localIdeographFontFamily: 'sans-serif'
      });

      (window as any)._mainMap = map;

      const cityOS = new CityOS__Takamatsu(map);
      setCityOS(cityOS);

      map.on("load", async () => {

        // Start add GSI DEM
        if (!map.getSource('gsidem')) {
          map.addSource('gsidem', {
            type: 'raster-dem',
            url: 'https://tileserver.geolonia.com/gsi-dem/tiles.json?key=YOUR-API-KEY',
          });
        }
        // End add GSI DEM

        // マスクレイヤーの追加
        if (!map.getSource(SOURCES.NEGATIVE_MASK_ID)) {
          map.addSource(SOURCES.NEGATIVE_MASK_ID, {
            type: 'vector',
            url: 'https://tileserver.geolonia.com/takamatsu_negative_mask/tiles.json?key=YOUR-API-KEY',
          });
          map.addLayer({
            id: `${SOURCES.NEGATIVE_MASK_ID}-layer`,
            source: SOURCES.NEGATIVE_MASK_ID,
            'source-layer': 'negativecitymask',
            type: 'fill',
            paint: {
              'fill-color': '#0079C4',
              'fill-opacity': .3,
            }
          });
          map.addLayer({
            id: `${SOURCES.NEGATIVE_MASK_ID}-layer-border`,
            source: SOURCES.NEGATIVE_MASK_ID,
            'source-layer': 'negativecitymask',
            type: 'line',
            paint: {
              'line-color': '#0079C4',
              'line-opacity': 0.5,
              'line-width': 2,
            }
          });
        }

        if (!map.getSource(SOURCES.MUNICIPALITY_ID)) {
          map.addSource(SOURCES.MUNICIPALITY_ID, {
            type: 'vector',
            url: "https://tileserver.geolonia.com/takamatsu_main_v0_1/tiles.json?key=YOUR-API-KEY"
          });
        }

        if (!map.getSource(SOURCES.KIHONZU)) {
          map.addSource(SOURCES.KIHONZU, {
            type: 'vector',
            url: "https://tileserver.geolonia.com/takamatsu_kihonzu_v1/tiles.json?key=YOUR-API-KEY"
          });
        }

        const initialPitch = map.getPitch();
        setPitch(initialPitch);
        setShow3dDem(initialPitch > 0);

        setMap(map);
      });

      map.on('click', (e) => {
        const features = map
          .queryRenderedFeatures(e.point)
          .filter(feature => (
            feature.source === 'takamatsu' ||
            feature.source === 'kihonzu' ||
            feature.source === 'ksj_takamatsu' || // 国土数値情報のデータを含める
            feature.properties._viewer_selectable === true
          ));
        if (features.length === 0) {
          setSelectedFeatures([]);
          return;
        }

        setSelectedFeatures(features.map(feature => {
          const catalogData = catalogDataItems.find(item => (
            item.type === "DataItem" && (
              ((feature.source === 'takamatsu' || feature.properties._viewer_selectable === true) && (item as CatalogDataItem).class === feature.properties.class) ||
              ('customDataSource' in item && item.customDataSource === feature.source)
            )
          )) as CatalogDataItem;

          // 市区町村とサードパーティのデータどちらも対象にする
          const thirdPartyData = thirdPartySource.find(item => item.layers.includes(feature.layer.id));
          const mergedCatalog: CatalogDataItem = {
            ...catalogData,
            ...thirdPartyData
          };

          if (!mergedCatalog) {
            throw new Error(`Catalog data not available for feature: ${feature}`);
          }

          return {
            catalog: mergedCatalog,
            properties: feature.properties,
          } as CatalogFeature;
        }));
      });

      map.on('pitchend', (e) => {
        setPitch(e.target.getPitch());
      })
    }

  }, [catalogDataItems, mapContainer, setMap, setSelectedFeatures, setSelectedBaseMap, thirdPartyCatalogData, map, initialCenter, initialPitch, initialZoom, initialBaseMap, thirdPartySource]);


  /* ***************
   * 3D表示の切り替え
   * ***************/
  useEffect(() => {
    if(!map) { return; }
    if(pitch === BASE_PITCH && map.getLayer(SOURCES.TERRAIN_DEM_ID)) {
      map.removeLayer(SOURCES.TERRAIN_DEM_ID);
      map.setTerrain({ 'source': SOURCES.TERRAIN_DEM_ID, 'exaggeration': 0 });
      setShow3dDem(false);

    } else if(pitch > BASE_PITCH && !map.getLayer(SOURCES.TERRAIN_DEM_ID)) {
      map.addLayer({
        id: SOURCES.TERRAIN_DEM_ID,
        type: 'hillshade',
        source: SOURCES.TERRAIN_DEM_ID,
        paint: {
          'hillshade-exaggeration': 0.5,
          'hillshade-shadow-color': 'rgba(71, 59, 36, 0.1)',
        }
      });
      map.setTerrain({ 'source': SOURCES.TERRAIN_DEM_ID, 'exaggeration': 1 });
      setShow3dDem(true);
    }

  }, [map, pitch])


  /* ***************
   * ベースマップ選択時の処理
   * ***************/
  useEffect(() => {
    if (!map || !selectedBaseMap || !map.getStyle()) { return; }
    const baseMap = selectedBaseMap;
    const nowSources: {[key: string]: any} = {};
    const nowLayers: any[] = [];

    Object.keys(map.getStyle().sources).forEach(key => {
      // 表示されているデータを取得
      //（selectedLayersは、shortIdが入っていて比較ができない為、catalogDataと比較）
      const isSelectedThirdParty = (thirdPartySource as ThirdPartyCatalogDataItem[]).some( data => key === data.sourceId );
      if(
        catalogData.some(data => key.includes(data.id)) ||
        Object.keys(SOURCES).some(id => key.includes(SOURCES[id])) ||
        isSelectedThirdParty
      ) {
        nowSources[key] = map.getStyle().sources[key];
        nowLayers.push(...map.getStyle().layers.filter(layer =>
          (layer as any).source === key
        ));
      }
    });

    map.setStyle(baseMap.endpoint, {
      diff: false,
      transformStyle: (previousStyle, nextStyle) => {
        if(!previousStyle) { return nextStyle; }
        const newStyle = {
          ...previousStyle,
          ...nextStyle,
          sources: {
            ...nextStyle.sources,
            ...nowSources
          },
          layers: [
            ...nextStyle.layers,
            ...nowLayers
          ]
        };

        return moveMaskLayer2Top(newStyle);
      }
    });

    if(selectedBaseMap.id === 'satellite') {
      setSelectedThirdPartLayers(selectedThirdPartLayers.filter(layer => !layer.includes('Osm')));
    }

    setSearchParams((prev) => {
      prev.set('baseMap', baseMap.id);
      return prev;
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, catalogData, setSearchParams, selectedBaseMap]);

  /* ***************
   * map.getStyle()が表示されるのを待つ処理
   * ***************/
  function waitForMapStyle(map: any): Promise<any> {
    return new Promise((resolve) => {
      const checkMapStyle = () => {
        if (map && map.getStyle()) {
          resolve(map);
        } else {
          setTimeout(checkMapStyle, 100); // 100ms待機して再度確認
        }
      };
      checkMapStyle();
    });
  }


  /* ***************
   * データの表示非表示
   * ***************/
  useEffect(() => {
    if (!map) return;

    // map.getStyle()がtrueになるまで待つ
    waitForMapStyle(map).then((map) => {
      (async () => {
        let index = -1;
        for (const data of walkCategories(catalogData)) {
          index += 1;
          const definition = data;

          const definitionId = definition.id;
          const isSelected = selectedLayers.includes(definition.shortId);

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
            const mapLayers = map.getStyle().layers.filter((layer: any) => layer.id.startsWith(fullLayerName));
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
                map.addLayer(layerConfig);

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
    });
  }, [map, catalogData, selectedLayers, cityOS, selectedBaseMap]);



  /* ***************
   * サードパーティーデータの表示非表示
   * ***************/
  useEffect(() => {
    if (!map || !map.getStyle() || !map.getStyle().layers) return;

    const processCategory = (data: any) => {
      if (data.type === 'Category') {
        data.items.forEach((item: { type: string; shortId: string; layers: string[]; sourceId: string }) => {
          if (item.type === 'Category') {
            processCategory(item);
          } else {
            // DataItemの場合の処理
            if(!data.style || data.style === '') { return; }
            const isSelect = selectedThirdPartLayers.includes(item.shortId);
            if(isSelect) {
              // 選択されていたら、レイヤーを追加
              addLayerStyle(map, data.style, item.layers as string[], item.sourceId)
            } else {
              // 選択されていなかったら、レイヤーを削除
              removeLayerStyle(map, item.layers as string[], item.sourceId);
            }
          }
        });
      }
    };

    // 全てのデータに対して再帰的に処理を実行
    for (const data of thirdPartyCatalogData) {
      processCategory(data);
    }

  }, [map, selectedThirdPartLayers, thirdPartyCatalogData]);


  return (
    <>
    <button onClick={onClick3dBtn} className={classNames({'controlBtn': true, 'select': show3dDem})}>
      <FaMountain />
    </button>
    <div
      className='map'
      ref={mapContainer}
      data-lang="ja"
      data-navigation-control="on"
      data-gesture-handling="off"
    ></div>
    </>
  );
}

export default MainMap;
