import React, { useCallback, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import jwt_decode from 'jwt-decode';

import { registerMember } from '../../services/authService';
import { toastNotification } from '../../helpers/Toastify';
import UserContext from '../../contexts/UserContext';
import TokenContext from '../../contexts/TokenContext';
import { jsonStringify } from '../../helpers/helper';
import AppInput from '../../components/AppInput';
import AppSelect from '../../components/AppSelect';

const promotions = [
    {value: '1I', label: '1I'},
    {value: '1A', label: '1A'},
    {value: '2I', label: '2I'},
    {value: '2A', label: '2A'},
    {value: '3A', label: '3A'},
    {value: '4A', label: '4A'},
    {value: '5A', label: '5A'},
];

const Register = () => {
    const history = useHistory();
    const { setUser } = useContext(UserContext);
    const { setToken } = useContext(TokenContext);

    const query = new URLSearchParams(useLocation().search)
    const urlToken = query.get('token');

    if (!urlToken) {
        toastNotification('error', 'Le token présent dans le lien est incorrecte.');
        history.push('/login');
    }

    const promotionsValues = promotions.map(promotion => promotion.value);
    const validationSchema = Yup.object().shape({
        lastname: Yup.string().required('Le nom est obligatoire'),
        firstname: Yup.string().required('Le prénom est obligatoire'),
        password: Yup.string().required('Le mot de passe est obligatoire'),
        promotion: Yup.string().oneOf(promotionsValues, 'La promotion n\'est pas valide').required('La promotion est obligatoire')
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = useCallback(({ password, lastname, firstname, promotion }, event) => {
        registerMember(urlToken, password, lastname, firstname, promotion).then(result => {
            if (result?.token) {
                setToken(result.token);
                const user = jwt_decode(result.token);
                setUser(jsonStringify(user))
                toastNotification('success', `Bienvenue sur Motorga ${user.firstname}!`);
                history.push('/');
            }
        });
    }, [urlToken, setToken, setUser, history]);

    return (
        <div className="col-xs-12 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 mt-5">
            <div className="text-center">
                <h1>Motorga</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="login-card" className="card border-0">
                    <div className="mt-5">
                        <AppInput label="Mot de passe" name="password" type="password" required register={register} errors={errors} />
                        <AppInput label="Nom" name="lastname" required register={register} errors={errors} />
                        <AppInput label="Prénom" name="firstname" required register={register} errors={errors} />
                        <AppSelect label="Promotion" name="promotion" optionLabel="Choisir votre promotion" options={promotions} required register={register} errors={errors} />
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Créer mon compte
                            </Button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="login" className="btn-link pr-0">Me connecter</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;