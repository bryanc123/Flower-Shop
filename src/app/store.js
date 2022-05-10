import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import settingsReducer from '../features/settings/settingsSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        settings: settingsReducer
    },
});
