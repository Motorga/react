import React from 'react';
import { Dropdown } from 'react-bootstrap';
import MarkerColorChoiceItem from './MarkerColorChoiceItem';

const MarkerColorChoice = ({ color, setColor }) => (
    <Dropdown className="mr-2">
        <Dropdown.Toggle variant="light" id="dropdown-basic">
            Choix couleur
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <MarkerColorChoiceItem
                text="Bleu"
                bgColor="#3B82F6"
                setColor={setColor}
                selected={color === "#3B82F6"}
            />
            <MarkerColorChoiceItem
                text="Rouge"
                bgColor="#EF4444"
                setColor={setColor}
                selected={color === "#EF4444"}
            />
            <MarkerColorChoiceItem
                text="Vert"
                bgColor="#10B981"
                setColor={setColor}
                selected={color === "#10B981"}
            />
            <MarkerColorChoiceItem
                text="Jaune"
                bgColor="#F59E0B"
                setColor={setColor}
                selected={color === "#F59E0B"}
            />
            <MarkerColorChoiceItem
                text="Violet"
                bgColor="#8B5CF6"
                setColor={setColor}
                selected={color === "#8B5CF6"}
            />
            <MarkerColorChoiceItem
                text="Rose"
                bgColor="#EC4899"
                setColor={setColor}
                selected={color === "#EC4899"}
            />
        </Dropdown.Menu>
    </Dropdown>
)

export default MarkerColorChoice;