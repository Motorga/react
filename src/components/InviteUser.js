import React, { useContext, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import LoadingContext from '../contexts/LoadingContext';

const InviteUser = ({ handleInviteMember }) => {
    const { loading } = useContext(LoadingContext);
    const [ email, setEmail ] = useState('');
    const [ role, setRole ] = useState('USER')

    return (
        <>
            <InputGroup className="align-items-center">
                <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email du membre à inviter"
                    value={email}
                    onInput={event => setEmail(event.currentTarget.value)}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            handleInviteMember(email, role);
                            setEmail('');
                        }
                    }}
                />
                <InputGroup.Append>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            if(!loading) {
                                handleInviteMember(email, role);
                                setEmail('');
                            }
                        }}
                    >
                        <div className="d-flex align-items-center">
                            {loading ? (
                                <>
                                    <div className="spinner-border text-light mr-2" style={{width: "24px", height: "24px"}}>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    Invitation en cours...
                                </>
                            ) : (
                                <>
                                    <Plus size={24}/>Inviter
                                </>
                            )}
                        </div>
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