import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountSlice";
import { refreshKeyReducer } from "./refreshKeySlice";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        refreshKey: refreshKeyReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;