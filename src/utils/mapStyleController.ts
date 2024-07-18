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

        const newStyle = {
            ...previousStyle,
            sources: {
              ...previousStyle.sources,
              ...sources
            },
            layers: [
              ...previousStyle.layers,
              ...nextStyle.layers.filter(layer => layers.includes(layer.id))
            ]
        };

        return newStyle;
      }
    });
};


/* ******************
 * スタイルを削除する
 * ******************/
export const removeLayerStyle = (mapObj: maplibregl.Map, layers: string[], sourceId: string) => {
    mapObj.setStyle(mapObj.getStyle(), {
      transformStyle: (previousStyle, nextStyle) => {
        if(!previousStyle) { return nextStyle; }
        if(!nextStyle) { return previousStyle; }
        delete previousStyle.sources[sourceId];
        return {
          ...previousStyle,
          layers: [
            ...nextStyle.layers.filter(layer => !layers.includes(layer.id))
          ]
        };
      }
    });
};