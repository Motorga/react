import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { jsonParse } from '../../helpers/helper';
import ChangePasswordForm from './ChangePasswordForm';
import EditProfileForm from './EditProfileForm';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [ changePassword, setChangePassword ] = useState(false);
    const [ editProfile, setEditProfile ] = useState(false);

    const { email, lastname, firstname, promotion, bike, open } = jsonParse(user);

    return (
        <div className="container">
            <div className="text-center mb-5">
                <h1>Votre profil</h1>
            </div>
            {editProfile ? (
                <EditProfileForm user={jsonParse(user)} setEditProfile={setEditProfile} />
            ) : (
                <div className="row">
                    <div className="col-4 offset-2">
                        <p><b>Email:</b> {email}</p>
                        <p><b>Nom:</b> {lastname}</p>
                        <p><b>Prénom:</b> {firstname}</p>
                    </div>
                    <div className="col-4 offset-2">
                        <p><b>Promotion:</b> {promotion}</p>
                        <p><b>Moto:</b> {bike}</p>
                        <p><b>OPEN:</b> {open}</p>
                    </div>
                </div>
            )}
            <div className="text-center">
                <Button onClick={() => setChangePassword(!changePassword)} variant="warning">
                    {changePassword ? "Annuler" : "Changer le mot de passe"}
                </Button>
                <Button onClick={() => setEditProfile(!editProfile)} className="ml-2">
                    {editProfile ? "Annuler" : "Changer mes informations"}
                </Button>
            </div>
            {changePassword && (
                <ChangePasswordForm />
            )}
        </div>
    )
}

export default Profile;