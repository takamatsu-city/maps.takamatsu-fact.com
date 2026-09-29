/**
 * この関数が実際に必要とするMap APIの最小限の形。
 * maplibregl.Mapはこれを満たすが、テストではフェイクを直接渡せるようにするため
 * maplibregl.Map型そのものではなく、この最小インターフェースを受け取る。
 */
interface MinimalMoridoMap {
  getStyle: () => { layers: { id: string }[] } | undefined;
  moveLayer: (id: string, beforeId?: string) => void;
}

/**
 * 盛土規制法カテゴリのうち、区域（背景）を示すDataItemのid一覧。
 * MORIDO_CASE_DATA_IDS（個別案件）より必ず下（背面）に描画されるべき。
 */
export const MORIDO_ZONE_DATA_IDS = [
  '盛土規制法/宅地造成等工事規制区域',
  '盛土規制法/特定盛土等規制区域',
  '盛土規制法/既存盛土等',
];

/**
 * 盛土規制法カテゴリのうち、個別の盛土案件を示すDataItemのid一覧。
 * MORIDO_ZONE_DATA_IDS（区域）より必ず上（前面）に描画されるべき。
 */
export const MORIDO_CASE_DATA_IDS = [
  '盛土規制法/許可盛土',
  '盛土規制法/検査済盛土',
  '盛土規制法/届出盛土',
];

/**
 * 盛土規制法カテゴリの表示/非表示は、ユーザーがチェックボックスを押した順に
 * map.addLayer() される（MainMap.tsxはbeforeIdを指定していない）。そのため
 * 区域レイヤーを個別案件レイヤーより後からONにすると、区域の半透明な塗りが
 * 上に重なって個別案件の色が見えにくくなる
 * （geolonia/takamatsu-ops-2026#164, 2026-08-24 山地さんからの指摘）。
 *
 * 区域レイヤーが追加された直後にだけ呼び出すこと。既に表示されている個別案件
 * レイヤーがあれば、その手前（下）に移動して重なり順を強制する。
 * 個別案件レイヤー側の追加処理・他カテゴリの追加処理には一切手を入れない。
 */
export function reorderMoridoZoneLayer(
  map: MinimalMoridoMap,
  addedLayerId: string,
  addedDataId: string,
): void {
  if (!MORIDO_ZONE_DATA_IDS.includes(addedDataId)) return;

  const layers = map.getStyle()?.layers ?? [];
  const firstCaseLayer = layers.find((layer) =>
    MORIDO_CASE_DATA_IDS.some((dataId) => layer.id.startsWith(`takamatsu/${dataId}/`))
  );
  if (firstCaseLayer) {
    map.moveLayer(addedLayerId, firstCaseLayer.id);
  }
}
