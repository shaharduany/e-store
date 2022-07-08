import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserI } from './user-store';

export interface RootState {
    user: UserI;
}

const store = configureStore({
    reducer: {
        user: userReducer
    },
})

export default store;