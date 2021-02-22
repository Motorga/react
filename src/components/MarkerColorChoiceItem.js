import React from 'react';
import { Dropdown } from 'react-bootstrap';

const MarkerColorChoiceItem = ({ text, bgColor, setColor, selected = false}) => {
    return (
        <Dropdown.Item
            className="d-flex align-items-center"
            style={selected ? {backgroundColor:  "#D1D5DB"} : null}
            onClick={() => setColor(bgColor)}
        >
            <div className="mr-1" style={{width: "10px", height: "10px", backgroundColor: bgColor}}></div>
            { text }
        </Dropdown.Item>
    )
}

export default MarkerColorChoiceItem;