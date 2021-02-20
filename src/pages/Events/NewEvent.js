import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { jsonParse } from '../../helpers/helper';
import { addEvent } from '../../services/eventService';
import { toastNotification } from '../../helpers/Toastify';
import EventForm from './EventForm';

const NewEvent = () => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const { id: userId } = jsonParse(user);

    const onSubmit = async data => {
        const event = await addEvent({...data, date: new Date(data.date), userId });

        if (event) {
            toastNotification('success', 'Sortie créée');
            history.push(`/events/${event.id}`)
        }
    };
    
    return (
        <div className="container">
            <div className="text-center mb-5">
                <h1>Création d'une sortie</h1>
            </div>

            <div className="text-center">
                <EventForm
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}

export default NewEvent;