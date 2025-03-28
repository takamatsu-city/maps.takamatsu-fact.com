import { addLayersBefore } from './addLayersBefore';
import { moveMaskLayer2Top } from './moveMaskLayer2Top';

/* ******************
 * スタイルを追加する
 * ******************/
export const addLayerStyle = (mapObj: maplibregl.Map, style: string, layers: string[], sourceId: string) => {

    const sources: { [key: string]: any } = {};

    mapObj.setStyle(style, {
      transformStyle: (previousStyle, nextStyle) => {
        if(!previousStyle) { return nextStyle; }
        if(!nextStyle) { return previousStyle; }

        Object.keys(nextStyle.sources).forEach(key => {
            if(key === sourceId) { sources[key] = nextStyle.sources[key]; }
        });

        const layersToAdd = nextStyle.layers.filter(layer => layers.includes(layer.id));
        const updatedLayers = addLayersBefore(previousStyle.layers, layersToAdd, '注記シンボル付き重なり');
        const moveMaskToTopLayers = moveMaskLayer2Top(updatedLayers);

        return {
            ...previousStyle,
            sources: {
              ...previousStyle.sources,
              ...sources
            },
            layers: moveMaskToTopLayers
        };
      }
    });
};


/* ******************
 * スタイルを削除する
 * ******************/
export const removeLayerStyle = (mapObj: maplibregl.Map, layers: string[], sourceId: string) => {
  for (const layer of layers) {
    mapObj.removeLayer(layer);
  }
};
