import React from 'react';
import { Dash, Plus } from 'react-bootstrap-icons';
import AppBottomTooltip from '../AppBottomTooltip';

const Open = ({ value = {}, handleAddClick, handleMinusClick }) => {
    if (value.status !== 'ENABLED') {
        return null  
    }

    return (
        <>
            <AppBottomTooltip tooltipText="Ajouter 1 point">
                <Plus className="cursor-pointer text-success mr-3" onClick={() => handleAddClick(value.id, value.open)} size={24}/>
            </AppBottomTooltip>
            {value.open}
            <AppBottomTooltip tooltipText="Retirer 1 point">
                <Dash className="cursor-pointer text-danger ml-3" onClick={() => handleMinusClick(value.id, value.open)} size={24}/>
            </AppBottomTooltip>
        </>
    )
}

export default Open;