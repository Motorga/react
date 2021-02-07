import React, { useCallback, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppInput from '../components/AppInput';
import AppSelect from '../components/AppSelect';
import { editMember } from '../services/userService';
import { toastNotification } from '../helpers/Toastify';
import UserContext from '../contexts/UserContext';
import { jsonStringify } from '../helpers/helper';

const promotions = [
    {value: '1I', label: '1I'},
    {value: '1A', label: '1A'},
    {value: '2I', label: '2I'},
    {value: '2A', label: '2A'},
    {value: '3A', label: '3A'},
    {value: '4A', label: '4A'},
    {value: '5A', label: '5A'},
];

const EditProfileForm = ({ user, setEditProfile }) => {
    const promotionsValues = promotions.map(promotion => promotion.value);
    const { setUser } = useContext(UserContext);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('L\'email est obligatoire'),
        lastname: Yup.string().required('Le nom est obligatoire'),
        firstname: Yup.string().required('Le prénom est obligatoire'),
        promotion: Yup.string().oneOf(promotionsValues, 'La promotion n\'est pas valide').required('La promotion est obligatoire'),
        bike: Yup.string(),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const {id, email, lastname, firstname, promotion, bike} = user;

    const onSubmit = useCallback(({ email, lastname, firstname, promotion, bike }) => {
        editMember(id, email, lastname, firstname, promotion, bike)
        .then(result => {
            if (result) {
                setUser(jsonStringify(result));
                setEditProfile(false);
                toastNotification('success', 'Profil mis à jour');
            }
        });
    }, [id, setUser, setEditProfile]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-4 offset-1">
                    <AppInput label="Email" name="email" defaultValue={email} type="email" required register={register} errors={errors} />
                </div>
                <div className="col-4 offset-1">
                    <AppSelect label="Promotion" name="promotion" defaultValue={promotion} optionLabel="Choisir votre promotion" options={promotions} required register={register} errors={errors} />
                </div>
            </div>
            <div className="row">
                <div className="col-4 offset-1">
                    <AppInput label="Nom" name="lastname" defaultValue={lastname} required register={register} errors={errors} />
                </div>
                <div className="col-4 offset-1">
                    <AppInput label="Moto" name="bike" defaultValue={bike} required register={register} errors={errors} />
                </div>
            </div>
            <div className="row">
                <div className="col-4 offset-1">
                    <AppInput label="Prénom" name="firstname" defaultValue={firstname} required register={register} errors={errors} />
                </div>
            </div>
            <div className="text-center mb-5">
                <Button variant="success" type="submit">
                    Mettre à jour mes informations
                </Button>
            </div>
        </form>
    )
}

export default EditProfileForm;