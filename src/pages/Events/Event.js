import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toastNotification } from '../../helpers/Toastify';
import { formatDateTime } from '../../helpers/helper';
import { getEvent } from '../../services/eventService';

const Event = () => {
    const history = useHistory();
    const { id } = useParams();
    const [event, setEvent] = useState({});

    const fetchEvent = useCallback(async id => {
        const event = await getEvent(id);

        if (!event) {
            toastNotification('error', 'Cet event n\'existe pas')
            history.push('/events');
        }

        setEvent(event)
    }, [history])

    useEffect(() => {
        if (!id) {
            toastNotification('error', 'Id manquant')
            history.push('/events');
        }

        fetchEvent(id)
    }, [id, history]);

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
                    {formatDateTime(event.date)}
                    <h4>Participants:</h4>
                    {event.participants?.map(participant => (
                        <p>
                            {participant.firstname} {participant.lastname}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Event;