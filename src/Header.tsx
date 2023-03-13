import React from 'react';
import './Header.scss'

const Content = () => {

  return (
    <>
      <header className="header">
        <div className='brand'>
          <img className="logo" src='./logo.svg' alt="ロゴ" />
          <h2 className='title'>高松スマートシティ地図 & API</h2>
        </div>
        <div className='docs-link'>
          <img src="./assets/file.svg" alt="ファイルアイコン" />
          <p>APIドキュメンテーション</p>
          <img src="./assets/arrow-right.svg" alt="矢印アイコン" />
        </div>
      </header>
    </>
  );
}

export default Content;
