type Login = {
  email: string;
  password: string;
  agreement: boolean;
};

type Booking = {
  date: string;
  name: string;
  tel: string;
  children: boolean;
  person: number;
  agreement: boolean;
}

export type { Login, Booking };
