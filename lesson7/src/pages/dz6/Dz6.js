import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classes from './Dz6.module.scss';


const regex = /^\d+$/;
const regExEmail = new RegExp(/^[a-zA-Z\d-_\.]+@[a-zA-Z\d-_]+\.[a-zA-Z-_]{2,8}$/);

const schema = Yup.object().shape({
        name: Yup.string().required('обязательное').min(3, 'Необдимо 3 символа'),
        email: Yup.string().required('обязательное').matches(regExEmail, 'почта'),
        password: Yup.string().required('обязательное').matches(regex, 'почта'),
        re_password: Yup.string().oneOf([Yup.ref('password'), null, 'пароли должны совпадать'])}
);


const Dz6 = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        clearErrors,
        setValue,
        reset
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const submit = (data) => {
        console.log(data);
    };
    const error = (data) => {
        console.log(data);
    };

    console.log(errors, 'errors');

    return (
        <div>
            <form onSubmit={handleSubmit(submit, error)} className={classes.form}>
                <input
                    type="text"
                    placeholder="Напишите имя"
                    aria-invalid={errors.name ? true : false}
                    {
                        ...register('name')
                    }
                />
                {
                    errors?.name?.message && <p>{errors.name.message}</p>
                }
                <input
                    type="text"
                    placeholder="почта"
                    aria-invalid={errors.email ? true : false}
                    {
                        ...register('email')
                    }
                />
                {
                    errors?.email?.message && <p>{errors.email.message}</p>
                }
                <input
                    type="text"
                    placeholder="password"
                    aria-invalid={errors.password ? true : false}
                    {
                        ...register('password')
                    }
                />
                {
                    errors?.password?.message && <p>{errors.password.message}</p>
                }
                <input
                    type="text"
                    placeholder="re_password"
                    aria-invalid={errors.re_password ? true : false}
                    {
                        ...register('re_password')
                    }
                />
                {
                    errors?.re_password?.message && <p>{errors.re_password.message}</p>
                }
                <button>Отправить</button>
            </form>
        </div>
    );
};


export default Dz6;