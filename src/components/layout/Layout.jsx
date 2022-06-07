import Header from './Header';
import Footer from './Footer';

const Layout = ({ layout, children }) => {
  return (
    <div className='gradient'>
      {layout === 'home' ? <Header hidden={true} /> : <Header hidden={false} />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
