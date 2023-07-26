import './Header.scss'

const Content = ( ) => {

  return (
    <>
      <header className="header">
        <div className='brand'>
          <img className="logo" src='./logo.svg' alt="ロゴ" />
          <h2 className='title'>高松市スマートマップ</h2>
        </div>
        <a className='docs-link' href='https://docs.takamatsu-fact.com/' target='_blank' rel='noopener noreferrer'>
          <img src="./assets/file.svg" alt="ファイルアイコン" />
          <p>APIドキュメンテーション</p>
          <img src="./assets/arrow-right.svg" alt="矢印アイコン" />
        </a>
      </header>
    </>
  );
}

export default Content;
