import style from './Footer.module.css';
import logo from '../../assets/img/logo.svg';
import Layout from '../Layout';

export const Footer = () => (
  <footer className={style.footer}>
    <Layout>
      <div className={style.footer_container}>
        <img
          src={logo}
          alt="Логотип C-Money"
        />
        <div className={style.footer__text}>© C-Money, 2022</div>
      </div>
    </Layout>
  </footer>
);
