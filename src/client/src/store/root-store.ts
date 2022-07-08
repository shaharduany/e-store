import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartI } from './cart-store';
import userReducer, { UserI } from './user-store';

export interface RootState {
    user: UserI;
    cart: CartI;
}

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    },
});

export default store;