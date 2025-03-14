import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { AiFillCaretRight, AiFillCaretDown, AiOutlineBars } from 'react-icons/ai';

import './Sidebar.scss';
import { CatalogCategory, CatalogDataItem, CatalogItem, walkCategories } from './api/catalog';

import classNames from 'classnames';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { catalogDataAtom, selectedLayersAtom, selectedThirdPartyLayersAtom, thirdPartyCatalogAtom } from './atoms';
import { isThirdPartyItem, ThirdPartyCatalogCategory, ThirdPartyCatalogDataItem, ThirdPartyCatalogItem, walkThirdPartyCategories } from './api/thirdPartyCatalog';

type SidebarItemProps = {
  item: CatalogItem | ThirdPartyCatalogItem;
  baseMap?: string;
}

const CategorySidebarItem: React.FC<SidebarItemProps & { item: CatalogCategory | ThirdPartyCatalogCategory }> = (props) => {
  const [ selectedLayers, setSelectedLayers ] = useAtom(selectedLayersAtom);
  const [ selectedThirdPartyLayers, setSelectedThirdPartyLayers ] = useAtom(selectedThirdPartyLayersAtom);
  const { item } = props;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const isThirdParty = isThirdPartyItem(item);

  const shortIdsOfThisCategory = useMemo(() => {
    if(isThirdParty) {
      return [...walkThirdPartyCategories(item.items)].map(x => x.shortId);
    } else {
      return [...walkCategories(item.items)].map(x => x.shortId);
    }
  }, [item, isThirdParty]);

  const {
    checked,
    indeterminate,
  } = useMemo(() => {
    let every = shortIdsOfThisCategory.every(id => (isThirdParty ? selectedThirdPartyLayers: selectedLayers).includes(id));
    return {
      checked: every,
      indeterminate: !every && shortIdsOfThisCategory.some(id => selectedLayers.includes(id) || selectedThirdPartyLayers.includes(id)),
    };
  }, [selectedLayers, shortIdsOfThisCategory, selectedThirdPartyLayers, isThirdParty]);

  useLayoutEffect(() => {
    if (!checkboxRef.current) { return; }
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);


  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;

    if(isThirdParty) {
      setSelectedThirdPartyLayers((prev) => {
        if (checked) {
          const newLayers = new Set([...prev, ...shortIdsOfThisCategory]);
          return [...newLayers];
        } else {
          let out = [...prev];
          for (const itemClass of shortIdsOfThisCategory) {
            const index = out.indexOf(itemClass);
            if (index >= 0) {
              out.splice(index, 1);
            }
          }
          return out;
        }
      });
    } else {
      setSelectedLayers((prev) => {
        if (checked) {
          const newLayers = new Set([...prev, ...shortIdsOfThisCategory]);
          return [...newLayers];
        } else {
          let out = [...prev];
          for (const itemClass of shortIdsOfThisCategory) {
            const index = out.indexOf(itemClass);
            if (index >= 0) {
              out.splice(index, 1);
            }
          }
          return out;
        }
      });
    }

  }, [shortIdsOfThisCategory, setSelectedLayers, setSelectedThirdPartyLayers, isThirdParty]);

  const [isOpen, setIsOpen] = useState<boolean>(checked || indeterminate);

  const toggleIsOpen = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    event.preventDefault();
    setIsOpen(isOpen => !isOpen);
  }, []);

  return <div className='sidebar-item-category'>
    <div className='sidebar-item'>
      <button className='category-toggle' type="button" onClick={toggleIsOpen}>
        {isOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}
      </button>
      <label className='label category-label'>
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        { item.name }
      </label>
    </div>
    {isOpen && <div className="sidebar-item-category-items">
      {
        (item as unknown as ThirdPartyCatalogCategory | CatalogCategory).items.map((item) => (
          <SingleSidebarItem key={item.id} {...props} item={item} />
        ))
      }
    </div>}
  </div>
}

