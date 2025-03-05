import { SOURCES } from '../MainMap';

export const moveMaskLayer2Top = (layers: any) => {

  const newLayers = [...layers];
  // マスクレイヤーを最後に移動
  const NEGATIVE_MASK_LAYER_ID = `${SOURCES.NEGATIVE_MASK_ID}-layer`;
  const NEGATIVE_MASK_LAYER_BORDER_ID = `${SOURCES.NEGATIVE_MASK_ID}-layer-border`;

  const negativeMaskLayerIndex = newLayers.findIndex((layer: { id: string }) => layer.id === NEGATIVE_MASK_LAYER_ID);
  const negativeMaskLayerBorderIndex = newLayers.findIndex((layer: { id: string }) => layer.id === NEGATIVE_MASK_LAYER_BORDER_ID);

  if (negativeMaskLayerIndex !== -1 && negativeMaskLayerBorderIndex !== -1) {
    const negativeMaskLayer = newLayers.splice(negativeMaskLayerIndex, 1);
    newLayers.push(negativeMaskLayer[0]);
    const negativeMaskLayerBorder = newLayers.splice(negativeMaskLayerBorderIndex, 1);
    newLayers.push(negativeMaskLayerBorder[0]);
  }
  return newLayers;
}
