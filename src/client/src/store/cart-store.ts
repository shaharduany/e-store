import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopItemI } from "../components/shop/shop-view";

export interface CartI {
    items: ShopItemI[];
}

const initialState: CartI = { items: [] };

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ShopItemI>){
            state.items.push(action.payload);
        },
        removeItem(state, action: PayloadAction<ShopItemI>){
            state.items.filter(value => value.id !== action.payload.id);
        },
        updateCart(state, action: PayloadAction<ShopItemI[]>){
            state.items = action.payload;
        }
    }
});

export const { addItem, removeItem, updateCart } = slice.actions;
export default slice.reducer;