import { QuestBookingInfo } from '../../types/quest-data';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { Booking } from '../../types/forms';
import { bookingSchema } from '../../utils/yup';
import { InputName } from '../../const';
import { useEffect, useState } from 'react';
import { postQuestBookingAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';

type BookingFormProps = {
  questBookingInfo?: QuestBookingInfo | null;
  peopleMinMax?: [number, number];
};

export function BookingForm(props: BookingFormProps) {
  const { id } = useParams();
  const { questBookingInfo, peopleMinMax } = props;
  const [peopleMinMaxState, setPeopleMinMaxState] = useState<[number, number]>([0, 0]);
  const dispatch = useAppDispatch();
  const { register, reset, handleSubmit, formState: { errors, isValid} } = useForm<Booking>({
    mode: 'onChange',
    resolver: yupResolver(bookingSchema(peopleMinMaxState)) as unknown as Resolver<Booking>,
  });

  const onSubmit: SubmitHandler<Booking> = (data) => {
    const date = data.date.includes('today') ? 'today' : 'tomorrow';
    const time = data.date.replace(date, '').replace('h', ':').replace('m', '');

    if (questBookingInfo && id) {
      dispatch(postQuestBookingAction({
        id,
        data: {
          date,
          time,
          contactPerson: data.name,
          phone: data.tel,
          withChildren: data.children,
          peopleCount: Number(data.person),
          placeId: questBookingInfo.id
        }
      }));
    }
  };

  useEffect(() => {
    if (peopleMinMax) {
      setPeopleMinMaxState(peopleMinMax);
    }
  }, [peopleMinMax]);

  useEffect(() => {
    reset();
  }, [questBookingInfo]);

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit) as () => void}>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {questBookingInfo?.slots.today.map((slot) => (
              <label key={`${slot.time}`} className="custom-radio booking-form__date">
                <input
                  disabled={!slot.isAvailable}
                  type="radio"
                  id={`today${slot.time.split(':')[0]}h${slot.time.split(':')[1]}m`}
                  {...register(InputName.Date)}
                  value={`today${slot.time.split(':')[0]}h${slot.time.split(':')[1]}m`}
                />
                <span className="custom-radio__label">{slot.time}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {questBookingInfo?.slots.tomorrow.map((slot) => (
              <label key={`${slot.time}`} className="custom-radio booking-form__date">
                <input
                  disabled={!slot.isAvailable}
                  type="radio"
                  id={`tomorrow${slot.time.split(':')[0]}h${slot.time.split(':')[1]}m`}
                  {...register(InputName.Date)}
                  value={`tomorrow${slot.time.split(':')[0]}h${slot.time.split(':')[1]}m`}
                /><span className="custom-radio__label">{slot.time}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className='custom-input__label'>{errors.date?.message}</div>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input type="text" id="name" {...register(InputName.Name)} placeholder="Имя"/>
          <div className='custom-input__label'>{errors.name?.message}</div>
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input type="tel" id="tel" {...register(InputName.Tel)} placeholder="Телефон"/>
          <div className='custom-input__label'>{errors.tel?.message}</div>
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input type="number" id="person" {...register(InputName.Person)} placeholder="Количество участников"/>
          <div className='custom-input__label'>{errors.person?.message}</div>
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input type="checkbox" id="children" {...register(InputName.Children)}/>
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit" type="submit" disabled={!isValid}>Забронировать</button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input type="checkbox" id="id-order-agreement" {...register(InputName.Agreement)}/>
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
  );
}
