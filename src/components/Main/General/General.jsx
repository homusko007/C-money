import style from './General.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {Preloader} from '../../../UI/Preloader/Preloader';
import {useEffect, useState} from 'react';
import {accountsRequestAsync, createNewAccount, groupBy}
  from '../../../store/accounts/accountsSlice';
import formatDate from '../../../utils/formatDate';
import formatNumber from '../../../utils/formatNumber';
import {useNavigate} from 'react-router-dom';

export const General = () => {
  const token = useSelector(state => state.auth.token);
  const accounts = useSelector(state => state.accounts.accounts);
  const loading = useSelector(state => state.accounts.loading);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    dispatch(accountsRequestAsync(token));
  }, [token]);

  useEffect(() => {
    dispatch(groupBy({value}));
  }, [value]);

  return (
    <>
      {loading ? (
      <div className={style.preloader__container}>
        <Preloader />
      </div>
      ) : (
        <>
          <div className={style.hero}>
            <h1 className={style.hero__title}>Hello, Александр!</h1>
            <button className={style.hero__btn}
              onClick={() => dispatch(createNewAccount(token))}>
        Открыть новый счет</button>
          </div>

          <div className={style.accounts__title_wrapper}>
            <h2 className={style.accounts__title}>Мои счета</h2>
            <div className={style.accounts__sort}>
              <p className={style.sort_text}>Сортировка:</p>
              <select className={style.accounts__select}
                onChange={handleChange}>
                <option value='account'>По номеру счета</option>
                <option value='date'>По дате открытия</option>
                <option value='transactions'>Последняя операция</option>
                <option value='balance'>По балансу</option>
              </select>
            </div>
          </div>

          <ul className={style.accounts__list}>
            {accounts.map((data) => (
              <li key={data.account} className={style.accounts__item}
                onClick={() => navigate(`/account/${data.account}`)}>
                <p className={style.accounts__number}>{data.account}</p>
                <p className={style.accounts__sum}>
                  {formatNumber(data.balance)}</p>
                <div className={style.accounts__date_wrapper}>
                  <div className={style.accounts__date}>
                    <p className={style.accounts__date_text}>открыт</p>
                    <time className={style.accounts__date_open}>
                      {data.date ? (
                    formatDate(data.date)) : ('-')}
                    </time>
                  </div>
                  <div className={style.accounts__date}>
                    <p className={style.accounts__date_text}>
                  последняя операция</p>
                    {data.transactions.length &&
                <time className={style.accounts__date_last}
                  dateTime={data.transactions[0].date || ''}>
                  {formatDate(data.transactions[0].date) || 'транзакций нет'}
                </time>
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
