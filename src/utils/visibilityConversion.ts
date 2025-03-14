/*****************************
 * データの詳細表示項目の変換
 *****************************/
import { CatalogFeature } from "../api/catalog"


type DisplayConversionType = (features: CatalogFeature) => CatalogFeature;

const displayConversion: DisplayConversionType = (features: CatalogFeature): CatalogFeature => {

  let items: CatalogFeature = JSON.parse(JSON.stringify(features));
  let properties:{ [key: string]: string } = {};

  const pattern1: { [key: string]: string } = {
    'name':'名称',
    'address':'住所',
    'telephoneNumber':'電話番号',
    'referenceObject':'参照先',
    'note':'備考',
    'availableDate':'利用可能日',
    'startTime':'開始時刻',
    'endTime':'終了時刻',
    'availableDateNote':'利用可能日備考',
  }

  const pattern2: { [key: string]: string } = {
    'name':'名称',
    'address':'住所',
    'telephoneNumber':'電話番号',
    'referenceObject':'参照先',
    'note':'備考',
  }

  const pattern3: { [key: string]: string } = {
    'name':'名称',
    'address':'住所',
    'telephoneNumber':'電話番号',
    'referenceObject':'参照先',
    'note':'備考',
    'availableDate':'利用可能日',
    'startTime':'開始時刻',
    'endTime':'終了時刻',
    'availableDateNote':'利用可能日備考',
    'basicPrice':'基本価格',
    'detailPrice':'詳細価格',
    'description':'説明',
    'access':'アクセス',
    'parkingInformation':'駐車場情報',
  }

  const pattern4: { [key: string]: string } = {
    'name':'名称',
    'address':'住所',
    'telephoneNumber':'電話番号',
    'referenceObject':'参照先',
    'note':'備考',
    'service':'サービス',
    'availableDate':'利用可能日',
    'startTime':'開始時刻',
    'endTime':'終了時刻',
    'availableDateNote':'利用可能日備考',
    'capacity':'定員',
  }

  const pattern5: { [key: string]: string }= {
    'name':'名称',
    'address':'住所',
    'telephoneNumber':'電話番号',
    'Establisher':'設立者',
    'fiscalYearStartDay':'年度開始日',
    'startTimeWeekDays':'開始時刻（平日）',
    'startTimeSaturday':'開始時間（土）',
    'startTimeSundays':'開始時間（日）',
    'capacity':'定員',
    'targetAge':'対象年齢',
    'serviceContents':'サービス内容',
    'Equipment':'設備',
  }

  const translationMap: { [key: string]: { [key: string]: string } } = {
    '大字界': {
      'meisho': '名称',
      'meishokana': '名称（カナ）',
      'chikumei': '地区名',
      'yubinbango': '郵便番号'
    },
    'AED設置場所': {
      'name': '名称',
      'address': '住所',
      'installationPosition': '設置場所',
      'telephoneNumber': '電話番号',
      'availableDate': '利用可能日',
      'startTime': '開始時刻',
      'endTime': '終了時間',
      'availableDateNote': '利用可能日備考',
      'equipmentForChildren': '子供用設備',
    },
    'コミュニティセンター': {
      'name': '名称',
      'address': '住所',
      'installationPosition': '設置場所',
      'telephoneNumber': '電話番号',
      'referenceObject': '参照先',
      'note': '備考'
    },
    'ため池一覧': {
      'reservoirName': '貯水池名',
      'address': '住所'
    },
    '環境施設': {
      'name': '住所',
      'address': '住所',
      'installationPosition': '設置場所',
      'telephoneNumber': '電話番号',
      'referenceObject': '参照先',
      'note': '備考',
      'availableDate': '利用可能日',
      'startTime': '開始時刻',
      'endTime': '終了時間',
      'availableDateNote': '利用可能日備考',
    },
    '公衆トイレ': {
      'pref':'県',
      'city':'市町村',
      'name':'名称',
      'fullNameInKana':'名称（カナ）',
      'fullNameInRomaji':'名称（ローマ字）',
      'address':'住所',
      'katagaki':'肩書き',
      'installationPosition':'設置位置',
      'totalMensRestroom':'男性用トイレ総数',
      'smallMensRestroom':'男性用小便器',
      'japaneseMensRestroom':'男性用和式トイレ',
      'westernMensRestroom':'男性用洋式トイレ',
      'totalWomanRestroom':'女性用トイレ総数',
      'japaneseWomanRestroom':'女性用和式トイレ',
      'westernWomanRestroom':'女性用洋式トイレ',
      'sharedRestroom':'共用トイレ',
      'japaneseSharedRestroom':'共用和式トイレ',
      'westernSharedRestroom':'共用洋式トイレ',
      'multifunctionalRestroom':'多目的トイレ',
      'wheelchairRestroom':'車椅子トイレ',
      'anInfantRestroom':'幼児用トイレ',
      'ostomateRestroom':'オストメイト用トイレ',
      'startTime':'開始時刻',
      'endTime':'終了時間',
      'availableDateNote':'利用可能日備考',
      'image':'画像',
      'iamgeLicense':'ライセンス',
      'note':'備考',
    },
    '公衆無線LANアクセスポイント': {
      'pref':'県',
      'city':'市町村',
      'name':'名称',
      'fullNameInKana':'名称（カナ）',
      'fullNameInRomaji':'名称（ローマ字）',
      'address':'住所',
      'katagaki':'肩書き',
      'installer':'設置者',
      'telephoneNumber':'電話番号',
      'extensionNumber':'内線番号',
      'ssid':'SSID',
      'area':'エリア',
      'referenceObject':'参照先',
      'note':'備考',
    },
    '斎場': pattern1,
    '市民活動・男女共同参画施設': pattern1,
    '地域交流館': pattern1,
    '市場': pattern1,
    '農業体験施設': pattern1,
    'グラウンド': pattern1,
    'その他スポーツ施設': pattern1,
    'テニスコート': pattern1,
    'プール': pattern1,
    'ホール': pattern1,
    '図書館': pattern1,
    '体育館・武道館': pattern1,
    '美術館': pattern1,
    '野球場ほか': pattern1,
    '陸上競技場': pattern1,
    '歴史・民俗施設': pattern1,
    'その他福祉施設': pattern1,
    '市立病院': pattern1,
    '障がい福祉施設': pattern1,
    '地域包括支援センター': pattern1,
    '福祉会館・社会福祉協議会': pattern1,
    '保健所・保健センター': pattern1,
    'その他子育て支援施設': pattern1,
    '地域子育て支援拠点': pattern1,
    '児童館など': pattern1,
    '生涯学習施設': pattern1,
    'ふれあいセンター': pattern1,
    '市役所・市民サービスセンター': pattern1,
    '支所・連絡事務所': pattern1,
    '出張所': pattern1,
    '水道施設': pattern1,
    '総合センター': pattern1,
    'レンタサイクルポート': pattern1,
    '市立駐車場': pattern1,
    '市立駐輪場': pattern1,
    '市民防災センター': pattern1,
    '使用済小型家電リサイクルBOX設置場所一覧': {
      'installationLocation':'設置場所',
      'address':'住所',
      'telephoneNumber':'電話番号',
    },
    '市営住宅': pattern2,
    '墓地': pattern2,
    '食肉センターなど': pattern2,
    '公園': pattern2,
    '幼稚園': pattern2,
    '学校給食調理場': pattern2,
    '高等学校など': pattern2,
    '小学校': pattern2,
    '中学校': pattern2,
    '大学': pattern2,
    '下水道施設': pattern2,
    '自転車保管所': pattern2,
    '消防署・消防出張所': pattern2,
    '消防屯所': pattern2,
    '指定収集袋取扱店一覧': {
      'name':'名称',
      'address':'住所',
      'telephoneNumber':'電話番号',
    },
    '投票所一覧': {
      'votingDistrict':'投票地区',
      'name':'名称',
      'fullNameInKana':'名称（カナ）',
      'address':'住所',
      'smallConstituencies':'小選挙区',
      'referenceObject':'参照先',
    },
    '観光施設': pattern3,
    '道の駅一覧': pattern3,
    '農業施設一覧': {
      'name':'名称',
      'address':'住所',
      'telephoneNumber':'電話番号',
      'startTime':'開始時刻',
      'endTime':'終了時刻',
      'closingDay':'閉館日',
      'roomType1':'部屋タイプ1',
      'roomSize1':'部屋サイズ1',
      'roomType2':'部屋タイプ2',
      'roomSize2':'部屋サイズ2',
      'roomType3':'部屋タイプ3',
      'roomSize3':'部屋サイズ3',
      'roomType4':'部屋タイプ4',
      'roomSize4':'部屋サイズ4',
    },
    '文化財':{
      'pref':'県',
      'city':'市町村',
      'name':'名称',
      'fullNameInKana':'名称（カナ）',
      'alternativeName':'代替名',
      'fullNameInRomaji':'名称（ローマ字）',
      'classification':'分類',
      'category':'カテゴリ',
      'placeName':'地名',
      'address':'住所',
      'katagaki':'肩書き',
      'telephoneNumber':'電話番号',
      'extensionNumber':'内線番号',
      'member':'会員',
      'memberUnit':'会員単位',
      'corporateNumber':'法人番号',
      'owner':'オーナー',
      'culturalPropertyDate':'文化財の日付',
      'availableDate':'利用可能日',
      'startTime':'開始時刻',
      'endTime':'終了時刻',
      'availableDateNote':'利用可能日備考',
      'image':'画像',
      'iamgeLicense':'ライセンス',
      'summary':'サマリー',
      'summaryInRomaji':'サマリー（ローマ字）',
      'description':'説明',
      'descriptionEng':'説明（英語）',
      'referenceObject':'参照先',
    },
    '農村公園': {
      'name':'名称',
      'address':'住所',
      'building':'建物',
      'note':'備考',
    },
    'グループホーム':{
      'name':'名称',
      'address':'住所',
      'telephoneNumber':'電話番号',
      'referenceObject':'参照先',
      'note':'備考',
      'service':'サービス',
      'availableDate':'利用可能日',
      'startTime':'開始時刻',
      'endTime':'終了時刻',
      'availableDateNote':'利用可能日備考',
      'capacity':'容量',
    },
    '医療機関': {
      'pref':'県',
      'city':'市町村',
      'address':'住所',
      'alternativeName':'代替名',
      'availableDate':'利用可能日',
      'availableDateNote':'利用可能日備考',
      'corporateName':'会社名',
      'faxNumber':'ファクス番号',
      'fullNameInKana':'名称（カナ）',
      'katagaki':'肩書き',
      'medicalStartTime':'医療開始時間',
      'medicalEndTime':'医療終了時間',
      'medicalSubjects':'診療科目',
      'name':'名称',
      'note':'備考',
      'numberOfBeds':'ベッド数',
      'overtimeResponse':'時間外応答',
      'telephoneNumber':'電話番号',
      'referenceObject':'参照先',
    },
    '老人いこいの家など': pattern4,
    '老人福祉センターなど': pattern4,
    '老人福祉施設': pattern4,
    '小規模多機能型居宅介護施設': pattern4,
    '診療所': {
      'name':'名称',
      'nickname':'ニックネーム',
      'address':'住所',
      'telephoneNumber':'電話番号',
      'referenceObject':'参照先',
      'note':'備考',
      'availableDate':'利用可能日',
      'startTime':'開始時刻',
      'endTime':'終了時刻',
      'availableDateNote':'利用可能日備考',
    },
    '企業主導型保育施設一覧': pattern5,
    '認可外保育施設一覧': pattern5,
    '病児・病後児保育施設': {
      'name':'名称',
      'address':'住所',
      'telephoneNumber':'電話番号',
      'referenceObject':'参照先',
      'note':'備考',
      'availableDate':'利用可能日',
      'startTime':'開始時刻',
      'endTime':'終了時刻',
      'availableDateNote':'利用可能日備考',
      'detailPrice':'価格詳細'
    },
    '保育施設等': {
      'name':'名称',
      'address':'住所',
      'telephoneNumber':'電話番号',
      'referenceObject':'参照先',
      'note':'備考',
      'certifiedType':'認証タイプ',
      'access':'アクセス',
      'parkingInformation':'駐車場情報',
      'capacity':'定員',
      'acceptedAge':'受け入れ年齢',
      'availableDate':'利用可能日',
      'startTime':'開始時間',
      'endTime':'終了時間',
      'availableDateNote':'利用可能日備考',
      'temporaryKeeping':'一時保育',
    },
    '民間放課後児童クラブ': {
      'name':'名称',
      'address':'住所',
      'telephoneNumber':'電話番号',
      'targetChildren':'対象児童',
      'capacity':'定員',
      'availableDate':'利用可能日',
      'normalTime':'通常時間',
      'normalPrice':'通常価格',
      'extendedChildcare':'延長保育',
      'detailPrice':'詳細価格',
      'longVacation':'長期休暇',
      'longVacationPrice':'長期休暇料金',
      'registrationFee':'登録料',
      'insuranceFee':'保険料',
      'snack':'おやつ',
      'lunch':'昼食',
      'note':'備考',
    },
    '商店街通行量情報': {
      'name':'名称',
      'surveyDate':'調査日',
      'manWeekdaysAverage':'男性平日平均',
      'womanWeekdaysAverage':'女性平日平均',
      'bicycleWeekdaysAverage':'自転車平日平均',
      'totalWeekdaysAverage':'合計平日平均',
      'manHolidayAverage':'男性休日平均',
      'womanHolidayAverage':'女性休日平均',
      'bicycleHolidayAverage':'自転車休日平均',
      'totalHolidayAverage':'休日平均合計',
    },
    '指定緊急避難場所・指定避難所': {
      'name':'名称',
      'address':'住所',
      'telephoneNumber':'電話番号',
      'flood_L1':'洪水_L1',
      'flood_L2':'洪水_L2',
      'sedimentDisaster':'土砂災害',
      'stormSurge':'暴風雨',
      'tunami':'津波',
      'fire':'火災',
      'earthquake':'地震',
      'evacuationSpace':'避難スペース',
      'jurisdiction':'管轄',
      'elevation':'標高',
      'capacity':'定員',
      'residentsAssociation':'住民団体',
    },
    '津波避難ビル': {
      'name':'名称',
      'address':'住所',
      'shelter':'シェルター',
      'capacity':'収容人数',
      'district':'地区',
    },
    '冠水状況': {
      'name':'名称',
      'address':'所在地',
      'geoCrosses':'交差施設',
      'status':'冠水状況',
      'dateIssued':'測定日時',
      'uploadDate':'更新日時',
    },
    '水位': {
      '名称':'名称',
      '水位_測定値':'水位',
      '測定日時':'測定日時',
      '警戒水位':'警戒水位',
      '危険水位':'危険水位',
      '冠水発生水位':'冠水発生水位',
      '更新日時':'更新日時'
    },
    '潮位': {
      '名称':'名称',
      '潮位_測定値':'潮位',
      '測定日時':'測定日時',
      '注意潮位':'注意潮位',
      '警戒潮位':'警戒潮位',
      '冠水発生潮位':'冠水発生潮位',
      '更新日時':'更新日時',
      '関連リンク':'参照先',
    },
    '水位（県防災）': {
      '名称':'名称',
      '水位_測定値':'水位',
      '測定日時':'測定日時',
      '水防団待機水位':'水防団待機水位',
      'はん濫注意水位':'はん濫注意水位',
      '避難判断水位':'避難判断水位',
      'はん濫危険水位':'はん濫危険水位',
      '更新日時':'更新日時',
    },
    '潮位（県防災）': {
      '名称':'名称',
      '潮位_測定値':'潮位',
      '測定日時':'測定日時',
      '注意潮位':'注意潮位',
      '警戒潮位':'警戒潮位',
      '冠水発生潮位':'冠水発生潮位',
      '更新日時':'更新日時',
      '関連リンク':'参照先',
    },
    '降雨量': {
      '名称':'名称',
      '降雨量_測定値':'降雨量',
      '測定日時':'測定日時',
      '更新日時':'更新日時',
    },
    '中学校区': {
      'A32_001':'行政区域コード',
      'A32_002':'設置主体',
      'A32_003':'学校コード',
      'A32_004':'名称',
      'A32_005':'所在地',
    },
    '小学校区': {
      'A27_001':'行政区域コード',
      'A27_002':'設置主体',
      'A27_003':'学校コード',
      'A27_004':'名称',
      'A27_005':'所在地',
    },
    '大規模盛土造成地': {
      'A54_001':'盛土区分',
      'A54_002':'都道府県コード',
      'A54_003':'都道府県名',
      'A54_004':'市区町村コード',
      'A54_005':'市区町村名',
      'A54_006':'盛土番号',
    },
    '土砂災害警戒区域': {
      'A33_001':'現象の種類',
      'A33_002':'区域区分',
      'A33_003':'都道府県コード',
      'A33_004':'区域番号',
      'A33_005':'区域名',
      'A33_006':'所在地',
      'A33_007':'公示日',
      'A33_008':'特別警戒未指定フラグ',
    },
  }

  const featureClass = features.properties['class'] || features.catalog?.class;
  // 日本語変換・表示非表示
  if(featureClass in translationMap) {
    const propertyMap = translationMap[featureClass];
    for (const [prop, propJa] of Object.entries(propertyMap)) {
      properties[propJa] = items.properties[prop];
      if(featureClass === '冠水状況' && prop === 'status') {
        properties[propJa] = items.properties[prop] === 0 ? '冠水なし': '冠水あり'
      }
      if(featureClass === '大規模盛土造成地' && prop === 'A54_001') {
        const value = items.properties[prop];
        if (value === '1') {
          properties[propJa] = '谷埋め型';
        } else if (value === '2') {
          properties[propJa] = '腹付け型';
        } else if (value === '9') {
          properties[propJa] = '区分をしていない';
        }
      }
      if (featureClass === '土砂災害警戒区域') {
        if (prop === 'A33_001') {
          const value = items.properties[prop];
          if (value === 1) {
            properties[propJa] = '急傾斜地の崩壊';
          } else if (value === 2) {
            properties[propJa] = '土石流';
          } else if (value === 3) {
            properties[propJa] = '地滑り';
          }
        }
        if (prop === 'A33_002') {
          const value = items.properties[prop];
          if (value === 1) {
            properties[propJa] = '土砂災害警戒区域(指定済)';
          } else if (value === 2) {
            properties[propJa] = '土砂災害特別警戒区域(指定済)';
          } else if (value === 3) {
            properties[propJa] = '土砂災害警戒区域(指定前)';
          } else if (value === 4) {
            properties[propJa] = '土砂災害特別警戒区域(指定前)';
          }
        }
        if (prop === 'A33_008') {
          const value = items.properties[prop];
          if (value === 0) {
            properties[propJa] = '特別警戒区域指定済み';
          } else if (value === 1) {
            properties[propJa] = '特別警戒区域未指定';
          }
        }
      }
    }
    items.properties = properties;
  } else {
    delete items.properties['NO'];
    delete items.properties['class'];
    delete items.properties['subclass'];
    delete items.properties['番号'];
    delete items.properties['LAYER'];
    delete items.properties['LINETYPE'];
  }

  return items as CatalogFeature;
}

export default displayConversion;
