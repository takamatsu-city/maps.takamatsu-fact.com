import React, { useCallback } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import './SidebarDetail.scss'
import { CatalogFeature } from './api/catalog';
import ReplaceTextToLink from './utils/ReplaceTextToLink';
import displayConversion from './utils/visibilityConversion';

const SingleFeatureTable: React.FC<{feature: CatalogFeature}> = ({feature}) => {
  const detailItems = Object.entries(feature.properties).filter(([key, _value]) => !key.startsWith('_viewer_'));

  detailItems.sort(([key1, _value1], [key2, _value2]) => {
    // make sure items with key=`class` and key=`subclass` are always on top
    if (key1 === 'class') return -1;
    if (key2 === 'class') return 1;
    if (key1 === 'subclass' && key2 !== 'class') return -1;
    if (key2 === 'subclass' && key1 !== 'class') return 1;

    return 0;
  });

  return (
    <table className='sidebar-detail-single-feature'>
      <colgroup>
        <col className='label' />
        <col className='content' />
      </colgroup>
      <tbody>
        { detailItems.map(([key, value]) => (
          <tr className="sidebar-detail-item" key={key}>
            <th className='label'>{key}</th>
            <td className='content'><ReplaceTextToLink text={value} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type Props = {
  selected: CatalogFeature[]
  setSelected: React.Dispatch<React.SetStateAction<CatalogFeature[]>>
}

const Content: React.FC<Props> = (props) => {
  const { selected, setSelected } = props;

  const closeHandler = useCallback<React.MouseEventHandler>((event) => {
    event.preventDefault();
    setSelected([]);
  }, [setSelected]);

  // const catalogItems = Object.fromEntries(selected.map(item => [item.catalog.class, item.catalog]));
  const groupedFeatures: { [key: string]: CatalogFeature[] } = {};
  for (const feature of selected) {
    if (feature.catalog.type !== "DataItem") continue;
    const editedFeature = displayConversion(feature);
    const ary = groupedFeatures[editedFeature.catalog.id] ||= [];
    ary.push(editedFeature);
  }

  return (
    <div className='sidebar-detail'>
      <div className='close-btn-container'>
        <AiOutlineClose className='close' onClick={closeHandler} />
      </div>
      { Object.entries(groupedFeatures).map(([id, features]) => (
        <div key={id} className='sidebar-detail-subsection'>
          <h2 className='title'>{features[0].catalog.name}</h2>
          <div>
            { features.map((feature, idx) => (<React.Fragment key={idx}>
              <SingleFeatureTable feature={feature} />
              { idx < features.length - 1 && <hr /> }
            </React.Fragment>)) }
          </div>
        </div>
      )) }
    </div>
  );
}

export default Content;
