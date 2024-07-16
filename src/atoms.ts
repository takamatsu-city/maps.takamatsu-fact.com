import { atom } from 'jotai'
import { atomWithHash } from 'jotai-location';
import { decodeLayerList, encodeLayerList } from './utils/urlEncoding';
import { getCatalog, CatalogFeature } from './api/catalog';
import { getThirdPartyCatalog } from './api/thirdPartyCatalog';

export const selectedLayersAtom = atomWithHash<string[]>(
  'layers', [], {
    serialize: (value) => encodeLayerList(value),
    deserialize: (value) => decodeLayerList(value),
    setHash: (params) => {
      // Replace %2F with / to make Maplibre happy
      const searchParams = params.replaceAll('%2F', '/');
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}#${searchParams}`,
      );
    }
  }
);

export const selectedThirdPartLayersAtom = atom<string[]>([]);

export const selectedFeaturesAtom = atom<CatalogFeature[]>([]);

export const catalogDataAtom = atom(getCatalog);
export const thirdPartyCatalogAtom = atom(getThirdPartyCatalog);

export const mapObjAtom = atom<maplibregl.Map | undefined>(undefined);
