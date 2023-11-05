import {
    configureStore
} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage"
import {
    persistReducer,
    persistStore
} from "redux-persist";
import thunk from "redux-thunk";

// Configuration for Redux-Persist
const persistConfig = {
    key: "root", // Key for the root state
    storage, // Storage method (in this case, local storage)
};

// Create a persisted reducer that will store the state with Redux-Persist
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store with the persisted reducer and middleware
export const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
    middleware: [thunk], // Apply the Redux-Thunk middleware for async actions
});

// Create a persistor to handle storing the Redux state using Redux-Persist
export const persistor = persistStore(store);
