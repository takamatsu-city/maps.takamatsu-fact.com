import catalog from '../../public/api/catalog.json';
import { getCustomStyle } from './mapStyling';
import { CatalogDataItem } from '../api/catalog';

// 盛土規制法カテゴリの中身を取り出す。カタログは手編集で運用しているため、
// レイヤ追加時に落としやすい前提(属性順・class とスタイルの対応)をここで固定する。
const moridoItems = (() => {
  const category = (catalog as any[]).find((entry) => entry.id === '盛土規制法');
  if (!category) throw new Error('盛土規制法カテゴリが catalog.json に見つからない');
  return category.items as any[];
})();

const findItem = (name: string) => {
  const item = moridoItems.find((i) => i.name === name);
  if (!item) throw new Error(`${name} が盛土規制法カテゴリに見つからない`);
  return item;
};

describe('盛土規制法カテゴリのカタログ定義', () => {
  test('検査済盛土は許可盛土の直後に並ぶ', () => {
    const names = moridoItems.map((i) => i.name);
    expect(names).toContain('検査済盛土');
    expect(names.indexOf('検査済盛土')).toBe(names.indexOf('許可盛土') + 1);
  });

  test('検査済盛土は morido-checked のベクトルタイルを参照する', () => {
    const checked = findItem('検査済盛土');
    expect(checked.source_type).toBe('vector');
    expect(checked.customDataSourceLayer).toBe('g-simplestyle-v1');
    expect(checked.tileUrl).toMatch(/\/data\/morido-checked\/[^/]+\/tiles\/tiles\.json$/);
  });

  // attributesOrder は表示順のソートキー(indexOf)であってフィルタではないため、
  // 載せ忘れた属性は -1 になって表の先頭へ浮いてしまう。固有4項目の抜けを防ぐ。
  test('検査済盛土の attributesOrder に固有の4項目が工事完了予定年月日の後ろで入っている', () => {
    const order: string[] = findItem('検査済盛土').metadata.attributesOrder;
    const checkedOnly = [
      '工事完了年月日',
      '工事完了検査/確認年月日',
      '検査済証/確認済証交付番号',
      '検査済証/確認済証交付年月日',
    ];
    for (const key of checkedOnly) {
      expect(order).toContain(key);
      expect(order.indexOf(key)).toBeGreaterThan(order.indexOf('工事完了予定年月日'));
    }
    // 許可盛土の並びを踏襲していること(共通項目が欠けていない)
    const allowedOrder: string[] = findItem('許可盛土').metadata.attributesOrder;
    expect(order.filter((key) => !checkedOnly.includes(key))).toEqual(allowedOrder);
  });

  test('shortId は盛土規制法カテゴリ内で重複しない', () => {
    const shortIds = moridoItems.map((i) => i.shortId);
    expect(new Set(shortIds).size).toBe(shortIds.length);
  });

  // 本番反映作業(#225等のプレビューPRからの取り込み)で tileUrl の差し替えを
  // 戻し忘れると、本番が高松市未承認のプレビューデータを配信してしまう事故になる。
  // 盛土規制法カテゴリの全DataItemを対象に、tileUrlがプレビューパスを
  // 指していないことを固定する。
  test('盛土規制法カテゴリのtileUrlにプレビューパス(preview-)が混入していない', () => {
    for (const item of moridoItems) {
      if (typeof item.tileUrl !== 'string') continue;
      expect(item.tileUrl).not.toMatch(/preview-/);
    }
  });
});

describe('検査済盛土のスタイル', () => {
  test('class 検査済盛土に既定色(オレンジ系)が引ける', () => {
    const checked = findItem('検査済盛土') as CatalogDataItem;
    const styles = getCustomStyle(checked);
    expect(styles).toBeDefined();
    expect(JSON.stringify(styles)).toContain('rgba(255, 140, 0,');
  });

  test('許可盛土(赤系)とは別の色が引ける', () => {
    const allowed = getCustomStyle(findItem('許可盛土') as CatalogDataItem);
    const checked = getCustomStyle(findItem('検査済盛土') as CatalogDataItem);
    expect(JSON.stringify(checked)).not.toBe(JSON.stringify(allowed));
  });
});
