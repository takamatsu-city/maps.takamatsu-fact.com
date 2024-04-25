// 参照: https://developer.mozilla.org/en-US/docs/Glossary/Base64

function base64ToString(input: string) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const binString = atob(base64);
  const u8 = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
  return new TextDecoder().decode(u8);
}

function stringToBase64(input: string) {
  const bytes = new TextEncoder().encode(input);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function encodeLayerList(layerList: string[]) {
  return stringToBase64(layerList.join('\n'));
}

export function decodeLayerList(url: string) {
  try {
    return base64ToString(url).split('\n');
  } catch (e) {
    console.error('Failed to decode layer list, resetting...', e);
    return [];
  }
}
