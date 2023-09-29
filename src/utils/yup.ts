import { boolean, number, object, string } from 'yup';
import { ErrorsForm } from '../const';

const loginSchema = object({
  email: string().required(ErrorsForm.Required).matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ErrorsForm.Email),
  password: string()
    .required(ErrorsForm.Required)
    .min(3, ErrorsForm.PasswordMin)
    .max(15, ErrorsForm.PasswordMax)
    .matches(/(?=.*[a-zA-Z])(?=.*[0-9])/, ErrorsForm.Password),
  agreement: boolean().oneOf([true], ErrorsForm.Agreement),
});

const bookingSchema = object({
  date: string().required(ErrorsForm.Required),
  name: string().required(ErrorsForm.Required),
  tel: string().required(ErrorsForm.Required),
  person: number().required(ErrorsForm.Required),
  agreement: boolean().oneOf([true], ErrorsForm.Agreement),
});

export { loginSchema, bookingSchema };
