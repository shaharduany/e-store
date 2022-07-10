import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopItemI } from "../components/shop/shop-view";

export interface CartI {
    items: CartItemI;
}

interface CartItemI {
    [key: number]: number;
}

const initialState: CartI = { items: {} };

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ShopItemI>){
            const id = action.payload.id;
            if(!state.items[id]){
                state.items[id] = 0;
            }
            state.items[id] += 1;
        },
        removeItem(state, action: PayloadAction<number>){
            const id = action.payload;
            if(state.items[id] > 1){
                state.items[id] -= 1;
            } else {
                delete state.items[id];
            }
        },
        updateCart(state, action: PayloadAction<CartI>){
            state.items = action.payload.items;
        }
    }
});

export const { addItem, removeItem, updateCart } = slice.actions;
export default slice.reducer;