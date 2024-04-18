import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import themeConfigStore from './themeConfigStore';
import authStore from './authStore';


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['themeConfigStore', 'authStore']
}

const allReducers = combineReducers({
    themeConfigStore: themeConfigStore,
    authStore: authStore,
})

const persistedReducer = persistReducer(persistConfig, allReducers)
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type IRootState = ReturnType<typeof store.getState>;
export const persist = persistStore(store);
export default store;