import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ArrowCounterclockwise } from 'react-bootstrap-icons';
import AppBottomTooltip from '../components/AppBottomTooltip';
import AppTable from '../components/AppTable/index';
import InviteUser from '../components/InviteUser';
import UserContext from '../contexts/UserContext';
import { jsonParse } from '../helpers/helper';
import { toastNotification } from '../helpers/Toastify';
import { getUsers, updateOpenToUser, resetAllOpen, inviteMember, deleteMember } from '../services/userService';

const Members = () => {
    const { user } = useContext(UserContext);
    const { role } = jsonParse(user);

    const [ users, setUsers ] = useState([]);
    const commonCols = [
        { label: 'Nom et prénom', key: 'name' },
        { label: 'Promotion', key: 'promotion' },
        { label: 'Moto', key: 'bike' },
    ]
    let additionalCols = [];

    if (role === 'ADMIN') {
        additionalCols = [
            { label: 'Status', key: 'status' },
            { label: 'Points OPEN', key: 'open' },
            { label: 'Actions', key: 'actions' }
        ]
    }

    const cols = [...commonCols, ...additionalCols];

    const withNameUsers = users => {
        return users?.map(user => {
            return {...user, name: user.status === 'PENDING' ? user.email : `${user.lastname} ${user.firstname}`};
        })
    }

    const fetchUsers = useCallback(() => {
        let status = ['ENABLED'];
        
        if (role === 'ADMIN') {
            status = ['ENABLED', 'PENDING', 'DISABLED']
        }
        
        getUsers(status).then(users => {
            setUsers(withNameUsers(users));
        })
    }, [role])

    useEffect(() => {
        fetchUsers();
    });

    const handleAddClick = useCallback((id, open) => {
        updateOpenToUser(id, open + 1).then(() => fetchUsers());
    }, [fetchUsers]);

    const handleMinusClick = useCallback((id, open) => {
        updateOpenToUser(id, open - 1).then(() => fetchUsers());
    }, [fetchUsers]);

    const handleResetClick = useCallback(id => {
        updateOpenToUser(id, 0).then(() => fetchUsers());
    }, [fetchUsers]);

    const handleResetAllClick = useCallback(() => {
        if (window.confirm('Es tu sûr de vouloir remettre à 0 les points OPEN de tous les membres?')) {
            resetAllOpen().then(() => {
                fetchUsers()
            });
        }
    }, [fetchUsers]);

    const handleInviteClick = useCallback(async (email, role) => {
        const users = await inviteMember(email, role);
        
        if (users) {
            toastNotification('success', 'Le membre a bien été invité');
            setUsers(withNameUsers(users));
        }
    }, []);

    const handleDeleteClick = useCallback(async id => {
        if (window.confirm('Es tu sûr de vouloir supprimer ce membre?')) {
            const users = await deleteMember(id);
            if (users) {
                toastNotification('success', 'Le membre a bien été supprimé');
                setUsers(withNameUsers(users));
            }
        }
    }, [])

    return (
        <div className="container">
            <div className="text-center mb-3">
                <h1>Liste des membres</h1>
            </div>
            { role === 'ADMIN' && (
                <div className="row justify-content-between align-items-center mb-3">
                    <div className="col-5">
                        <InviteUser handleInviteClick={handleInviteClick} />
                    </div>
                    <AppBottomTooltip tooltipText="Reset tous les points de tous les membres">
                        <Button onClick={handleResetAllClick} variant="dark"> <ArrowCounterclockwise size={24} />&nbsp;Reset all</Button>
                    </AppBottomTooltip>
                </div>
            )}
            <AppTable
                cols={cols}
                values={users}
                handleAddClick={handleAddClick}
                handleMinusClick={handleMinusClick}
                handleResetClick={handleResetClick}
                handleDeleteClick={handleDeleteClick}
            />
        </div>
    )
}

export default Members;