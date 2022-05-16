import { useSelector, useDispatch } from 'react-redux';
import { setShowRecommended } from '../features/settings/settingsSlice';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Settings = () => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    let navigate = useNavigate();

    useEffect(() => {
        console.log(loggedIn);
        if(!loggedIn) {
            navigate("/");
        }
    }, [loggedIn]);

    const showRecommended = useSelector((state) => state.settings.showRecommended);
    const dispatch = useDispatch();

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
            <div className="settings__container">
                <span>Show Recommended Products: </span>
                <input type="checkbox" name="showRecommendedProducts" checked={showRecommended} onChange={(e) => changeShowRecommended(e)}/>
            </div>
        </section>
    );
}

export default Settings;