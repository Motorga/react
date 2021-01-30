import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { jsonParse } from '../helpers/helper';

const Profile = () => {
    const { user } = useContext(UserContext);
    const { email, lastname, firstname, promotion, bike, open } = jsonParse(user);

    return (
        <div className="container">
            <div className="text-center mb-3">
                <h1>Votre profil</h1>
            </div>
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
        </div>
    )
}

export default Profile;