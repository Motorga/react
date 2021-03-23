import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ArrowCounterclockwise } from 'react-bootstrap-icons';
import AppBottomTooltip from '../components/AppBottomTooltip';
import AppTable from '../components/AppTable/index';
import InviteUser from '../components/InviteUser';
import LoadingContext from '../contexts/LoadingContext';
import UserContext from '../contexts/UserContext';
import { jsonParse } from '../helpers/helper';
import { toastNotification } from '../helpers/Toastify';
import { getUsers, updateOpenToUser, resetAllOpen, inviteMember, deleteMember } from '../services/userService';

const Members = () => {
    const { setLoading } = useContext(LoadingContext)
    const { user } = useContext(UserContext);
    const { role } = jsonParse(user);

    const [ loadingInvitation, setLoadingInvitation ] = useState(false);
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

    const fetchUsers = () => {
        let status = ['ENABLED'];
        
        if (role === 'ADMIN') {
            status = ['ENABLED', 'PENDING', 'DISABLED']
        }
        
        setLoading(true);
        getUsers(status).then(users => {
            setUsers(withNameUsers(users));
            setLoading(false)
        })
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInviteMember = async (email, role) => {
        setLoading(true);
        setLoadingInvitation(true);
        const user = await inviteMember(email, role)
        setLoading(false);
        setLoadingInvitation(false);
        if (user) {
            toastNotification('success', 'Le membre a bien été invité');
            fetchUsers();
        }
        
    };

    const resetOpenMembers = async () => {
        if (window.confirm('Es tu sûr de vouloir remettre à 0 les points OPEN de tous les membres?')) {
            setLoading(true);
            await resetAllOpen();
            fetchUsers();
        }
    };

    const handleAdd = async (id, open) => {
        setLoading(true);
        await updateOpenToUser(id, open + 1);
        fetchUsers();
    };

    const handleMinus = async (id, open) => {
        setLoading(true);
        await updateOpenToUser(id, open - 1);
        fetchUsers();
    };

    const resetOpenMember = async id => {
        setLoading(true);
        await updateOpenToUser(id, 0);
        fetchUsers();
    };

    const handleDeleteMember = async id => {
        if (window.confirm('Es tu sûr de vouloir supprimer ce membre?')) {
            setLoading(true);
            await deleteMember(id);
            toastNotification('success', 'Le membre a bien été supprimé');
            fetchUsers();
        }
    };

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
                        <InviteUser handleInviteMember={handleInviteMember} loadingInvitation={loadingInvitation} />
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