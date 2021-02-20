import React, { useContext } from 'react'
import { ArrowCounterclockwise, Clipboard, InfoCircle, PersonDash, PersonPlus, Trash } from 'react-bootstrap-icons';
import UserContext from '../../contexts/UserContext';
import { jsonParse } from '../../helpers/helper';
import { toastNotification } from '../../helpers/Toastify';
import AppBottomTooltip from '../AppBottomTooltip';

const Actions = ({ actions = [], value = {}, handleDeleteClick }) => {
    const { user } = useContext(UserContext);
    const { id: userId, role } = jsonParse(user);

    const copyToClipboard = token => {
        var input = document.createElement("input");
        document.body.appendChild(input);
        input.value = token;
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);

        toastNotification('success', 'Le token a été copié')
    }

    const foundUserInParticipants = value?.participants?.find(({ id }) => id === userId);

    return (
        <div className="d-flex justify-content-around">
            {value.status === 'ENABLED' && actions.labels.includes('reset') && (
                <AppBottomTooltip tooltipText="Reset les points">
                    <ArrowCounterclockwise
                        className="cursor-pointer text-dark"
                        onClick={() => actions.callback.reset(value.id)}
                        size={24}
                    />
                </AppBottomTooltip>
            )}
            {value.status === 'PENDING' && actions.labels.includes('copyToken') && (
                <AppBottomTooltip tooltipText="Copier le token">
                    <Clipboard
                        className="cursor-pointer text-primary"
                        onClick={() => copyToClipboard(value.token)}
                        size={24}
                    />
                </AppBottomTooltip>
            )}
            {actions.labels.includes('info') && (
                <AppBottomTooltip tooltipText="Voir">
                    <InfoCircle
                        className="cursor-pointer text-primary"
                        onClick={() => actions.callback.info(value.id)}
                        size={24}
                    />
                </AppBottomTooltip>
            )}
            {actions.labels.includes('participate') && (
                <AppBottomTooltip tooltipText="Participer">
                    {foundUserInParticipants ? (
                        <PersonDash
                            className="cursor-pointer text-danger"
                            onClick={() => actions.callback.participate(value.id, 'disconnect')}
                            size={24}
                        />
                    ) : (
                        <PersonPlus
                            className="cursor-pointer text-success"
                            onClick={() => actions.callback.participate(value.id, 'connect')}
                            size={24}
                        />
                    )}
                </AppBottomTooltip>
            )}
            {actions.labels.includes('deleteEvent') && (value.owner.id === userId || role === 'ADMIN') && (
                <AppBottomTooltip tooltipText="Supprimer">
                    <Trash className="cursor-pointer text-danger" onClick={() => actions.callback.deleteEvent(value.id)} size={24}/>
                </AppBottomTooltip>
            )}
            {actions.labels.includes('delete') && (
                <AppBottomTooltip tooltipText="Supprimer">
                    <Trash className="cursor-pointer text-danger" onClick={() => actions.callback.delete(value.id)} size={24}/>
                </AppBottomTooltip>
            )}
        </div>
    )
}

export default Actions;