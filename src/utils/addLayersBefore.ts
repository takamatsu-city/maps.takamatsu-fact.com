export const addLayersBefore = (map: maplibregl.Map, previousLayers: any[], layersToAdd: any[], beforeId?: string) => {

  const newLayers = [...previousLayers];

  if (beforeId) {
    const referenceLayerIndex = previousLayers.findIndex(layer => layer.id === beforeId);

    if (referenceLayerIndex !== -1) {
      newLayers.splice(referenceLayerIndex + 1, 0, ...layersToAdd);
      return newLayers;
    }
  }

  newLayers.push(...layersToAdd);
  return newLayers;
};
