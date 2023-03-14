import React, { useCallback } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import './SidebarDetail.scss'
import { CatalogFeature } from './api/catalog';

type Props = {
  selected: CatalogFeature[]
  setSelected: React.Dispatch<React.SetStateAction<CatalogFeature[]>>
}

const Content = (props: Props) => {
  const { selected, setSelected } = props;

  const closeHandler = useCallback<React.MouseEventHandler>((event) => {
    event.preventDefault();
    setSelected([]);
  }, [setSelected]);

  // const catalogItems = Object.fromEntries(selected.map(item => [item.catalog.class, item.catalog]));
  const groupedFeatures: { [key: string]: CatalogFeature[] } = {};
  for (const feature of selected) {
    const ary = groupedFeatures[feature.catalog.class] ||= [];
    ary.push(feature);
  }

  return (
    <div className='sidebar-detail'>
      <div className='close-btn-container'>
        <AiOutlineClose className='close' onClick={closeHandler} />
      </div>
      { Object.entries(groupedFeatures).map(([classId, features]) => (
        <div key={classId} className='sidebar-detail-subsection'>
          <h2 className='title'>{features[0].catalog.name}</h2>
          <div>
            { features.map((feature, idx) => (
              <div className='sidebar-detail-single-feature' key={idx}>
                { Object.entries(feature.properties).filter(([key, _value]) => key !== 'class').map(([key, value]) => (
                  <div className="sidebar-detail-item" key={key}>
                    <span className='label'>{key}</span>
                    <span className='content'>{value}</span>
                  </div>
                ))}
              </div>
            )) }
          </div>
        </div>
      )) }
    </div>
  );
}

export default Content;
