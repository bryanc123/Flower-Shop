import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import settingsReducer from '../features/settings/settingsSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        settings: settingsReducer
    },
});
