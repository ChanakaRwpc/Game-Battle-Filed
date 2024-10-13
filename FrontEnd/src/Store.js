import { combineReducers, configureStore } from '@reduxjs/toolkit';
import GameSlices from './GameSlices';

const rootReducer = combineReducers({
    GameSlices: GameSlices,
});

const store = configureStore({
    reducer: rootReducer,
});


export default store;
