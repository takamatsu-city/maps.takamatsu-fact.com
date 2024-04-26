export function encodeLayerList(layerList: string[]): string {
  const filtered = layerList.filter((v) => v.length > 0);
  if (filtered.every((v) => v.length === 3)) {
    return layerList.join('');
  } else {
    return layerList.join(',');
  }
}

export function decodeLayerList(encoded: string): string[] {
  try {
    if (encoded.length % 3 === 0 && encoded.indexOf(',') === -1) {
      // split by 3 characters
      return encoded.match(/.{3}/g) || [];
    } else {
      return encoded.split(',');
    }
  } catch (e) {
    console.error('Failed to decode layer list, resetting...', e);
    return [];
  }
}
