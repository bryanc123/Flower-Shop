import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginAsync, logout } from '../features/auth/authSlice';

import { FaUser } from 'react-icons/fa';

const Subheader = () => {
    const loading = useSelector((state) => state.auth.loading);
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const username = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const showProfileMenu = () => {
        let profileMenuVisibility = document.querySelector(".subheader__profile-menu").style.display;
        if(!profileMenuVisibility || profileMenuVisibility !== "flex")
        {
            document.querySelector(".subheader__profile-menu").style.display = "flex";
        } else {
            document.querySelector(".subheader__profile-menu").style.display = "none";
        }
    }

    const handleLogout = () => {
        showProfileMenu();
        dispatch(logout());
    }

    return (
        <section className="subheader">
            <div className="subheader__container">
                <div className="subheader__instruction">
                    {
                        !loggedIn && <span>Log in to gain access to the settings page</span>
                    }
                </div>
                <div className="subheader__message-container">
                    {
                        loading ?
                            <span>Logging In...</span> :
                            loggedIn ?
                                <>
                                    <span className="subheader__username">{username}</span>
                                    <span className="subheader__profile-icon" onClick={() => showProfileMenu()}><FaUser /></span>
                                </>
                                :
                                <button className="login__button" onClick={() => dispatch(loginAsync("Guest"))}>Log In as Guest</button>
                    }
                    <div className="subheader__profile-menu">
                        <Link to="/settings" className="settings__button" onClick={() => showProfileMenu()}>Settings</Link>
                        <button className="logout__button" onClick={() => handleLogout()}>Logout</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Subheader;