import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { getEvent, updateEvent } from '../../services/eventService';
import { toastNotification } from '../../helpers/Toastify';
import EventForm from './EventForm';

const EditEvent = () => {
    const history = useHistory();
    const { id } = useParams();
    const [event, setEvent] = useState();

    const fetchEvent = async id => {
        const event = await getEvent(id);

        if (!event) {
            toastNotification('error', 'Cet event n\'existe pas')
            history.push('/events');
        }

        setEvent(event)
    };

    const onSubmit = async data => {
        await updateEvent({...data, id: event.id});
        history.push('/events');
    };

    useEffect(() => {
        if (!id) {
            toastNotification('error', 'Id manquant')
            history.push('/events');
        }

        fetchEvent(id)
    }, [id, history]);

    if (!event) {
        return (
            <div className="container">
                <Button className="mt-2" variant="secondary" onClick={() => history.push('/events')}>
                    Retour
                </Button>
                <div className="text-center mb-5">
                    <h3>Informations de la sortie en chargement...</h3>
                </div>
            </div>
        )
    }
    
    return (
        <div className="container">
            <div className="text-center mb-5">
                <h1>Modification de la sortie "{event.name}"</h1>
            </div>
            <div className="text-center">
                <EventForm
                    event={event}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}

export default EditEvent;