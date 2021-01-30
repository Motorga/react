import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppInput from '../../components/AppInput';

const ForgotPassword = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email invalide')
            .required('Email obligatoire')
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });
    
    const onSubmit = useCallback(() => {
        console.log('submit')
    }, []);

    return (
        <div className="col-xs-12 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 mt-5">
            <div className="text-center">
                <h1>Motorga</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div id="login-card" className="card border-0">
                    <div className="mt-5">
                        <AppInput label="Email" name="email" type="email" required register={register} errors={errors} />
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Changer de mot de passe
                            </Button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="login" className="btn-link pr-0">Retour à la connexion</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
} 

export default ForgotPassword;