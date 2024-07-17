import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { AiFillCaretRight, AiFillCaretDown, AiOutlineLink, AiOutlineBars } from 'react-icons/ai';

import './Sidebar.scss';
import { CatalogCategory, CatalogDataItem, CatalogItem, walkCategories } from './api/catalog';

import classNames from 'classnames';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { catalogDataAtom, selectedLayersAtom, selectedThirdPartyLayersAtom, thirdPartyCatalogAtom } from './atoms';
import { ThirdPartyCatalogCategory, ThirdPartyCatalogDataItem, ThirdPartyCatalogItem, walkThirdPartyCategories } from './api/thirdPartyCatalog';

type SidebarItemProps = {
  item: CatalogItem | undefined;
  thirdPartyItem: ThirdPartyCatalogItem | undefined;
  baseMap?: string;
}

const CategorySidebarItem: React.FC<SidebarItemProps & { item: CatalogCategory, thirdPartyItem: ThirdPartyCatalogCategory }> = (props) => {
  const [ selectedLayers, setSelectedLayers ] = useAtom(selectedLayersAtom);
  const [ selectedThirdPartyLayers, setSelectedThirdPartyLayers ] = useAtom(selectedThirdPartyLayersAtom);
  const { item, thirdPartyItem } = props;
  const checkboxRef = useRef<HTMLInputElement>(null);

  const shortIdsOfThisCategory = useMemo(() => {
    if(!item) { return []; }
    return [...walkCategories(item.items)].map(x => x.shortId);
  }, [item]);

  const shortIdsOfThirdPartyCategory = useMemo(() => {
    if(!thirdPartyItem) { return []; }
    return [...walkThirdPartyCategories(thirdPartyItem.items)].map(x => x.shortId);
  }, [thirdPartyItem]);

  const {
    checked,
    indeterminate,
  } = useMemo(() => {
    let every = shortIdsOfThisCategory.every(id => selectedLayers.includes(id));
    if(thirdPartyItem) {
      every = shortIdsOfThirdPartyCategory.every(id => selectedThirdPartyLayers.includes(id))
    }
    return {
      checked: every,
      indeterminate: !every && shortIdsOfThisCategory.some(id => selectedLayers.includes(id) || selectedThirdPartyLayers.includes(id)),
    };
  }, [selectedLayers, shortIdsOfThisCategory, selectedThirdPartyLayers, shortIdsOfThirdPartyCategory, thirdPartyItem]);

  useLayoutEffect(() => {
    if (!checkboxRef.current) { return; }
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);


  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;

    if(thirdPartyItem) {
      setSelectedThirdPartyLayers((prev) => {
        if (checked) {
          const newLayers = new Set([...prev, ...shortIdsOfThirdPartyCategory]);
          return [...newLayers];
        } else {
          let out = [...prev];
          for (const itemClass of shortIdsOfThirdPartyCategory) {
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

  }, [shortIdsOfThisCategory, setSelectedLayers, setSelectedThirdPartyLayers, shortIdsOfThirdPartyCategory, thirdPartyItem]);

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
        { thirdPartyItem ?  thirdPartyItem.name : item.name }
      </label>
    </div>
    {isOpen && <div className="sidebar-item-category-items">
      { thirdPartyItem ? 
        thirdPartyItem.items.map(item => (
          <SingleSidebarItem key={item.id} {...props} thirdPartyItem={item} />
        ))
        :
        item.items.map(item => (
          <SingleSidebarItem key={item.id} {...props} item={item} />
        ))
      }
    </div>}
  </div>
}

const DataSidebarItem: React.FC<SidebarItemProps & { item: CatalogDataItem, thirdPartyItem: ThirdPartyCatalogDataItem }> = (props) => {
  const [ selectedLayers, setSelectedLayers ] = useAtom(selectedLayersAtom);
  const [ selectedThirdPartyLayers, setSelectedThirdPartyLayers ] = useAtom(selectedThirdPartyLayersAtom);
  const { item, thirdPartyItem } = props;
  const itemShortId = thirdPartyItem ? thirdPartyItem.shortId : item.shortId;
  const isChecked = thirdPartyItem ? 
    selectedThirdPartyLayers.includes(thirdPartyItem.shortId)
    :
    selectedLayers.includes(item.shortId);

  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;
    if (thirdPartyItem) {
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

  }, [itemShortId, setSelectedLayers, setSelectedThirdPartyLayers, thirdPartyItem]);

  return <div className="sidebar-item">
    <label className="label">
      <input 
      type="checkbox" 
      checked={isChecked} 
      onChange={handleCheckboxChange}
      />
      { thirdPartyItem ? thirdPartyItem.name : item.name}
    </label>
  </div>;
};

const SingleSidebarItem: React.FC<SidebarItemProps> = (props) => {
  const { item, thirdPartyItem, baseMap } = props;
  if ((item && item.type === "Category") || (thirdPartyItem && thirdPartyItem.type === "Category")) {
    return <CategorySidebarItem {...props} item={item as CatalogCategory} thirdPartyItem={thirdPartyItem as ThirdPartyCatalogCategory} baseMap={baseMap} />;
  } else if ((item && item.type === "DataItem") || (thirdPartyItem && thirdPartyItem.type === "DataItem")) {
    return <DataSidebarItem {...props} item={item as CatalogDataItem} thirdPartyItem={thirdPartyItem as ThirdPartyCatalogDataItem} baseMap={baseMap} />;
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
            <SingleSidebarItem key={item.id} item={item} thirdPartyItem={undefined} />
          )}
        </div>
      </div>
      <div className='sidebar-item-container'>
        <p className='sidebar-item-title'>サードパーティー</p>
        <div className='inner-content'>
          {thirdPartyData.map((item) =>
            <SingleSidebarItem key={item.id} item={undefined} baseMap={baseMap} thirdPartyItem={item} />
          )}
        </div>
      </div>
      <a href="https://docs.takamatsu-fact.com/#%E3%81%94%E5%88%A9%E7%94%A8%E3%81%AB%E3%81%82%E3%81%9F%E3%81%A3%E3%81%A6" className='user-guide-link' target="_blank" rel="noreferrer">
        <AiOutlineLink /><span>ご利用にあたって</span>
      </a>
    </div>
  );
}

export default Sidebar;
