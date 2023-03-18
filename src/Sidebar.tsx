import { useCallback, useMemo } from 'react';
import './Sidebar.scss';
import { CatalogCategory, CatalogDataItem, CatalogItem, walkCategories } from './api/catalog';

type SidebarItemProps = {
  selectedLayers: string[]
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
  item: CatalogItem
}

const CategorySidebarItem: React.FC<SidebarItemProps & { item: CatalogCategory }> = (props) => {
  const {item, selectedLayers, setSelectedLayers} = props;

  const classesOfThisCategory = useMemo(() => {
    return [...walkCategories(item.items)].map(x => x.class);
  }, [item]);

  const checked = useMemo(() => {
    return classesOfThisCategory.every(className => selectedLayers.includes(className));
  }, [selectedLayers, classesOfThisCategory]);

  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;

    setSelectedLayers((prev) => {
      if (checked) {
        const newLayers = new Set([...prev, ...classesOfThisCategory]);
        return [...newLayers];
      } else {
        let out = [...prev];
        for (const itemClass of classesOfThisCategory) {
          const index = out.indexOf(itemClass);
          if (index >= 0) {
            out.splice(index, 1);
          }
        }
        return out;
      }
    });
  }, [classesOfThisCategory, setSelectedLayers]);

  return <div className='sidebar-item-category'>
    <div className='sidebar-item'>
      <label className='label category-label'>
        <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
        {item.name}
      </label>
    </div>
    <div className="sidebar-item-category-items">
      {item.items.map(item => (
        <SingleSidebarItem {...props} item={item} />
      ))}
    </div>
  </div>
}

const DataSidebarItem: React.FC<SidebarItemProps & { item: CatalogDataItem }> = (props) => {
  const {selectedLayers, setSelectedLayers, item} = props;
  const itemClass = item.class;

  const handleCheckboxChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const checked = event.target.checked;

    setSelectedLayers((prev) => {
      if (checked) {
        return [...prev, itemClass];
      } else {
        const index = prev.indexOf(itemClass);
        if (index >= 0) {
          const out = [...prev];
          out.splice(index, 1);
          return out;
        }
      }
      return prev;
    });
  }, [itemClass, setSelectedLayers]);

  return <div className="sidebar-item">
    <label className="label">
      <input type="checkbox" checked={selectedLayers.includes(item.class)} onChange={handleCheckboxChange} />
      {item.name}
    </label>
  </div>;
};

const SingleSidebarItem: React.FC<SidebarItemProps> = (props) => {
  const {item} = props;
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
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
}

const Sidebar: React.FC<SidebarProps> = ({selectedLayers, setSelectedLayers, catalogData}) => {
  const selectAllHandler = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    event.preventDefault();
    setSelectedLayers([...walkCategories(catalogData)].map(v => v.class));
  }, [catalogData, setSelectedLayers]);

  const selectNoneHandler = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    event.preventDefault();
    setSelectedLayers([]);
  }, [setSelectedLayers]);

  return (
    <div className='sidebar'>
      <h2 className='title'>都市情報</h2>
      <div className='button-container'>
        <button type="button" onClick={selectAllHandler}>全選択</button>
        <button type="button" onClick={selectNoneHandler}>全選択解除</button>
      </div>
      <div className='sidebar-item-container'>
        { catalogData.map((item) =>
          <SingleSidebarItem
            key={item.id}
            selectedLayers={selectedLayers}
            setSelectedLayers={setSelectedLayers}
            item={item}
          />
        ) }
      </div>
    </div>
  );
}

export default Sidebar;
