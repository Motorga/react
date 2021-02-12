import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';

import AppTable from '../../components/AppTable';
import UserContext from '../../contexts/UserContext';
import { formatDateTime, jsonParse } from '../../helpers/helper';
import { toastNotification } from '../../helpers/Toastify';
import { getEvents, addParticipantToEvent, deleteEvent } from '../../services/eventService';

const Events = () => {
    const cols = [
        { label: 'Nom', key: 'name' },
        { label: 'Date', key: 'date' },
        { label: 'Participants', key: 'countParticipants' },
        { label: 'Actions', key: 'actions' },
    ];

    const history = useHistory();

    const { user } = useContext(UserContext);
    const { id: userId } = jsonParse(user);
    const [events, setEvents] = useState([]);

    if (history.location.state === 'refresh') {
        history.push('/events');
        history.go(0);
    }

    const fetchEvents = async () => {
        const events = await getEvents()
        const mappedEvents = events.map(event => ({
            ...event,
            date: formatDateTime(event.date),
            countParticipants: event.participants?.length || 0
        }))

        setEvents(mappedEvents);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAddEventClick = useCallback(() => {
        history.push(`/events/new`);
    }, []);

    const handleInfoEvent = useCallback(id => {
        history.push(`/events/${id}`);
    }, [])

    const handleParticipateEvent = useCallback(async (id, connectOrDisconnect) => {
        const result = await addParticipantToEvent(connectOrDisconnect, id, userId);
        if (result) {
            let message = '';
            if (connectOrDisconnect === 'connect') {
                message = 'Vous avez été enregistré dans la liste des participants';
            } else if (connectOrDisconnect === 'disconnect') {
                message = 'Vous avez été retiré de la liste des participants';
            }
            toastNotification('success', message);
            history.go(0);
        }
    }, [fetchEvents, userId]);

    const handleDeleteEvent = useCallback(async id => {
        if (window.confirm('Es tu sûr de vouloir supprimer cette sortie?')) {
            const result = await deleteEvent(id);
    
            if (result) {
                toastNotification('success', 'Sortie supprimée');
                history.go(0);
            }
        }
    }, [fetchEvents]);

    const actions = {
        labels: ['info', 'participate', 'deleteEvent'],
        callback: {
            info: id => handleInfoEvent(id),
            participate: (id, connectOrDisconnect) => handleParticipateEvent(id, connectOrDisconnect),
            deleteEvent: id => handleDeleteEvent(id)
        }
    };

    return (
        <div className="container">
            <div className="text-center mb-3">
                <h1>Liste des sorties</h1>
            </div>
            <div className="d-flex justify-content-end mb-3">
                <Button
                    onClick={handleAddEventClick}
                    variant="primary"
                >
                    <Plus size={24} />
                    Ajouter une sortie
                </Button>
            </div>
            <AppTable
                cols={cols}
                values={events}
                actions={actions}
            />
        </div>
    )
}

export default Events;