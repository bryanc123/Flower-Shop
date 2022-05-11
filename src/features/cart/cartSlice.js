import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        updated: false
    },
    reducers: {
        addToCart: (state, action) => {
            console.log(action.payload.price);
            state.items.push(action.payload);
        },
        updateProductQuantity: (state, action) => {
            state.items = state.items.map((item) => {
                if(item.name === action.payload.name) {
                    return {
                        ...item,
                        quantity: action.payload.quantity,
                        price: action.payload.price
                    }
                }
                else {
                    return item;
                }
            });
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload)
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCartUpdated: (state, action) => {
            state.updated = action.payload;
        }
    },
});

export const {
    addToCart,
    updateProductQuantity,
    removeFromCart,
    clearCart,
    setCartUpdated
} = cartSlice.actions;

export default cartSlice.reducer;
