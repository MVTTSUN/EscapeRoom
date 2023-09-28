import style from './preloader.module.css';

export function Preloader() {
  return (
    <div className={style['blur']}>
      <div className={style['lds-hourglass']}></div>
    </div>
  );
}
