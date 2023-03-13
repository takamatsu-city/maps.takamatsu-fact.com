import React from 'react';
import isObjEmpty from './utils/isObjEmpty';

type Props = {
  selectData: any
}

const Content = (props: Props) => {

  const { selectData } = props

  return (
    <>
      {
        selectData &&
        <div className='sidebar-detail'>
          <h2>{selectData.name}</h2>
          <ul>
            {
              isObjEmpty(selectData.metadata) ?
                <p>メタデータがありません</p>
                :
                <>
                  {
                    Object.keys(selectData.metadata).map((key, index) => {
                      return (
                        <li key={index}>{key}: {selectData.metadata[key]}</li>
                      )
                    })
                  }
                </>
            }
          </ul>
        </div>
      }
    </>
  );
}

export default Content;
