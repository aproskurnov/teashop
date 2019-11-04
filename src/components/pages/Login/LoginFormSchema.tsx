import * as Yup from "yup"

const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Некорректный email")
        .required("Укажите email"),
    password: Yup.string()
        .min(2, "Слишком короткий пароль")
        .required("Укажите пароль")
});

export default LoginFormSchema;