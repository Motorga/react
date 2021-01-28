import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Plus, ArrowCounterclockwise } from 'react-bootstrap-icons';
import AppBottomTooltip from '../components/AppBottomTooltip';
import AppTable from '../components/AppTable';
import UserContext from '../contexts/UserContext';
import { jsonParse } from '../helpers/helper';
import { getUsers, updateOpenToUser, resetAllOpen } from '../services/userService';

const Members = () => {
    const { user } = useContext(UserContext);
    const { role } = jsonParse(user);

    const [ users, setUsers ] = useState([]);
    const commonCols = [
        { label: 'Nom et prénom', key: 'name', onClick: (id) => console.log(id) },
        { label: 'Promotion', key: 'promotion' },
        { label: 'Moto', key: 'bike' },
    ]
    let additionalCols = [];

    if (role === 'ADMIN') {
        additionalCols = [
            { label: 'Points OPEN', key: 'open' },
            { label: 'Actions', key: 'actions' }
        ]
    }

    const cols = [...commonCols, ...additionalCols];

    const fetchUsers = useCallback(() => {
        getUsers().then(users => {
            console.log('fetched users')
            console.log(users)
            const usersWithName = users.map(user => {
                return {...user, name: `${user.lastname} ${user.firstname}`};
            })
            setUsers(usersWithName);
        })
    })

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddClick = useCallback((id, open) => {
        updateOpenToUser(id, open + 1).then(() => fetchUsers());
    }, [fetchUsers]);

    const handleMinusClick = useCallback((id, open) => {
        updateOpenToUser(id, open - 1).then(() => fetchUsers());
    }, [fetchUsers]);

    const handleResetClick = useCallback((id) => {
        updateOpenToUser(id, 0).then(() => fetchUsers());
    }, [fetchUsers]);

    const handleResetAllClick = useCallback(async () => {
        if (window.confirm('Es tu sûr de vouloir remettre à 0 les points OPEN de tous les membres?')) {
            resetAllOpen().then(() => {
                console.log('reseted all')
                fetchUsers()
            });
        }
    }, []);

    return (
        <div className="container">
            <div className="text-center mb-5">
                <h1>Liste des membres</h1>
            </div>
            { role === 'ADMIN' && (
                <div className="d-flex justify-content-between mb-5">
                    <Button onClick={() => {}} variant="primary"> <Plus size={24} />&nbsp;Ajouter un utilisateur</Button>
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
            />
        </div>
    )
}

export default Members;