import { encodeLayerList, decodeLayerList } from "./urlEncoding";

describe('urlEncoding', () => {
  test('should encode and decode layer list', () => {
    const layerList = ['001', '002', '003'];
    const encoded = encodeLayerList(layerList);
    expect(encoded).toBe('001002003');

    const decoded = decodeLayerList(encoded);
    expect(decoded).toEqual(layerList);
  });

  test('should use comma for irregular IDs', () => {
    const layerList = ['hello', 'world'];
    const encoded = encodeLayerList(layerList);
    expect(encoded).toBe('hello,world');

    const decoded = decodeLayerList(encoded);
    expect(decoded).toEqual(layerList);
  });
});
