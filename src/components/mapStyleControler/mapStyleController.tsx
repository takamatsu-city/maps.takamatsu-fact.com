import React, { useState } from 'react';
import { motion } from "framer-motion"

import './mapStyleController.scss';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { mapObjAtom } from '../../atoms';

import { BsFillLayersFill } from "react-icons/bs";

import mapStyleConfig from '../../config/mapStyleConfig.json';
import { MapStyleConfigType } from '../../config/mapStyleConfig';



type MapStyleControllerProps = {
  setSelectedBaseMap: React.Dispatch<React.SetStateAction<MapStyleConfigType | undefined>>;
  selectedBaseMap: MapStyleConfigType | undefined;
}

const MapStyleController: React.FC<MapStyleControllerProps> = (props) => {

  const { setSelectedBaseMap, selectedBaseMap } = props;

  const [open, setOpen] = useState(false);
  const mapObj = useAtomValue(mapObjAtom);


  // レイヤーを切り替える
  const changeStyle = (style: MapStyleConfigType) => {
    if(!mapObj) { return; }

    mapStyleConfig.forEach((style) => { mapObj.removeLayer(style.id); });
    setSelectedBaseMap(style);
    setOpen(false);
  }

  if(!mapStyleConfig || !selectedBaseMap) { return <></>; }

  return (
    <>
      <div className='map-style-controller' onClick={() => setOpen(!open)}>
        <div className='icon'><BsFillLayersFill/></div>
        <div className='inner'>
          <img src={selectedBaseMap.previewImgUrl} alt={ selectedBaseMap.label } className='icon'/>
          <p className='label'>レイヤー選択</p>
        </div>
      </div>
      <motion.div 
        className='layer-select-area'
        initial={{ bottom: 100, height: 0, opacity: 0 }}
        animate={open ? { bottom: 116, height: 'auto', opacity: 1 }:{ bottom: 100, height: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className='title'></div>
        { mapStyleConfig && mapStyleConfig.map((style) => {
            const isSelected = selectedBaseMap.id === style.id;
            return (
              <div className={ classNames('item', {'selected': isSelected}) } onClick={() => changeStyle(style)} key={style.label}>
                <div className='imageWrapper' style={ isSelected ? {borderColor: '#3b79c4'} : {}} >
                  <img src={style.previewImgUrl} alt={`${style.label}画像`}/>
                </div>
                <p className='label' style={ isSelected ? {color: '#3b79c4'} : {}} >
                  {style.label}
                </p>
              </div>
            );
        })}
      </motion.div>
    </>
  );
};

export default MapStyleController;
