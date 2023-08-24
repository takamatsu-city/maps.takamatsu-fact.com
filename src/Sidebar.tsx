import { useCallback, useMemo, useState } from 'react';

import { AiFillCaretRight, AiFillCaretDown, AiOutlineLink, AiOutlineBars } from 'react-icons/ai';

import './Sidebar.scss';
import { CatalogCategory, CatalogDataItem, CatalogItem, walkCategories } from './api/catalog';

import classNames from 'classnames';

type SidebarItemProps = {
  selectedLayers: string[]
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
  item: CatalogItem
}

const CategorySidebarItem: React.FC<SidebarItemProps & { item: CatalogCategory }> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { item, selectedLayers, setSelectedLayers } = props;

  const idsOfThisCategory = useMemo(() => {
    return [...walkCategories(item.items)].map(x => x.id);
  }, [item]);

  const checked = useMemo(() => {
    return idsOfThisCategory.every(id => selectedLayers.includes(id));
  }, [selectedLayers, idsOfThisCategory]);

  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;

    setSelectedLayers((prev) => {
      if (checked) {
        const newLayers = new Set([...prev, ...idsOfThisCategory]);
        return [...newLayers];
      } else {
        let out = [...prev];
        for (const itemClass of idsOfThisCategory) {
          const index = out.indexOf(itemClass);
          if (index >= 0) {
            out.splice(index, 1);
          }
        }
        return out;
      }
    });
  }, [idsOfThisCategory, setSelectedLayers]);

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
        <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
        {item.name}
      </label>
    </div>
    {isOpen && <div className="sidebar-item-category-items">
      {item.items.map(item => (
        <SingleSidebarItem key={item.id} {...props} item={item} />
      ))}
    </div>}
  </div>
}

const DataSidebarItem: React.FC<SidebarItemProps & { item: CatalogDataItem }> = (props) => {
  const { selectedLayers, setSelectedLayers, item } = props;
  const itemId = item.id;

  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;

    setSelectedLayers((prev) => {
      if (checked) {
        return [...prev, itemId];
      } else {
        const index = prev.indexOf(itemId);
        if (index >= 0) {
          const out = [...prev];
          out.splice(index, 1);
          return out;
        }
      }
      return prev;
    });
  }, [itemId, setSelectedLayers]);

  return <div className="sidebar-item">
    <label className="label">
      <input type="checkbox" checked={selectedLayers.includes(item.id)} onChange={handleCheckboxChange} />
      {item.name}
    </label>
  </div>;
};

const SingleSidebarItem: React.FC<SidebarItemProps> = (props) => {
  const { item } = props;
  if (item.type === "Category") {
    return <CategorySidebarItem {...props} item={item} />;
  } else if (item.type === "DataItem") {
    return <DataSidebarItem {...props} item={item} />;
  } else {
    return <>Error</>;
  }
}

type SidebarProps = {
  selectedLayers: string[]
  catalogData: CatalogItem[]
  isOpenedSidebar: boolean
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
  setIsOpenedSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ selectedLayers, setSelectedLayers, catalogData, isOpenedSidebar, setIsOpenedSidebar }) => {

  const selectAllHandler = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    event.preventDefault();
    setSelectedLayers([...walkCategories(catalogData)].map(v => v.id));
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
        {catalogData.map((item) =>
          <SingleSidebarItem
            key={item.id}
            selectedLayers={selectedLayers}
            setSelectedLayers={setSelectedLayers}
            item={item}
          />
        )}
      </div>
      <a href="https://docs.takamatsu-fact.com/#%E3%81%94%E5%88%A9%E7%94%A8%E3%81%AB%E3%81%82%E3%81%9F%E3%81%A3%E3%81%A6" className='user-guide-link link-text' target="_blank" rel="noreferrer">
        <AiOutlineLink /><span>ご利用にあたって</span>
      </a>
      <div className='link-text'>
      高松市の災害情報については、<a href="https://safetymap.takamatsu-fact.com/" target="_blank" rel="noreferrer"><AiOutlineLink />マイセーフティーマップ</a>をご覧ください。
      </div>
    </div>
  );
}

export default Sidebar;
