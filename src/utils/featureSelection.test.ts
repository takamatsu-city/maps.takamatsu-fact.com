import catalog from '../../public/api/catalog.json';
import { isPopupTarget, SelectionSources } from './featureSelection';

const sources: SelectionSources = {
  noPopupIds: ['地番現況図'],
  customDataSourceIds: [],
  tileUrlIds: ['盛土規制法/届出盛土', '盛土規制法/許可盛土', '地番現況図'],
  thirdPartySourceIds: [],
  builtInSourceIds: ['takamatsu'],
};

const feature = (source: string, properties: Record<string, unknown> | null = {}) => ({
  source,
  properties,
});

describe('クリックした地物を属性パネルに出すかの判定', () => {
  // 届出盛土は実体が Point。かつて「tileUrl のレイヤーの Point はラベルの代表点」という
  // 前提で Point を一律に除外しており、属性パネルが開かなくなっていた（2026-09-30〜10-13 の本番）。
  test('届出盛土(独自タイル・実体がPoint)は対象になる', () => {
    expect(isPopupTarget(feature('盛土規制法/届出盛土'), sources)).toBe(true);
  });

  test('許可盛土(独自タイル・Polygon)は対象になる', () => {
    expect(isPopupTarget(feature('盛土規制法/許可盛土'), sources)).toBe(true);
  });

  test('disablePopup のレイヤーは対象外になる', () => {
    expect(isPopupTarget(feature('地番現況図'), sources)).toBe(false);
  });

  test('どのソース一覧にも無いレイヤーは対象外になる', () => {
    expect(isPopupTarget(feature('知らないソース'), sources)).toBe(false);
  });

  test('_viewer_selectable=true の地物は一覧に無くても対象になる', () => {
    expect(isPopupTarget(feature('知らないソース', { _viewer_selectable: true }), sources)).toBe(true);
  });

  test('properties が null でも落ちない', () => {
    expect(isPopupTarget(feature('知らないソース', null), sources)).toBe(false);
  });
});

describe('地番現況図の除外がカタログ側で担保されていること', () => {
  // 独自タイルの Point を一律に除外する実装を消せた根拠がこれ。
  // disablePopup が外れると、地番現況図のラベル代表点がポップアップに出てしまう（#20 の再発）。
  test('地番現況図に metadata.disablePopup=true がある', () => {
    const items: any[] = [];
    const walk = (node: any) => {
      if (Array.isArray(node)) {
        node.forEach(walk);
      } else if (node && typeof node === 'object') {
        if (node.id) items.push(node);
        Object.values(node).forEach(walk);
      }
    };
    walk(catalog);

    const chiban = items.find((i) => i.id === '地番現況図');
    expect(chiban).toBeDefined();
    expect(chiban.metadata?.disablePopup).toBe(true);
  });
});
