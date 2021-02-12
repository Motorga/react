import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ArrowCounterclockwise } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import AppBottomTooltip from '../components/AppBottomTooltip';
import AppTable from '../components/AppTable/index';
import InviteUser from '../components/InviteUser';
import UserContext from '../contexts/UserContext';
import { jsonParse } from '../helpers/helper';
import { toastNotification } from '../helpers/Toastify';
import { getUsers, updateOpenToUser, resetAllOpen, inviteMember, deleteMember } from '../services/userService';

const Members = () => {
    const history = useHistory();
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
    }, []);

    const handleInviteMember = useCallback(async (email, role) => {
        const users = await inviteMember(email, role);
        
        if (users) {
            toastNotification('success', 'Le membre a bien été invité');
            setUsers(withNameUsers(users));
        }
    }, []);

    const resetOpenMembers = useCallback(async () => {
        if (window.confirm('Es tu sûr de vouloir remettre à 0 les points OPEN de tous les membres?')) {
            await resetAllOpen();
            history.go(0);
        }
    }, [fetchUsers]);

    const handleAdd = useCallback(async (id, open) => {
        await updateOpenToUser(id, open + 1);
        history.go(0);
    }, [fetchUsers]);

    const handleMinus = useCallback(async (id, open) => {
        await updateOpenToUser(id, open - 1);
        history.go(0);
    }, [fetchUsers]);

    const resetOpenMember = useCallback(async id => {
        await updateOpenToUser(id, 0);
        history.go(0);
    }, [fetchUsers]);

    const handleDeleteMember = useCallback(async id => {
        if (window.confirm('Es tu sûr de vouloir supprimer ce membre?')) {
            const result = await deleteMember(id);
            if (result) {
                toastNotification('success', 'Le membre a bien été supprimé');
                history.go(0);
            }
        }
    }, [role])

    const actions = {
        labels: ['copyToken', 'reset', 'delete'],
        callback: {
            reset: id => resetOpenMember(id),
            delete: id => handleDeleteMember(id)
        }
    }

    return (
        <div className="container">
            <div className="text-center mb-5">
                <h1>Liste des membres</h1>
            </div>
            { role === 'ADMIN' && (
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="col-5">
                        <InviteUser handleInviteMember={handleInviteMember} />
                    </div>
                    <AppBottomTooltip tooltipText="Reset tous les points de tous les membres">
                        <Button onClick={resetOpenMembers} variant="dark"> <ArrowCounterclockwise size={24} />&nbsp;Reset all</Button>
                    </AppBottomTooltip>
                </div>
            )}
            <AppTable
                cols={cols}
                values={users}
                actions={actions}
                handleAddClick={handleAdd}
                handleMinusClick={handleMinus}
            />
        </div>
    )
}

export default Members;