/**
 * 地図をクリックしたときに、属性パネルの対象にする地物かどうかを判定する。
 *
 * MainMap の click ハンドラに直書きされていた条件をここへ移した。地図を起動しないと
 * 確かめられない状態だと、除外条件を足したときに巻き添えになったレイヤーに気づけないため。
 */

export type ClickableFeature = {
  source: string;
  properties: Record<string, unknown> | null;
};

export type SelectionSources = {
  /** metadata.disablePopup=true のレイヤー。属性パネルを出さない */
  noPopupIds: string[];
  /** customDataSource を持つレイヤー */
  customDataSourceIds: string[];
  /** tileUrl を持つレイヤー（独自タイル） */
  tileUrlIds: string[];
  /** サードパーティ提供のソース */
  thirdPartySourceIds: string[];
  /** 上記に当てはまらない、個別に許可しているソース */
  builtInSourceIds: string[];
};

/**
 * 属性パネルに出す対象なら true。
 *
 * ジオメトリの種別では判定しない。かつて「tileUrl のレイヤーの Point はラベルの代表点だから」
 * という理由で Point を一律に除外していたが、代表点を持つのは地番現況図だけで、その地番現況図は
 * metadata.disablePopup で丸ごと除外されるようになった。一律除外は、実体が Point である
 * 届出盛土まで選択できなくしてしまう。
 */
export const isPopupTarget = (
  feature: ClickableFeature,
  sources: SelectionSources,
): boolean => {
  if (sources.noPopupIds.includes(feature.source)) {
    return false;
  }
  return (
    sources.builtInSourceIds.includes(feature.source) ||
    sources.customDataSourceIds.includes(feature.source) ||
    sources.tileUrlIds.includes(feature.source) ||
    sources.thirdPartySourceIds.includes(feature.source) ||
    feature.properties?._viewer_selectable === true
  );
};
