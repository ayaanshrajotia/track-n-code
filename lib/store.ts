import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import inventoryReducer from "./features/inventory/inventorySlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            // Add reducers here
            user: userReducer,
            inventory: inventoryReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
