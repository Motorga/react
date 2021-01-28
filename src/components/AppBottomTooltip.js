import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const AppBottomTooltip = ({ children, tooltipText }) => (
    <OverlayTrigger
        key="bottom"
        placement="bottom"
        overlay={
            <Tooltip>
                {tooltipText}
            </Tooltip>
        }
    >
        {children}
    </OverlayTrigger>
)

export default AppBottomTooltip;