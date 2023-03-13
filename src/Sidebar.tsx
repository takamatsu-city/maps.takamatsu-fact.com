import { useEffect, useState } from 'react';
import SidebarDetail from './SidebarDetail';
import './Sidebar.scss';

const Content = () => {

  const [data, setData] = useState<any>(null)
  const [selected, setSelected] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch('/api/catalog.json')
      const data = await res.json()
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className='sidebar'>
        <ul>
          {
            data && data.map((item: any, index: number) => {
              return (
                <li className="sidebar-item" key={index} onClick={() => {
                  setIsOpen(true)
                  setSelected(item)
                }}>
                  {item.name}
                </li>
              )
            })
          }
        </ul>
      </div>
      <SidebarDetail selectData={selected} setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
}

export default Content;
