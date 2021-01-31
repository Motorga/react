import React from 'react'
import { Button } from 'react-bootstrap';
import { ArrowCounterclockwise, Clipboard, Trash } from 'react-bootstrap-icons';
import { toastNotification } from '../../helpers/Toastify';
import AppBottomTooltip from '../AppBottomTooltip';

const Actions = ({ id, status, token, handleResetClick, handleDeleteClick }) => {
    const copyToClipboard = token => {
        var input = document.createElement("input");
        document.body.appendChild(input);
        input.value = token;
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);

        toastNotification('success', 'Le token a été copié')
    }

    return (
        <div className="d-flex justify-content-around">
            {status === 'ENABLED' ? (
                <AppBottomTooltip tooltipText="Reset les points">
                    <Button onClick={() => handleResetClick(id)} variant="dark">
                        <ArrowCounterclockwise size={24}/>
                    </Button>
                </AppBottomTooltip>
            ) : (
                <AppBottomTooltip tooltipText="Copier le token">
                    <Button onClick={() => copyToClipboard(token)}>
                        <Clipboard size={24}/>
                    </Button>
                </AppBottomTooltip>
            )}
            <AppBottomTooltip tooltipText="Supprimer le membre">
                <Button onClick={() => handleDeleteClick(id)} variant="danger">
                    <Trash size={24}/>
                </Button>
            </AppBottomTooltip>
        </div>
    )
}

export default Actions;