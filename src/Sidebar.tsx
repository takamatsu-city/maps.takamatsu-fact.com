import { useEffect, useState } from 'react';
import SidebarDetail from './SidebarDetail';
import './Sidebar.scss';

const Content = () => {

  const [data, setData] = useState<any>(null)
  const [selected, setSelected] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch('./api/catalog.json')
      const data = await res.json()
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className='sidebar'>
        <h2 className='title'>都市情報</h2>
        <div className='sidebar-item-container'>
          {
            data && data.map((item: any, index: number) => {
              return (
                <div className="sidebar-item" key={index} onClick={() => {
                  setIsOpen(true)
                  setSelected(item)
                }}>
                  <div className="label">{item.name}</div>
                </div>
              )
            })
          }
        </div>
      </div>
      <SidebarDetail selectData={selected} setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
}

export default Content;
