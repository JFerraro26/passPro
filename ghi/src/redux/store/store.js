import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { accountsApi } from "../apis/accountsApi"
import rootReducer from "../reducers/rootReducer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: { rootReducer, [accountsApi.reducerPath]: accountsApi.reducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            accountsApi.middleware
        ),
});

setupListeners(store.dispatch);

export default store;
