import React from 'react';
import { Dropdown } from 'react-bootstrap';
import MarkerColorChoiceItem from './MarkerColorChoiceItem';

const MarkerColorChoice = ({ setColor }) => (
    <Dropdown className="mr-2">
        <Dropdown.Toggle variant="light" id="dropdown-basic">
            Choix couleur
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <MarkerColorChoiceItem
                text="Bleu"
                bgColor="#3B82F6"
                setColor={setColor}
            />
            <MarkerColorChoiceItem
                text="Rouge"
                bgColor="#EF4444"
                setColor={setColor}
            />
            <MarkerColorChoiceItem
                text="Vert"
                bgColor="#10B981"
                setColor={setColor}
            />
            <MarkerColorChoiceItem
                text="Jaune"
                bgColor="#F59E0B"
                setColor={setColor}
            />
            <MarkerColorChoiceItem
                text="Violet"
                bgColor="#8B5CF6"
                setColor={setColor}
            />
            <MarkerColorChoiceItem
                text="Rose"
                bgColor="#EC4899"
                setColor={setColor}
            />
        </Dropdown.Menu>
    </Dropdown>
)

export default MarkerColorChoice;