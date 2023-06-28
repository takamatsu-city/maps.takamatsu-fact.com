import './Header.scss'

type Props = {
  isOpenedSidebar: boolean;
  setIsOpenedSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Content = (props: Props) => {

  const { isOpenedSidebar, setIsOpenedSidebar } = props;

  const handleMenuBtnClick = () => {
    setIsOpenedSidebar(!isOpenedSidebar);
  }

  return (
    <>
      <header className="header">
        <input onChange={handleMenuBtnClick} type="checkbox" id="menu-btn-check" defaultChecked/>
        <label htmlFor="menu-btn-check" className="menu-btn"><span></span></label>
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
