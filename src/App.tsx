import { useState } from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import MainMap from './MainMap'

import { Alert } from '@mui/material';

import './App.scss';
import SidebarDetail from './SidebarDetail';
import { useMediaQuery } from 'react-responsive'
import { useAtom } from 'jotai';
import { alertInfoAtom } from './atoms';

function App() {
  // TODO: https://github.com/takamatsu-city/maps.takamatsu-fact.com/issues/89 修正時に 初期値を true に変更する
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' })
  const [isOpenedSidebar, setIsOpenedSidebar] = useState<boolean>(isDesktop);
  const [alertInfo, setAlertInfo] = useAtom(alertInfoAtom);

  return (
    <div className="App">
      { alertInfo.msg !== '' &&
        <Alert severity={alertInfo.type} className="alert" variant="filled" onClick={() => setAlertInfo({msg: '', type:'info'})}>
          { alertInfo.msg }
        </Alert>
      } 
      <Header />
      <div className="container">
        <Sidebar
          isOpenedSidebar={isOpenedSidebar}
          setIsOpenedSidebar={setIsOpenedSidebar}
        />
        <div className="map-container">
          <SidebarDetail />
          <MainMap />
        </div>
      </div>
    </div>
  );
}

export default App;
