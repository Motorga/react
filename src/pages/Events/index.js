import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns'

import AppTable from '../../components/AppTable';
import UserContext from '../../contexts/UserContext';
import LoadingContext from '../../contexts/LoadingContext';
import { jsonParse } from '../../helpers/helper';
import { toastNotification } from '../../helpers/Toastify';
import { getEvents, addParticipantToEvent, deleteEvent } from '../../services/eventService';

const Events = () => {
    const cols = [
        { label: 'Nom', key: 'name' },
        { label: 'Date', key: 'date' },
        { label: 'Organisateur', key: 'ownerName' },
        { label: 'Participants', key: 'countParticipants' },
        { label: 'Actions', key: 'actions' },
    ];

    const history = useHistory();

    const { setLoading } = useContext(LoadingContext)
    const { user } = useContext(UserContext);
    const { id: userId } = jsonParse(user);
    const [events, setEvents] = useState([]);

    if (history.location.state === 'refresh') {
        history.push('/events');
    }

    const fetchEvents = async () => {
        setLoading(true);
        const events = await getEvents()
        const mappedEvents = events?.map(event => ({
            ...event,
            date: format(new Date(event.date), 'dd/MM/yyyy HH:mm'),
            ownerName: `${event.owner.firstname} ${event.owner.lastname}`,
            countParticipants: event.participants?.length || 0
        }))

        setLoading(false);
        setEvents(mappedEvents);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAddEventClick = () => {
        history.push(`/events/new`);
    };

    const handleInfoEvent = id => {
        history.push(`/events/${id}`);
    };

    const handleParticipateEvent = async (id, connectOrDisconnect) => {
        setLoading(true);
        const result = await addParticipantToEvent(connectOrDisconnect, id, userId);
        setLoading(false);
        if (result) {
            let message = '';
            if (connectOrDisconnect === 'connect') {
                message = 'Vous avez été enregistré dans la liste des participants';
            } else if (connectOrDisconnect === 'disconnect') {
                message = 'Vous avez été retiré de la liste des participants';
            }
            toastNotification('success', message);
            fetchEvents();
        }
    };

    const handleEditEvent = id => {
        history.push(`/events/${id}/edit`);
    }

    const handleDeleteEvent = async id => {
        if (window.confirm('Es tu sûr de vouloir supprimer cette sortie?')) {
            setLoading(true);
            const result = await deleteEvent(id);
            setLoading(false);
    
            if (result) {
                toastNotification('success', 'Sortie supprimée');
                fetchEvents();
            }
        }
    };

    const actions = {
        labels: ['info', 'participate', 'edit', 'deleteEvent'],
        callback: {
            info: id => handleInfoEvent(id),
            participate: (id, connectOrDisconnect) => handleParticipateEvent(id, connectOrDisconnect),
            edit: id => handleEditEvent(id),
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