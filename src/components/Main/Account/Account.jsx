import style from './Account.module.css';
import cn from 'classnames';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {accountRequestAsync} from '../../../store/account/accountSlice';
import {Preloader} from '../../../UI/Preloader/Preloader';
import {Table} from './Table/Table';
import {TransferForm} from './TransferForm/TransferForm';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
ChartJS.register(
  CategoryScale, Tooltip, LineElement, PointElement, LinearScale,
);
import {filtrChartData} from '../../../utils/filtrChartData';

export const Account = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const {account, transactions, loading} =
  useSelector(state => state.account);
  const [value, setValue] = useState('2023');
  // const [num, setNum] = useState(1);
  const [selectChartData, setSelectChartData] = useState(null);

  useEffect(() => {
    dispatch(accountRequestAsync(id));
    setSelectChartData(filtrChartData(value, transactions));
  }, [id]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setSelectChartData(filtrChartData(value, transactions));
  }, [value]);

  return (
    <>
      {loading ? (
      <div className={style.preloader}>
        <Preloader />
      </div>
    ) : (
    <div className={style.account__container}>
      <section className={style.account__title}>
        <h2 className={style.account__number}>
         Счет № <span>{account}</span></h2>
        <button className={cn(style.button, style.hero__btn)}
          onClick={() => navigate(`/accounts`)}>
          <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3.83 5.5L7.41 1.91L6 0.5L0 6.5L6 12.5L7.41
             11.09L3.83 7.5L16 7.5V5.5L3.83 5.5Z" fill="white"/>
          </svg>
            Вернуться</button>
      </section>

      <section className={style.account__info}>
        <h2 className={style.account__transfers_title}>История переводов</h2>

        <div className={style.account__chart}>
          <div className={style.account__chart_wrap}>
            <div className={style.account__chart_sort}>
              <h3 className={style.account__chart_title}>Динамика {value}</h3>
              <select className={style.account__chart_select}
                value={value} onChange={handleChange}>
                <option disabled={true}>Год</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>

            {selectChartData && <Line data={selectChartData} />}
          </div>
        </div>

        <Table account={account} transactions={transactions} />
      </section>

      <TransferForm />

    </div>
    )}
    </>
  );
};

