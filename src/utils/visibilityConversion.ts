/*****************************
 * データの詳細表示項目の変換
 *****************************/
import { CatalogFeature } from "../api/catalog"


type DisplayConversionType = (features: CatalogFeature) => CatalogFeature;

const displayConversion: DisplayConversionType = (features: CatalogFeature): CatalogFeature => {

  let items: CatalogFeature = JSON.parse(JSON.stringify(features));

  // 日本語変換
  switch (items.properties['class']) {
    case '大字界':
      delete Object.assign(items.properties,{'名称': items.properties['meisho']})['meisho'];
      delete Object.assign(items.properties,{'名称（カナ）': items.properties['meishokana']})['meishokana'];
      delete Object.assign(items.properties,{'地区名': items.properties['chikumei']})['chikumei'];
      delete Object.assign(items.properties,{'郵便番号': items.properties['yubinbango']})['yubinbango'];
      break;

    case 'AED設置場所':
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'設置場所': items.properties['installationPosition']})['installationPosition'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時間': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'子供用設備': items.properties['equipmentForChildren']})['equipmentForChildren'];
      break;

    case 'コミュニティセンター':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      break;

    case 'ため池一覧':
      delete Object.assign(items.properties,{'貯水池名': items.properties['reservoirName']})['reservoirName'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      break;

    case '環境施設':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時間': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      break;

    case '公衆トイレ':
      delete Object.assign(items.properties,{'県': items.properties['pref']})['pref'];
      delete Object.assign(items.properties,{'市町村': items.properties['city']})['city'];
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'名称（カナ）': items.properties['fullNameInKana']})['fullNameInKana'];
      delete Object.assign(items.properties,{'名称（ローマ字）': items.properties['fullNameInRomaji']})['fullNameInRomaji'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'肩書き': items.properties['katagaki']})['katagaki'];
      delete Object.assign(items.properties,{'設置位置': items.properties['installationPosition']})['installationPosition'];
      delete Object.assign(items.properties,{'男性用トイレ総数': items.properties['totalMensRestroom']})['totalMensRestroom'];
      delete Object.assign(items.properties,{'男性用小便器': items.properties['smallMensRestroom']})['smallMensRestroom'];
      delete Object.assign(items.properties,{'男性用和式トイレ': items.properties['japaneseMensRestroom']})['japaneseMensRestroom'];
      delete Object.assign(items.properties,{'男性用洋式トイレ': items.properties['westernMensRestroom']})['westernMensRestroom'];
      delete Object.assign(items.properties,{'女性用トイレ総数': items.properties['totalWomanRestroom']})['totalWomanRestroom'];
      delete Object.assign(items.properties,{'女性用和式トイレ': items.properties['japaneseWomanRestroom']})['japaneseWomanRestroom'];
      delete Object.assign(items.properties,{'女性用洋式トイレ': items.properties['westernWomanRestroom']})['westernWomanRestroom'];
      delete Object.assign(items.properties,{'共用トイレ': items.properties['sharedRestroom']})['sharedRestroom'];
      delete Object.assign(items.properties,{'共用和式トイレ': items.properties['japaneseSharedRestroom']})['japaneseSharedRestroom'];
      delete Object.assign(items.properties,{'共用洋式トイレ': items.properties['westernSharedRestroom']})['westernSharedRestroom'];
      delete Object.assign(items.properties,{'多目的トイレ': items.properties['multifunctionalRestroom']})['multifunctionalRestroom'];
      delete Object.assign(items.properties,{'車椅子トイレ': items.properties['wheelchairRestroom']})['wheelchairRestroom'];
      delete Object.assign(items.properties,{'幼児用トイレ': items.properties['anInfantRestroom']})['anInfantRestroom'];
      delete Object.assign(items.properties,{'オストメイト用トイレ': items.properties['ostomateRestroom']})['ostomateRestroom'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時間': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'画像': items.properties['image']})['image'];
      delete Object.assign(items.properties,{'ライセンス': items.properties['iamgeLicense']})['iamgeLicense'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      break;

    case '公衆無線LANアクセスポイント':
      delete Object.assign(items.properties,{'県': items.properties['pref']})['pref'];
      delete Object.assign(items.properties,{'市町村': items.properties['city']})['city'];
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'名称（カナ）': items.properties['fullNameInKana']})['fullNameInKana'];
      delete Object.assign(items.properties,{'名称（ローマ字）': items.properties['fullNameInRomaji']})['fullNameInRomaji'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'肩書き': items.properties['katagaki']})['katagaki'];
      delete Object.assign(items.properties,{'設置者': items.properties['installer']})['installer'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'内線番号': items.properties['extensionNumber']})['extensionNumber'];
      delete Object.assign(items.properties,{'SSID': items.properties['ssid']})['ssid'];
      delete Object.assign(items.properties,{'エリア': items.properties['area']})['area'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      break;

    case '斎場':
    case '市民活動・男女共同参画施設':
    case '地域交流館':
    case '市場':
    case '農業体験施設':
    case 'グラウンド':
    case 'その他スポーツ施設':
    case 'テニスコート':
    case 'プール':
    case 'ホール':
    case '図書館':
    case '体育館・武道館':
    case '美術館':
    case '野球場ほか':
    case '陸上競技場':
    case '歴史・民俗施設':
    case 'その他福祉施設':
    case '市立病院':
    case '障がい福祉施設':
    case '地域包括支援センター':
    case '福祉会館・社会福祉協議会':
    case '保健所・保健センター':
    case 'その他子育て支援施設':
    case '地域子育て支援拠点':
    case '児童館など':
    case '生涯学習施設':
    case 'ふれあいセンター':
    case '市役所・市民サービスセンター':
    case '支所・連絡事務所':
    case '出張所':
    case '水道施設':
    case '総合センター':
    case 'レンタサイクルポート':
    case '市立駐車場':
    case '市立駐輪場':
    case '市民防災センター':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時刻': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      break;

    case '使用済小型家電リサイクルBOX設置場所一覧':
      delete Object.assign(items.properties,{'設置場所': items.properties['installationLocation']})['installationLocation'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      break;

    case '市営住宅':
    case '墓地':
    case '食肉センターなど':
    case '公園':
    case '幼稚園':
    case '学校給食調理場':
    case '高等学校など':
    case '小学校':
    case '中学校':
    case '大学':
    case '下水道施設':
    case '自転車保管所':
    case '消防署・消防出張所':
    case '消防屯所':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      break;

    case '指定収集袋取扱店一覧':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      break;

    case '投票所一覧':
      delete Object.assign(items.properties,{'投票地区': items.properties['votingDistrict']})['votingDistrict'];
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'名称（カナ）': items.properties['fullNameInKana']})['fullNameInKana'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'小選挙区': items.properties['smallConstituencies']})['smallConstituencies'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      break;

    case '観光施設':
    case '道の駅一覧':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時刻': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'基本価格': items.properties['basicPrice']})['basicPrice'];
      delete Object.assign(items.properties,{'詳細価格': items.properties['detailPrice']})['detailPrice'];
      delete Object.assign(items.properties,{'説明': items.properties['description']})['description'];
      delete Object.assign(items.properties,{'アクセス': items.properties['access']})['access'];
      delete Object.assign(items.properties,{'駐車場情報': items.properties['parkingInformation']})['parkingInformation'];
      break;

    case '農業施設一覧':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時刻': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'閉館日': items.properties['closingDay']})['closingDay'];
      delete Object.assign(items.properties,{'部屋タイプ1': items.properties['roomType1']})['roomType1'];
      delete Object.assign(items.properties,{'部屋サイズ1': items.properties['roomSize1']})['roomSize1'];
      delete Object.assign(items.properties,{'部屋タイプ2': items.properties['roomType2']})['roomType2'];
      delete Object.assign(items.properties,{'部屋サイズ2': items.properties['roomSize2']})['roomSize2'];
      delete Object.assign(items.properties,{'部屋タイプ3': items.properties['roomType3']})['roomType3'];
      delete Object.assign(items.properties,{'部屋サイズ3': items.properties['roomSize3']})['roomSize3'];
      delete Object.assign(items.properties,{'部屋タイプ4': items.properties['roomType4']})['roomType4'];
      delete Object.assign(items.properties,{'部屋サイズ4': items.properties['roomSize4']})['roomSize4'];
      break;

    case '文化財':
      delete Object.assign(items.properties,{'県': items.properties['pref']})['pref'];
      delete Object.assign(items.properties,{'市町村': items.properties['city']})['city'];
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'名称（カナ）': items.properties['fullNameInKana']})['fullNameInKana'];
      delete Object.assign(items.properties,{'代替名': items.properties['alternativeName']})['alternativeName'];
      delete Object.assign(items.properties,{'名称（ローマ字）': items.properties['fullNameInRomaji']})['fullNameInRomaji'];
      delete Object.assign(items.properties,{'分類': items.properties['classification']})['classification'];
      delete Object.assign(items.properties,{'カテゴリ': items.properties['category']})['category'];
      delete Object.assign(items.properties,{'地名': items.properties['placeName']})['placeName'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'肩書き': items.properties['katagaki']})['katagaki'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'内線番号': items.properties['extensionNumber']})['extensionNumber'];
      delete Object.assign(items.properties,{'会員': items.properties['member']})['member'];
      delete Object.assign(items.properties,{'会員単位': items.properties['memberUnit']})['memberUnit'];
      delete Object.assign(items.properties,{'法人番号': items.properties['corporateNumber']})['corporateNumber'];
      delete Object.assign(items.properties,{'オーナー': items.properties['owner']})['owner'];
      delete Object.assign(items.properties,{'文化財の日付': items.properties['culturalPropertyDate']})['culturalPropertyDate'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時刻': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'画像': items.properties['image']})['image'];
      delete Object.assign(items.properties,{'ライセンス': items.properties['iamgeLicense']})['iamgeLicense'];
      delete Object.assign(items.properties,{'サマリー': items.properties['summary']})['summary'];
      delete Object.assign(items.properties,{'サマリー（ローマ字）': items.properties['summaryInRomaji']})['summaryInRomaji'];
      delete Object.assign(items.properties,{'説明': items.properties['description']})['description'];
      delete Object.assign(items.properties,{'説明（英語）': items.properties['descriptionEng']})['descriptionEng'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      break;


    case '農村公園':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'建物': items.properties['building']})['building'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      break;

    case 'グループホーム':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'サービス': items.properties['service']})['service'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時刻': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'容量': items.properties['capacity']})['capacity'];
      break;

    case '医療機関':
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'代替名': items.properties['alternativeName']})['alternativeName'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'市': items.properties['city']})['city'];
      delete Object.assign(items.properties,{'会社名': items.properties['corporateName']})['corporateName'];
      delete Object.assign(items.properties,{'ファクス番号': items.properties['faxNumber']})['faxNumber'];
      delete Object.assign(items.properties,{'名称（カナ）': items.properties['fullNameInKana']})['fullNameInKana'];
      delete Object.assign(items.properties,{'肩書き': items.properties['katagaki']})['katagaki'];
      delete Object.assign(items.properties,{'医療開始時間': items.properties['medicalStartTime']})['medicalStartTime'];
      delete Object.assign(items.properties,{'医療終了時間': items.properties['medicalEndTime']})['medicalEndTime'];
      delete Object.assign(items.properties,{'診療科目': items.properties['medicalSubjects']})['medicalSubjects'];
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'ベッド数': items.properties['numberOfBeds']})['numberOfBeds'];
      delete Object.assign(items.properties,{'時間外応答': items.properties['overtimeResponse']})['overtimeResponse'];
      delete Object.assign(items.properties,{'県': items.properties['pref']})['pref'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      break;

    case '診療所':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'ニックネーム': items.properties['nickname']})['nickname'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時刻': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      break;

    case '老人いこいの家など':
    case '老人福祉センターなど':
    case '老人福祉施設':
    case '小規模多機能型居宅介護施設':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'サービス': items.properties['service']})['service'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時刻': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'定員': items.properties['capacity']})['capacity'];
      break;

    case '企業主導型保育施設一覧':
    case '認可外保育施設一覧':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'設立者': items.properties['Establisher']})['Establisher'];
      delete Object.assign(items.properties,{'年度開始日': items.properties['fiscalYearStartDay']})['fiscalYearStartDay'];
      delete Object.assign(items.properties,{'開始時刻（平日）': items.properties['startTimeWeekDays']})['startTimeWeekDays'];
      delete Object.assign(items.properties,{'開始時間（土）': items.properties['startTimeSaturday']})['startTimeSaturday'];
      delete Object.assign(items.properties,{'開始時間（日）': items.properties['startTimeSundays']})['startTimeSundays'];
      delete Object.assign(items.properties,{'定員': items.properties['capacity']})['capacity'];
      delete Object.assign(items.properties,{'対象年齢': items.properties['targetAge']})['targetAge'];
      delete Object.assign(items.properties,{'サービス内容': items.properties['serviceContents']})['serviceContents'];
      delete Object.assign(items.properties,{'設備': items.properties['Equipment']})['Equipment'];
      break;

    case '病児・病後児保育施設':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時刻': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時刻': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'価格詳細': items.properties['detailPrice']})['detailPrice'];
      break;

    case '保育施設等':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'参照先': items.properties['referenceObject']})['referenceObject'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      delete Object.assign(items.properties,{'認証タイプ': items.properties['certifiedType']})['certifiedType'];
      delete Object.assign(items.properties,{'アクセス': items.properties['access']})['access'];
      delete Object.assign(items.properties,{'駐車場情報': items.properties['parkingInformation']})['parkingInformation'];
      delete Object.assign(items.properties,{'定員': items.properties['capacity']})['capacity'];
      delete Object.assign(items.properties,{'受け入れ年齢': items.properties['acceptedAge']})['acceptedAge'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'開始時間': items.properties['startTime']})['startTime'];
      delete Object.assign(items.properties,{'終了時間': items.properties['endTime']})['endTime'];
      delete Object.assign(items.properties,{'利用可能日備考': items.properties['availableDateNote']})['availableDateNote'];
      delete Object.assign(items.properties,{'一時保育': items.properties['temporaryKeeping']})['temporaryKeeping'];
      break;


    case '民間放課後児童クラブ':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'対象児童': items.properties['targetChildren']})['targetChildren'];
      delete Object.assign(items.properties,{'定員': items.properties['capacity']})['capacity'];
      delete Object.assign(items.properties,{'利用可能日': items.properties['availableDate']})['availableDate'];
      delete Object.assign(items.properties,{'通常時間': items.properties['normalTime']})['normalTime'];
      delete Object.assign(items.properties,{'通常価格': items.properties['normalPrice']})['normalPrice'];
      delete Object.assign(items.properties,{'延長保育': items.properties['extendedChildcare']})['extendedChildcare'];
      delete Object.assign(items.properties,{'詳細価格': items.properties['detailPrice']})['detailPrice'];
      delete Object.assign(items.properties,{'長期休暇': items.properties['longVacation']})['longVacation'];
      delete Object.assign(items.properties,{'長期休暇料金': items.properties['longVacationPrice']})['longVacationPrice'];
      delete Object.assign(items.properties,{'登録料': items.properties['registrationFee']})['registrationFee'];
      delete Object.assign(items.properties,{'保険料': items.properties['insuranceFee']})['insuranceFee'];
      delete Object.assign(items.properties,{'おやつ': items.properties['snack']})['snack'];
      delete Object.assign(items.properties,{'昼食': items.properties['lunch']})['lunch'];
      delete Object.assign(items.properties,{'備考': items.properties['note']})['note'];
      break;

    case '商店街通行量情報':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'調査日': items.properties['surveyDate']})['surveyDate'];
      delete Object.assign(items.properties,{'男性平日平均': items.properties['manWeekdaysAverage']})['manWeekdaysAverage'];
      delete Object.assign(items.properties,{'女性平日平均': items.properties['womanWeekdaysAverage']})['womanWeekdaysAverage'];
      delete Object.assign(items.properties,{'自転車平日平均': items.properties['bicycleWeekdaysAverage']})['bicycleWeekdaysAverage'];
      delete Object.assign(items.properties,{'合計平日平均': items.properties['totalWeekdaysAverage']})['totalWeekdaysAverage'];
      delete Object.assign(items.properties,{'男性休日平均': items.properties['manHolidayAverage']})['manHolidayAverage'];
      delete Object.assign(items.properties,{'女性休日平均': items.properties['womanHolidayAverage']})['womanHolidayAverage'];
      delete Object.assign(items.properties,{'自転車休日平均': items.properties['bicycleHolidayAverage']})['bicycleHolidayAverage'];
      delete Object.assign(items.properties,{'休日平均合計': items.properties['totalHolidayAverage']})['totalHolidayAverage'];
      break;

    case '指定緊急避難場所・指定避難所':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'電話番号': items.properties['telephoneNumber']})['telephoneNumber'];
      delete Object.assign(items.properties,{'洪水_L1': items.properties['flood_L1']})['flood_L1'];
      delete Object.assign(items.properties,{'洪水_L2': items.properties['flood_L2']})['flood_L2'];
      delete Object.assign(items.properties,{'土砂災害': items.properties['sedimentDisaster']})['sedimentDisaster'];
      delete Object.assign(items.properties,{'暴風雨': items.properties['stormSurge']})['stormSurge'];
      delete Object.assign(items.properties,{'津波': items.properties['tunami']})['tunami'];
      delete Object.assign(items.properties,{'火災': items.properties['fire']})['fire'];
      delete Object.assign(items.properties,{'地震': items.properties['earthquake']})['earthquake'];
      delete Object.assign(items.properties,{'避難スペース': items.properties['evacuationSpace']})['evacuationSpace'];
      delete Object.assign(items.properties,{'管轄': items.properties['jurisdiction']})['jurisdiction'];
      delete Object.assign(items.properties,{'標高': items.properties['elevation']})['elevation'];
      delete Object.assign(items.properties,{'定員': items.properties['capacity']})['capacity'];
      delete Object.assign(items.properties,{'住民団体': items.properties['residentsAssociation']})['residentsAssociation'];
      break;


    case '津波避難ビル':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'住所': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'シェルター': items.properties['shelter']})['shelter'];
      delete Object.assign(items.properties,{'収容人数': items.properties['capacity']})['capacity'];
      delete Object.assign(items.properties,{'地区': items.properties['district']})['district'];
      break;

        // TODO：エクセルのトイレのところ修正

    // === センサー系 =====================
    case '冠水状況':
      delete Object.assign(items.properties,{'名称': items.properties['name']})['name'];
      delete Object.assign(items.properties,{'所在地': items.properties['address']})['address'];
      delete Object.assign(items.properties,{'交差施設': items.properties['geoCrosses']})['geoCrosses'];
      delete Object.assign(items.properties,{'冠水状況': items.properties['status'] === 0 ? '冠水なし': '冠水あり'})['status'];
      delete Object.assign(items.properties,{'測定日時': items.properties['dateIssued']})['dateIssued'];
      delete Object.assign(items.properties,{'更新日時': items.properties['uploadDate']})['uploadDate'];
      break;


  }


  // 非表示項目を削除（class、subclass、NO、itemid、id1）
  delete items.properties['class'];
  delete items.properties['subclass'];
  delete items.properties['NO'];
  delete items.properties['itemid'];
  delete items.properties['id1'];
  delete items.properties['shape_leng'];
  delete items.properties['shape_area'];
  delete items.properties['番号'];
  delete items.properties['LAYER'];
  delete items.properties['LINETYPE'];
  delete items.properties['#property'];
  delete items.properties['prefCode'];
  delete items.properties['identification'];
  delete items.properties['type'];
  delete items.properties['登録アプリケーション名'];
  delete items.properties['関連コード'];
  delete items.properties['カメラエンティティ'];
  delete items.properties['application'];
  delete items.properties['relatedEntity'];
  delete items.properties['firmwareVersion'];

  return items;
}

export default displayConversion;
