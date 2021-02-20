import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns'

import AppInput from '../../components/AppInput';
import Error from '../../components/Error';
import { useHistory } from 'react-router-dom';

const EventForm = ({ event = {}, onSubmit }) => {
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est obligatoire'),
        description: Yup.string().required('La description est obligatoire'),
        date: Yup.string().required('La date est obligatoire'),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const min = format(new Date(), 'yyyy-MM-dd') + 'T00:00';
    let formatDate = '';
    if (event.date) {
        formatDate = format(new Date(event.date), 'yyyy-MM-dd') + 'T' + format(new Date(event.date), 'HH:mm');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-4 offset-4">
                <AppInput
                    label="Nom"
                    name="name"
                    defaultValue={event.name}
                    required
                    register={register}
                    errors={errors}
                />
                <Form.Group>
                    <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        ref={register}
                        name="description"
                        defaultValue={event.description}
                        required
                        className={(errors.description  ? ' is-invalid' : '')}
                    />
                    <Error error={errors.description} />
                </Form.Group>
                <AppInput
                    label="Date"
                    name="date"
                    type="datetime-local"
                    defaultValue={formatDate}
                    required
                    min={min}
                    register={register}
                    errors={errors}
                />
                <div className="text-center">
                    <Button className="mr-2" variant="success" type="submit">
                        Modifier
                    </Button>
                    <Button variant="secondary" onClick={() => history.push('/events')}>
                        Annuler
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default EventForm;