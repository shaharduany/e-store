import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

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
    image: string;
}

export const initialUserState: UserI = {
    isLogged: false,
    role: Role.guest,
    email: "none",
    username: "Guest",
    image: "none",
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        login(state, action: PayloadAction<UserI>){
            state.isLogged = action.payload.isLogged;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.image = action.payload.image!;
        },
        logout(state){
            state.isLogged = initialUserState.isLogged;
            state.email = initialUserState.email;
            state.username = initialUserState.username;
            state.role = initialUserState.role;
            state.image = initialUserState.image;
        },
        updateImage(state, action: PayloadAction<string>){
            state.image = action.payload;
        }
    }
});

export const { login, logout, updateImage } = userSlice.actions;
export default userSlice.reducer;