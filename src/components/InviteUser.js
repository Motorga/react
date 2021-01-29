import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

const InviteUser = ({ handleInviteClick }) => {
    const [ email, setEmail ] = useState('');

    return (
        <InputGroup className="align-items-center">
            <Form.Control name="email" type="email" placeholder="Email du membre à inviter" onInput={event => setEmail(event.currentTarget.value)} />
            <InputGroup.Append>
                <Button onClick={() => handleInviteClick(email)}><Plus size={24}/>Inviter</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default InviteUser;