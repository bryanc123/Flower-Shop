import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import cartReducer from "./features/cart/cartSlice";
import authReducer from "./features/auth/authSlice";
import settingsReducer from "./features/settings/settingsSlice";

const render = (
    ui,
    {
        preloadedState,
        store = configureStore({
            reducer: {
                cart: cartReducer,
                auth: authReducer,
                settings: settingsReducer
            },
            preloadedState
        }),
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({children}) => (
        <Provider store={store}>{children}</Provider>
    )

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { render };