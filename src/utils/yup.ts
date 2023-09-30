import { boolean, object, string } from 'yup';
import { ErrorsForm } from '../const';

const loginSchema = object({
  email: string().required(ErrorsForm.Required).matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ErrorsForm.Email),
  password: string()
    .required(ErrorsForm.Required)
    .min(3, ErrorsForm.MinThreeWords)
    .max(15, ErrorsForm.MaxFifteenWords)
    .matches(/(?=.*[a-zA-Z])(?=.*[0-9])/, ErrorsForm.Password),
  agreement: boolean().oneOf([true], ErrorsForm.Agreement),
});

const bookingSchema = (peopleMinMax: [number, number]) => peopleMinMax && object({
  date: string().required(ErrorsForm.Required),
  name: string().required(ErrorsForm.Required).max(15, ErrorsForm.MaxFifteenWords),
  tel: string().required(ErrorsForm.Required).matches(/^((8|\+7)[\\-]?)?(\(?\d{3}\)?[\\-]?)?[\d\\-]{7,10}$/ , ErrorsForm.Tel),
  person: string()
    .required(ErrorsForm.Required)
    .test('person', (value, { createError }) => {
      if (Number(value) < peopleMinMax[0]) {
        return createError({ message: `${ErrorsForm.PersonMin}${peopleMinMax[0]}`});
      }
      if (Number(value) > peopleMinMax[1]) {
        return createError({ message: `${ErrorsForm.PersonMax}${peopleMinMax[1]}`});
      }
      return true;
    }),
  agreement: boolean().oneOf([true], ErrorsForm.Agreement),
});

export { loginSchema, bookingSchema };
