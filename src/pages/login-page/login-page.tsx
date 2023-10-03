import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { Login } from '../../types/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/yup';
import { InputName } from '../../const';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useLocation } from 'react-router-dom';

export function LoginPage() {
  const { state: { from }} = useLocation() as { state: { from: string } };
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors, isValid} } = useForm<Login>({
    defaultValues: {
      email: '',
      password: '',
      agreement: false,
    },
    mode: 'onChange',
    resolver: yupResolver(loginSchema) as unknown as Resolver<Login>,
  });

  const onSubmit: SubmitHandler<Login> = ({ email, password }) => {
    dispatch(loginAction({ email, password, from}));
  };

  return (
    <main className="decorated-page login">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"/>
          <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt=""/>
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="login__form">
          <form className="login-form" onSubmit={handleSubmit(onSubmit) as () => void}>
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                  <input {...register(InputName.Email)} type="email" id="email" placeholder="Адрес электронной почты"/>
                  <div className='custom-input__label'>{errors.email?.message}</div>
                </div>
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">Пароль</label>
                  <input {...register(InputName.Password)} type="password" id="password" placeholder="Пароль"/>
                  <div className='custom-input__label'>{errors.password?.message}</div>
                </div>
              </div>
              <button className="btn btn--accent btn--general login-form__submit" disabled={!isValid} type="submit">Войти</button>
            </div>
            <label className="custom-checkbox login-form__checkbox">
              <input {...register(InputName.Agreement)} type="checkbox" id="id-order-agreement"/>
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">Я&nbsp;согласен с
                <a className="link link--active-silver link--underlined" href="*">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
              </span>
            </label>
            <div className='custom-input__label'>{errors.agreement?.message}</div>
          </form>
        </div>
      </div>
    </main>
  );
}
