import style from './App.module.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import {Route, Routes} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {chekToken} from './store/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
  dispatch(chekToken());

  return (
    <Routes>
      <Route path='*' element={
        <div className={style.app_wrapper}>
          <Header />
          <Main />
          <Footer />
        </div>
      }
      />
    </Routes>
  );
};

export default App;
