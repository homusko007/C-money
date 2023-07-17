import {Layout} from '../Layout/Layout';
import style from './Header.module.css';
import logo from '../../assets/img/logo.svg';
import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {deleteToken} from '../../store/auth/authSlice';

export const Header = () => {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigate(`/accounts`);
    } else {
      navigate(`/auth`);
    }
  }, [token]);

  const getLogout = () => {
    dispatch(deleteToken());
  };

  return (
    <header className={style.header}>
      <Layout>
        <div className={style.header__container}>
          <Link className={style.navigation__link} to='/accounts'>
            <img
              className={style.header__logo}
              src={logo}
              alt='Логотип C-Money'
            />
          </Link>
          {token &&
          <nav className={style.header__navigation}>
            <ul className={style.navigation__list}>
              <li className={style.navigation__item}>
                <Link className={style.navigation__link}
                  to='accounts'>
                Счета
                </Link>
              </li>
              <li className={style.navigation__item}>
                <Link to='/currency'
                  className={style.navigation__link}>
                Обмен
                </Link>
              </li>
              <li className={style.navigation__item} onClick={getLogout}>
                <a href={'/'}
                  className={cn(style.navigation__link, style.login_btn)}>
                  <span className={style.login_link}>Выйти</span>
                  <svg width="18" height="18" viewBox="0 0 18 18"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_22_510)">
                      <path d="M7.5675 11.6925L8.625 12.75L12.375
                    9L8.625 5.25L7.5675 6.3075L9.5025
                     8.25H2.25V9.75H9.5025L7.5675 11.6925ZM14.25
                      2.25H3.75C2.9175 2.25 2.25 2.925 2.25
                     3.75V6.75H3.75V3.75H14.25V14.25H3.75V11.25H2.25V14.25C2.25
                      15.075 2.9175 15.75 3.75 15.75H14.25C15.075 15.75 15.75
                       15.075 15.75 14.25V3.75C15.75 2.925 15.075
                        2.25 14.25 2.25Z" fill="currentColor"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_22_510">
                        <rect width="18" height="18" fill="currentColor"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          }
        </div>
      </Layout>
    </header>
  );
};
