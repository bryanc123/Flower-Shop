import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: '',
        loggedIn: false,
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        login: (state, action) => {
            state.user = action.payload;
            state.loggedIn = true;
        },
        logout: (state) => {
            state.user = '';
            state.loggedIn = false;
        },
        setUsername: (state, action) => {
            state.user = action.payload;
        }
    },
});

export const {
    setLoading,
    login,
    logout,
    setUsername
} = authSlice.actions;

export const loginAsync = (username) => (dispatch) => {
    dispatch(setLoading(true));
    setTimeout(() => {
        dispatch(setLoading(false));
        dispatch(login(username));
    }, 1000);
}

export default authSlice.reducer;
