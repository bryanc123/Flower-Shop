import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        showRecommended: true
    },
    reducers: {
        setShowRecommended: (state, action) => {
            state.showRecommended = action.payload;
        }
    },
});

export const {
    setShowRecommended
} = settingsSlice.actions;

export default settingsSlice.reducer;
