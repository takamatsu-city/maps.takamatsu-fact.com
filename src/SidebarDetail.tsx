import React from 'react';
import isObjEmpty from './utils/isObjEmpty';
import './SidebarDetail.scss'

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
          <h2 className='title'>{selectData.name}</h2>
          <div>
            {
              isObjEmpty(selectData.metadata) ?
                <p>メタデータがありません</p>
                :
                <>
                  {
                    Object.keys(selectData.metadata).map((key, index) => {
                      return (
                        <div className="sidebar-detail-item" key={index}>
                          <span className='label'>{key}</span>
                          <span className='content'>{selectData.metadata[key]}</span>
                        </div>
                      )
                    })
                  }
                </>
            }
          </div>
        </div>
      }
    </>
  );
}

export default Content;
