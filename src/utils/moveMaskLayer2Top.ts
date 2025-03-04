import { SOURCES } from '../MainMap';

export const moveMaskLayer2Top = (newStyle: any) => {

  // マスクレイヤーを最後に移動
  const NEGATIVE_MASK_LAYER_ID = `${SOURCES.NEGATIVE_MASK_ID}-layer`;
  const negativeMaskLayerIndex = newStyle.layers.findIndex((layer: { id: string }) => layer.id === NEGATIVE_MASK_LAYER_ID);
  if (negativeMaskLayerIndex !== -1) {
    const negativeMaskLayer = newStyle.layers.splice(negativeMaskLayerIndex, 1)[0];
    newStyle.layers.push(negativeMaskLayer);
  }
  return newStyle;
}
