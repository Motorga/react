import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

const InviteUser = ({ handleInviteMember }) => {
    const [ email, setEmail ] = useState('');
    const [ role, setRole ] = useState('USER')

    return (
        <>
            <InputGroup className="align-items-center">
                <Form.Control name="email" type="email" placeholder="Email du membre à inviter" onInput={event => setEmail(event.currentTarget.value)} />
                <InputGroup.Append>
                    <Button onClick={() => {
                        handleInviteMember(email, role);
                        setEmail('');
                    }}>
                        <Plus size={24}/>Inviter
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            <Form.Check 
                custom
                type="checkbox"
                id="custom-checkbox"
                label={`Cet utilisateur est un admin`}
                onClick={() => role === 'USER' ? setRole('ADMIN') : setRole('USER')}
            />
        </>
    )
}

export default InviteUser;