const DataSidebarItem: React.FC<SidebarItemProps & { item: CatalogDataItem | ThirdPartyCatalogDataItem }> = (props) => {
  const [ selectedLayers, setSelectedLayers ] = useAtom(selectedLayersAtom);
  const [ selectedThirdPartyLayers, setSelectedThirdPartyLayers ] = useAtom(selectedThirdPartyLayersAtom);
  const { item } = props;
  const isThirdParty = isThirdPartyItem(item);
  const itemShortId = item.shortId;
  const isChecked = isThirdParty ?
    selectedThirdPartyLayers.includes(item.shortId)
    :
    selectedLayers.includes(item.shortId);

  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;
    if (isThirdParty) {
      setSelectedThirdPartyLayers((prev) => {
        if (checked) {
          return [...prev, itemShortId];
        } else {
          const index = prev.indexOf(itemShortId);
          if (index >= 0) {
            const out = [...prev];
            out.splice(index, 1);
            return out;
          }
        }
        return prev;
      });
    } else {
      setSelectedLayers((prev) => {
        if (checked) {
          return [...prev, itemShortId];
        } else {
          const index = prev.indexOf(itemShortId);
          if (index >= 0) {
            const out = [...prev];
            out.splice(index, 1);
            return out;
          }
        }
        return prev;
      });
    }

  }, [itemShortId, setSelectedLayers, setSelectedThirdPartyLayers, isThirdParty]);

  return <div className="sidebar-item">
    <label className="label">
      <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
      />
      {item.name}
    </label>
  </div>;
};

const SingleSidebarItem: React.FC<SidebarItemProps> = (props) => {
  const { item, baseMap } = props;
  if (item.type === "Category") {
    return <CategorySidebarItem {...props} item={item} baseMap={baseMap} />;
  } else if (item.type === "DataItem") {
    return <DataSidebarItem {...props} item={item} baseMap={baseMap} />;
  } else {
    return <>Error</>;
  }
}

type SidebarProps = {
  isOpenedSidebar: boolean
  setIsOpenedSidebar: React.Dispatch<React.SetStateAction<boolean>>
  baseMap: string
}

const Sidebar: React.FC<SidebarProps> = ({ isOpenedSidebar, setIsOpenedSidebar, baseMap }) => {
  const catalogData = useAtomValue(catalogDataAtom);
  const thirdPartyData = useAtomValue(thirdPartyCatalogAtom);
  const setSelectedLayers = useSetAtom(selectedLayersAtom);

  const selectAllHandler = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    event.preventDefault();
    setSelectedLayers([...walkCategories(catalogData)].map(v => v.shortId));
  }, [catalogData, setSelectedLayers]);

  const selectNoneHandler = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    event.preventDefault();
    setSelectedLayers([]);
  }, [setSelectedLayers]);

  const closeListHandler = useCallback<React.MouseEventHandler<HTMLLabelElement>>((event) => {
    setIsOpenedSidebar(false);
    event.stopPropagation();
  }, [setIsOpenedSidebar]);

  const openListHandler = useCallback<React.MouseEventHandler<HTMLDivElement>>((event) => {
    setIsOpenedSidebar(true);
    event.stopPropagation();
  }, [setIsOpenedSidebar]);

  return (
    <div className={classNames('sidebar', { 'sidebar-open': isOpenedSidebar })} onClick={openListHandler}>
      <label id="list-close" onClick={closeListHandler}><span></span></label>
      <h2 className='title'><AiOutlineBars className='list-icon'/>都市情報</h2>
      <div className='button-container'>
        <button type="button" onClick={selectAllHandler}>全選択</button>
        <button type="button" onClick={selectNoneHandler}>全選択解除</button>
      </div>
      <div className='sidebar-item-container'>
        <p className='sidebar-item-title'>高松市データ</p>
        <div className='inner-content'>
          {catalogData.map((item) =>
            <SingleSidebarItem key={item.id} item={item} />
          )}
        </div>
      </div>
      <div className='sidebar-item-container'>
        <p className='sidebar-item-title'>サードパーティー</p>
        <div className='inner-content'>
          {thirdPartyData.map((item) =>
            <SingleSidebarItem key={item.id} item={item} baseMap={baseMap} />
          )}
        </div>
      </div>
      <details className='user-guide-link'>
        <summary>ご利用にあたって</summary>
        <ul>
          <li>本サイトのご利用にあたっては、<a href='https://docs.takamatsu-fact.com/#%E3%81%94%E5%88%A9%E7%94%A8%E3%81%AB%E3%81%82%E3%81%9F%E3%81%A3%E3%81%A6'>ご利用にあたって</a>をご覧ください</li>
          <li>国土数値情報のうち、土砂災害警戒区域/小学校区/中学校区のデータは2023年度（令和5年度）時点のものです。高潮浸水想定区域/津波浸水想定/洪水浸水想定区域データ（想定最大規模・計画規模）は、<a href="https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>で配信されているタイルを利用しています（凡例はリンク先を参照してください）。</li>
          <li>国土数値情報のうち、小学校区/中学校区に関して、正確な情報は、<a href="https://www.city.takamatsu.kagawa.jp/smph/kurashi/kosodate/shouchugakkou/nyugaku/kouku-choumei.html">校区一覧のページ</a>でご確認ください。</li>
        </ul>
      </details>
    </div>
  );
}

export default Sidebar;
