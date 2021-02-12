import React, { useCallback, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Error from '../../components/Error';
import AppInput from '../../components/AppInput';
import UserContext from '../../contexts/UserContext';
import { jsonParse } from '../../helpers/helper';
import { addEvent } from '../../services/eventService';
import { Redirect, useHistory } from 'react-router-dom';
import { toastNotification } from '../../helpers/Toastify';

const NewEvent = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est obligatoire'),
        description: Yup.string().required('La description est obligatoire'),
        date: Yup.string().required('La date est obligatoire'),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const history = useHistory();
    const { user } = useContext(UserContext);
    const { id: userId } = jsonParse(user);

    const onSubmit = useCallback(async data => {
        const event = await addEvent({...data, date: new Date(data.date), userId });

        if (event) {
            toastNotification('success', 'Sortie créée');
            history.push('/events', 'refresh')
        }
    })
    
    return (
        <div className="container">
            <div className="text-center mb-5">
                <h1>Création d'une sortie</h1>
            </div>

            <div className="text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-4 offset-4">
                        <AppInput
                            label="Nom"
                            name="name"
                            required
                            register={register}
                            errors={errors}
                        />
                        <Form.Group>
                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={5} ref={register} name="description" required className={(errors.description  ? ' is-invalid' : '')}/>
                            <Error error={errors.description} />
                        </Form.Group>
                        <AppInput
                            label="Date"
                            name="date"
                            type="datetime-local"
                            required
                            register={register}
                            errors={errors}
                        />
                        <div className="text-center">
                            <Button className="mr-2" variant="success" type="submit">
                                Créer
                            </Button>
                            <Button variant="secondary" onClick={() => history.push('/events')}>
                                Annuler
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewEvent;