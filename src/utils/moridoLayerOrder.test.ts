import { reorderMoridoZoneLayer, MORIDO_ZONE_DATA_IDS, MORIDO_CASE_DATA_IDS } from './moridoLayerOrder';

// map.addLayer() は常にスタイルの一番上（配列の末尾）にレイヤーを追加する。
// このフェイクは、テストが確認したい「配列中の並び順」だけを再現する。
const makeFakeMap = (initialLayerIds: string[]) => {
  let layers = initialLayerIds.map((id) => ({ id }));
  return {
    getStyle: () => ({ layers }),
    moveLayer: (id: string, beforeId?: string) => {
      const target = layers.find((l) => l.id === id);
      if (!target) return;
      layers = layers.filter((l) => l.id !== id);
      const beforeIndex = beforeId ? layers.findIndex((l) => l.id === beforeId) : -1;
      if (beforeIndex === -1) {
        layers.push(target);
      } else {
        layers.splice(beforeIndex, 0, target);
      }
    },
    addLayer: (id: string) => {
      layers.push({ id });
    },
    _getLayerIds: () => layers.map((l) => l.id),
  };
};

describe('reorderMoridoZoneLayer', () => {
  test('区域レイヤーを個別案件レイヤーより先にONにした場合（想定どおりの順）は何もしない', () => {
    const map = makeFakeMap([]);
    map.addLayer('takamatsu/盛土規制法/宅地造成等工事規制区域/Polygon');
    reorderMoridoZoneLayer(map, 'takamatsu/盛土規制法/宅地造成等工事規制区域/Polygon', MORIDO_ZONE_DATA_IDS[0]);
    map.addLayer('takamatsu/盛土規制法/検査済盛土/Polygon検査済盛土');
    reorderMoridoZoneLayer(map, 'takamatsu/盛土規制法/検査済盛土/Polygon検査済盛土', MORIDO_CASE_DATA_IDS[1]);

    expect(map._getLayerIds()).toEqual([
      'takamatsu/盛土規制法/宅地造成等工事規制区域/Polygon',
      'takamatsu/盛土規制法/検査済盛土/Polygon検査済盛土',
    ]);
  });

  test('個別案件レイヤーを表示した後で区域レイヤーをONにしても、区域が下に来る（#164の再現ケース）', () => {
    const map = makeFakeMap([]);
    // 8/21のプレビューURLどおり、まず許可盛土・検査済盛土が選択済みの状態から始まる
    map.addLayer('takamatsu/盛土規制法/許可盛土/Polygon許可盛土');
    reorderMoridoZoneLayer(map, 'takamatsu/盛土規制法/許可盛土/Polygon許可盛土', MORIDO_CASE_DATA_IDS[0]);
    map.addLayer('takamatsu/盛土規制法/検査済盛土/Polygon検査済盛土');
    reorderMoridoZoneLayer(map, 'takamatsu/盛土規制法/検査済盛土/Polygon検査済盛土', MORIDO_CASE_DATA_IDS[1]);

    // ここで山地さんが「宅地造成等工事規制区域」「特定盛土等規制区域」を追加でON
    map.addLayer('takamatsu/盛土規制法/宅地造成等工事規制区域/Polygon');
    reorderMoridoZoneLayer(map, 'takamatsu/盛土規制法/宅地造成等工事規制区域/Polygon', MORIDO_ZONE_DATA_IDS[0]);
    map.addLayer('takamatsu/盛土規制法/特定盛土等規制区域/Polygon');
    reorderMoridoZoneLayer(map, 'takamatsu/盛土規制法/特定盛土等規制区域/Polygon', MORIDO_ZONE_DATA_IDS[1]);

    const order = map._getLayerIds();
    const indexOf = (needle: string) => order.findIndex((id) => id.startsWith(needle));

    // 区域（背景）は、どちらの個別案件レイヤーよりも後ろ（下）に来ること
    expect(indexOf('takamatsu/盛土規制法/宅地造成等工事規制区域/')).toBeLessThan(indexOf('takamatsu/盛土規制法/許可盛土/'));
    expect(indexOf('takamatsu/盛土規制法/宅地造成等工事規制区域/')).toBeLessThan(indexOf('takamatsu/盛土規制法/検査済盛土/'));
    expect(indexOf('takamatsu/盛土規制法/特定盛土等規制区域/')).toBeLessThan(indexOf('takamatsu/盛土規制法/許可盛土/'));
    expect(indexOf('takamatsu/盛土規制法/特定盛土等規制区域/')).toBeLessThan(indexOf('takamatsu/盛土規制法/検査済盛土/'));
  });

  test('盛土規制法カテゴリ以外のDataItemには何もしない', () => {
    const map = makeFakeMap(['takamatsu/施設情報/学校/Point学校']);
    reorderMoridoZoneLayer(map, 'takamatsu/防災情報/避難所/Point避難所', '防災情報/避難所');
    expect(map._getLayerIds()).toEqual(['takamatsu/施設情報/学校/Point学校']);
  });
});
