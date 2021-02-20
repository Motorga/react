import React, { useCallback, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppInput from '../../components/AppInput';
import { jsonParse } from '../../helpers/helper';
import UserContext from '../../contexts/UserContext';
import { changePassword } from '../../services/authService';
import { toastNotification } from '../../helpers/Toastify';

const ChangePasswordForm = ({ setChangePassword }) => {
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Le mot de passe est obligatoire'),
        password: Yup.string().required('Le mot de passe est obligatoire')
            .notOneOf([Yup.ref('oldPassword'), null], 'Le nouveau mot de passe ne peut pas être le même que l\'ancien'),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { user } = useContext(UserContext);
    const { email } = jsonParse(user);

    const onSubmit = useCallback(async ({ oldPassword, password }) => {
        const result = await changePassword(email, oldPassword, password);
        if (result) {
            toastNotification('success', 'Votre mot de passe a été modifié');
            setChangePassword(false);
        }
    }, []);

    return (
        <div className="col-8 offset-2 col-sm-8 offset-sm-2 col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="login-card" className="card border-0">
                    <div className="mt-5">
                        <AppInput label="Mot de passe actuel" name="oldPassword" type="password" required register={register} errors={errors} />
                        <AppInput label="Nouveau mot de passe" name="password" type="password" required register={register} errors={errors} />
                        <div className="text-center">
                            <Button variant="success" type="submit">
                                Valider le changement de mot de passe
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChangePasswordForm;