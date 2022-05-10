import { useSelector, useDispatch } from 'react-redux';
import { setShowRecommended } from '../features/settings/settingsSlice';

const Settings = () => {
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