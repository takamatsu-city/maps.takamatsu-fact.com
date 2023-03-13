import {useEffect, useState} from 'react';

const Content = () => {

  // /api/catalog.json を fetch で取ってくる

  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch('/api/catalog.json')
      const data = await res.json()
      console.log(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className='sidebar'>
        <ul>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
          <li>テスト</li>
        </ul>
      </div>
    </>
  );
}

export default Content;
