import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { AiFillCaretRight, AiFillCaretDown, AiOutlineLink, AiOutlineBars } from 'react-icons/ai';

import './Sidebar.scss';
import { CatalogCategory, CatalogItem, walkCategories } from './api/catalog';

import classNames from 'classnames';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { catalogDataAtom, selectedLayersAtom, selectedThirdPartyLayersAtom, thirdPartyCatalogAtom } from './atoms';
import { ThirdPartyCatalogCategory, ThirdPartyCatalogItem } from './api/thirdPartyCatalog';

type SidebarItemProps = {
  item: CatalogItem | ThirdPartyCatalogItem,
  baseMap?: string
}

const CategorySidebarItem: React.FC<SidebarItemProps> = (props) => {
  const [ selectedLayers, setSelectedLayers ] = useAtom(selectedLayersAtom);
  const [ selectedThirdPartyLayers, setSelectedThirdPartyLayers ] = useAtom(selectedThirdPartyLayersAtom);
  const { item } = props;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const catalogItem = useRef<CatalogCategory | ThirdPartyCatalogCategory>(item as CatalogCategory | ThirdPartyCatalogCategory);

  const shortIdsOfThisCategory = useMemo(() => {
    return [...walkCategories(catalogItem.current.items)].map(x => x.shortId);
  }, []);

  const {
    checked,
    indeterminate,
  } = useMemo(() => {
    let every = shortIdsOfThisCategory.every(id => selectedLayers.includes(id));
    if(item.id.includes('thirdParty')) {
      every = shortIdsOfThisCategory.every(id => selectedThirdPartyLayers.includes(id))
    }
    return {
      checked: every,
      indeterminate: !every && shortIdsOfThisCategory.some(id => selectedLayers.includes(id) || selectedThirdPartyLayers.includes(id)),
    };
  }, [selectedLayers, shortIdsOfThisCategory, selectedThirdPartyLayers, item.id]);

  useLayoutEffect(() => {
    if (!checkboxRef.current) { return; }
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);


  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;

    if(item.id.includes('thirdParty')) {
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

  }, [shortIdsOfThisCategory, setSelectedLayers, item.id, setSelectedThirdPartyLayers]);



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
        {item.name}
      </label>
    </div>
    {isOpen && <div className="sidebar-item-category-items">
      {catalogItem.current.items.map(item => (
        <SingleSidebarItem key={item.id} {...props} item={item} />
      ))}
    </div>}
  </div>
}

const DataSidebarItem: React.FC<SidebarItemProps> = (props) => {
  const [ selectedLayers, setSelectedLayers ] = useAtom(selectedLayersAtom);
  const [ selectedThirdPartLayers, setSelectedThirdPartLayers ] = useAtom(selectedThirdPartyLayersAtom);
  const { item } = props;
  const itemShortId = item.shortId;
  const isThirdParty = item.id.includes('thirdParty');

  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;
    if (isThirdParty) {
      setSelectedThirdPartLayers((prev) => {
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

  }, [itemShortId, setSelectedLayers, setSelectedThirdPartLayers, isThirdParty]);

  return <div className="sidebar-item">
    <label className="label">
      <input 
      type="checkbox" 
      checked={(isThirdParty ? selectedThirdPartLayers : selectedLayers).includes(item.shortId)} 
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
      <a href="https://docs.takamatsu-fact.com/#%E3%81%94%E5%88%A9%E7%94%A8%E3%81%AB%E3%81%82%E3%81%9F%E3%81%A3%E3%81%A6" className='user-guide-link' target="_blank" rel="noreferrer">
        <AiOutlineLink /><span>ご利用にあたって</span>
      </a>
    </div>
  );
}

export default Sidebar;
