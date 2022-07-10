import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopItemI } from "../components/shop/shop-view";
import Cart from "../lib/cart";
export interface CartI {
    items: Cart;
}

const initialState: CartI = { items: new Cart() };

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ShopItemI>){
            state.items.insertOne(action.payload);
        },
        removeItem(state, action: PayloadAction<number | ShopItemI>){
            state.items.deleteOne(action.payload);
        },
        updateCart(state, action: PayloadAction<CartI>){
            state.items = action.payload.items;
        }
    }
});

export const { addItem, removeItem, updateCart } = slice.actions;
export default slice.reducer;