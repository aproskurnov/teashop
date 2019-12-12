import * as Yup from 'yup';

const phoneRegExp = /^\+7\(([1-9]{1})([0-9]{2})\)([0-9]{3})-([0-9]{2})-([0-9]{2})$/;

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string().required('Укажите имя'),
  email: Yup.string()
    .email('Некорректный email')
    .required('Укажите email'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Неверный телефон')
    .required('Укажите телефон'),
  password: Yup.string()
    .min(6, 'Слишком короткий пароль')
    .required('Укажите пароль'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли  не совпадают')
    .required('Укажите пароль еще раз'),
});

export default RegisterFormSchema;
