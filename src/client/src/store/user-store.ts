import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATES } from 'mongoose';
import { act } from 'react-dom/test-utils';

export enum Role {
    guest = "guest",
    costumer = "costumer", 
    admin = "admin"
};

export interface UserI {
    isLogged: boolean;
    role: Role;
    email: string;
    username: string;
}

const initialState: UserI = {
    isLogged: false,
    role: Role.guest,
    email: "none",
    username: "Guest",
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserI>){
            state.isLogged = action.payload.isLogged;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        logout(state){
            state.isLogged = initialState.isLogged;
            state.email = initialState.email;
            state.username = initialState.username;
            state.role = initialState.role;
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;