import React from 'react'
import { Button } from 'react-bootstrap';
import { Plus, Dash, ArrowCounterclockwise } from 'react-bootstrap-icons';
import AppBottomTooltip from './AppBottomTooltip';

const AppTableActions = ({ id, open, status, handleAddClick, handleMinusClick, handleResetClick }) => (
    <>
        {status === 'ENABLED' ? (
            <div className="d-flex justify-content-around">
                <AppBottomTooltip tooltipText="Ajouter 1 point">
                    <Button onClick={() => handleAddClick(id, open)} variant="success">
                        <Plus size={24}/>
                    </Button>
                </AppBottomTooltip>

                <AppBottomTooltip tooltipText="Retirer 1 point">
                    <Button onClick={() => handleMinusClick(id, open)} variant="danger">
                        <Dash size={24}/>
                    </Button>
                </AppBottomTooltip>

                <AppBottomTooltip tooltipText="Reset les points">
                    <Button onClick={() => handleResetClick(id)} variant="dark">
                        <ArrowCounterclockwise size={24}/>
                    </Button>
                </AppBottomTooltip>
            </div>
        ) : (
            <div className="text-center">
                -
            </div>
        )}
    </>
)

export default AppTableActions;