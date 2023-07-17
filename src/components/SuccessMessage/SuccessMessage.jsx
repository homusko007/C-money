import style from './SuccessMessage.module.css';
import ReactDOM from 'react-dom';
import cn from 'classnames';


export const SuccessMessage = () => ReactDOM.createPortal(
  <div
    className={cn(style.topright, style.warning, style.doshow)}>
      Перевод прошел успешно!
  </div>,
  document.getElementById('error-root'),
);
