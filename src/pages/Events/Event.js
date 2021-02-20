import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toastNotification } from '../../helpers/Toastify';
import { formatDateTime } from '../../helpers/helper';
import { getEvent } from '../../services/eventService';

const Event = () => {
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
            <Button className="mt-2" variant="secondary" onClick={() => history.push('/events')}>
                Retour
            </Button>
            <div className="text-center mb-5">
                <h1>{event.name}</h1>
            </div>
            <div className="row">
                <div className="col-4 offset-2">
                    <h4>Description:</h4>
                    {event.description}
                </div>
                <div className="col-4 offset-2">
                    <h4>Date:</h4>
                    <p>{formatDateTime(event.date)}</p>
                    <h4>Organisateur:</h4>
                    <p>
                        {event.owner.firstname} {event.owner.lastname}
                    </p>
                    <h4>Participants:</h4>
                    {event.participants?.map((participant, index) => (
                        <p key={index}>
                            {participant.firstname} {participant.lastname}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Event;