import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classes from './FormPage.module.scss';

const regex = /^\d+$/

const schema = Yup.object().shape({
    name: Yup.string().required('обязательное').min(3, 'Необдимо 3 символа'),
    age: Yup.string().required('обязательное').min(3, 'Необдимо 3 символа').matches(regex, 'только цифры') })
const FormPage = () => {
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
            defaultValues: {
                age: 18
            },
            resolver: yupResolver(schema)
        }
    );

    const submit = (data) => {
        console.log(data);
    };
    const error = (data) => {
        console.log(data);
    };

    console.log(errors,'errors');

    const name = watch('name')

    return (
        <div>
            <p>{name}</p>
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
                    placeholder="Напишите возраст"
                    aria-invalid={errors.age ? true : false}
                    {
                        ...register('age')
                    }
                />

                {
                    errors?.age?.message && <p>{errors.age.message}</p>
                }
                <button type={'button'} onClick={()=> setValue('name', 'Артур')}>Добавить имя Ректора</button>
                <button type={'button'} onClick={()=> reset()}>очистить поле</button>
                <button type={'button'} onClick={()=> clearErrors()}>очистить ошибки</button>
                <button >Отправить</button>
            </form>
        </div>
    );
};

export default FormPage;