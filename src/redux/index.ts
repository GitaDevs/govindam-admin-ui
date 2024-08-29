import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  // You can add specific reducers to whitelist or blacklist here
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// creating store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch