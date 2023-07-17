import style from './AuthForm.module.css';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {submitAuthForm} from '../../../store/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import ErrorAuth from '../../ErrorAuth';

export const AuthForm = () => {
  const [showModal, setShowModal] = useState(false);
  const {token} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: {errors}
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      login: '',
      password: ''
    }
  });

  useEffect(() => {
    setFocus('login');
  }, [setFocus]);

  const onSubmit = (data) => {
    dispatch(submitAuthForm(data));
    if (!token) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } else {
      navigate(`/accounts`);
    }
    reset({ // сбросить форму после отправки
      login: '',
      password: '',
    });
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.wrap}>
          <p className={style.title}>Вход в аккаунт</p>
          <label className={style.label} htmlFor='login'>Логин
            <input
              className={style.input}
              id='login'
              {...register('login', {
                required: {
                  value: true,
                  message: 'Введите в это поле',
                },
                pattern: {
                  value: /^[a-z]{6,10}$/,
                  message: 'Неправильный формат логина'
                }
              })}
              type='text'
              aria-invalid={!!errors.login}
            />
            {errors.login && <p className={style.error}>
              {errors.login.message}</p>}
          </label>


          <label className={style.label} htmlFor='password'>Пароль
            <input
              className={style.input}
              type='password'
              id='password'
              {...register('password', {
                required: {
                  value: true,
                  message: 'Введите в это поле',
                },
                pattern: {
                  value: /[a-z]{6,10}/,
                  message: 'Неправильный формат пароля'
                }
              })}
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className={style.error}>
              {errors.password.message}</p>}
          </label>
          <button className={style.submit} type='submit'>Войти</button>
        </div>
      </form>
      {showModal && <ErrorAuth />}
    </div>
  );
};
