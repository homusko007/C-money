import style from './Table.module.css';
import cn from 'classnames';
import formatDate from '../../../../utils/formatDate';
import {PropTypes} from 'prop-types';

export const Table = ({account, transactions}) => (
  <div className={style.account__transactions_wrap}>
    <table className={style.transactions_table}>
      <thead className={style.table_header}>
        <tr className={style.table_header_row}>
          <th
            className={cn(style.table__cell,
              style.table__cell_account)}>
                Счет</th>
          <th className={style.table__cell}>
                Сумма</th>
          <th className={style.table__cell}>
                Дата</th>
        </tr>
      </thead>
      <tbody className={style.table_body}>
        {[...transactions].map((data, i) => (
          <tr key={i} className={style.table_row}>
            <td className={cn(style.table__cell,
              style.table__cell_account)}>{
                      data.from === account ? (
                        data.to) : (data.from)
              }</td>
            <td className={data.from === account ? style.minus :
                  style.table__cell_sum}>
              {data.amount}</td>
            <td className={cn(style.table__cell, style.table_cell_date)}>
              {formatDate(data.date)}</td>
          </tr>
        ))}

      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  transactions: PropTypes.any,
  account: PropTypes.string,
};
