import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
	key: 'root',
	version: 1,
	storage, //use local storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			//serializable values can use JSON.stringify/parse (obj, arr, str, bool, null, num)
			//non-serializable values like functions, Promises etc. --> can't be directly converted to JSON string
			serializableCheck: false,
		}),
});

//persistor used to manually persist, pause, resume and purge persisted states
export const persistor = persistStore(store);
