import Layout from '../Layout';
import General from './General';
import AuthForm from './AuthForm';
import Account from './Account';
import Exchange from './Exchange';
import style from './Main.module.css';
import {Route, Routes} from 'react-router-dom';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path='/accounts' element={<General />} />
        <Route path='/account/:id' element={<Account />} />
        <Route path='/currency' element={<Exchange />} />
      </Routes>
    </Layout>
  </main>
);
