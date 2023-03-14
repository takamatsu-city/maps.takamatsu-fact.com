import { useCallback } from 'react';
import './Sidebar.scss';
import { SingleCatalogItem } from './api/catalog';

type SingleSidebarItemProps = {
  layerSelected: boolean
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
  item: SingleCatalogItem
}

const SingleSidebarItem: React.FC<SingleSidebarItemProps> = ({layerSelected, setSelectedLayers, item}) => {
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
      <input type="checkbox" checked={layerSelected} onChange={handleCheckboxChange} />
      {item.name}
    </label>
  </div>;
};

type SidebarProps = {
  selectedLayers: string[]
  catalogData: SingleCatalogItem[]
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
}

const Sidebar: React.FC<SidebarProps> = ({selectedLayers, setSelectedLayers, catalogData}) => {
  return (
    <div className='sidebar'>
      <h2 className='title'>都市情報</h2>
      <div className='sidebar-item-container'>
        { catalogData.map((item) =>
          <SingleSidebarItem
            key={item.class}
            layerSelected={selectedLayers.includes(item.class)}
            setSelectedLayers={setSelectedLayers}
            item={item}
          />
        ) }
      </div>
    </div>
  );
}

export default Sidebar;
