import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from '../features/auth/authSlice';
import { setShowRecommended } from '../features/settings/settingsSlice';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Settings = () => {
    const [username, changeUsername] = useState(useSelector((state) => state.auth.user));
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    let navigate = useNavigate();

    useEffect(() => {
        if(!loggedIn) {
            navigate("/");
        }
    }, [loggedIn]);

    const showRecommended = useSelector((state) => state.settings.showRecommended);
    const dispatch = useDispatch();

    const saveUsername = () => {
        dispatch(setUsername(username));
    }

    const changeShowRecommended = (e) => {
        if(e.target.checked === true) {
            dispatch(setShowRecommended(true));
        }
        else {
            dispatch(setShowRecommended(false));
        }
    }

    return (
        <section className="settings">
            <h2>Settings</h2>
            <div className="user-settings__container">
                <span>Change Username:</span>
                <input type="text" className="settings__username" name="username" value={username} onChange={e => changeUsername(e.target.value)}/>
                <div><button className="save-username-button" onClick={saveUsername}>Save</button></div>
            </div>
            <div className="settings__container">
                <span>Show Recommended Products: </span>
                <input type="checkbox" name="showRecommendedProducts" checked={showRecommended} onChange={(e) => changeShowRecommended(e)}/>
            </div>
        </section>
    );
}

export default Settings;