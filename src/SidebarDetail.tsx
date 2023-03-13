import React from 'react';
import isObjEmpty from './utils/isObjEmpty';
import { AiOutlineClose } from "react-icons/ai";
import './SidebarDetail.scss'


type Props = {
  selectData: any,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}

const Content = (props: Props) => {

  const { selectData, isOpen, setIsOpen } = props

  return (
    <>
      {
        (selectData && isOpen) &&
        <div className='sidebar-detail'>
          <div className='close-btn-container'>
            <AiOutlineClose className='close' onClick={() => {setIsOpen(false)}}/>
          </div>
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
