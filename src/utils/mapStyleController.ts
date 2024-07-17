/* ******************
 * スタイルを追加する
 * ******************/
export const addLayerStyle = (mapObj: maplibregl.Map, style: string, layers: string[]) => {
    mapObj.setStyle(style, {
      transformStyle: (previousStyle, nextStyle) => {
        if(!previousStyle) { return nextStyle; }
        if(!nextStyle) { return previousStyle; }
        return {
          ...previousStyle,
          layers: [
            ...previousStyle.layers,
            ...nextStyle.layers.filter(layer => layers.includes(layer.id))
          ]
        };
      }
    });
};


/* ******************
 * スタイルを削除する
 * ******************/
export const removeLayerStyle = (mapObj: maplibregl.Map, layers: string[]) => {
    mapObj.setStyle(mapObj.getStyle(), {
      transformStyle: (previousStyle, nextStyle) => {
        if(!previousStyle) { return nextStyle; }
        if(!nextStyle) { return previousStyle; }
        return {
          ...nextStyle,
          layers: [
            ...nextStyle.layers.filter(layer => !layers.includes(layer.id))
          ]
        };
      }
    });
};