import React from 'react';
import { Button } from 'react-bootstrap';
import { Dash, Plus } from 'react-bootstrap-icons';
import AppBottomTooltip from '../AppBottomTooltip';

const Open = ({ id, open, status, handleAddClick, handleMinusClick }) => {
    if (status !== 'ENABLED') {
        return null  
    }

    return (
        <>
            <AppBottomTooltip tooltipText="Ajouter 1 point">
                <Button className="mr-3" onClick={() => handleAddClick(id, open)} variant="success">
                    <Plus size={24}/>
                </Button>
            </AppBottomTooltip>
            {open}
            <AppBottomTooltip tooltipText="Retirer 1 point">
                <Button className="ml-3" onClick={() => handleMinusClick(id, open)} variant="danger">
                    <Dash size={24}/>
                </Button>
            </AppBottomTooltip>
        </>
    )
}

export default Open;