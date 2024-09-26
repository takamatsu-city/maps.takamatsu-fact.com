import Header from '../Header'
import './NotFound.scss';

const Content = () => {

  return (
    <>
      <div className="App">
        <Header />
        <div className="container">
          <div className='notFound'>
            <h2>指定されたページは存在しません</h2>
            <div>アクセスしていただいたページは、削除もしくは移動した可能性があります。大変お手数ですが、アドレス（URL）をご確認の上再度お探しいただくか、<a href="/">トップページ</a> からご利用ください。</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
