import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopItemI } from "../components/shop/shop-view";
import Cart, { CartItemsI } from "../lib/cart";
export interface CartI {
    items: Cart;
    length: number;
}

const initialState: CartI = { items: new Cart(), length: 0 };

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ShopItemI>){
            state.items.insertOne(action.payload);
            state.length++;
        },
        removeItem(state, action: PayloadAction<number | ShopItemI>){
            state.items.deleteOne(action.payload);
            state.length--;
        },
        updateCart(state, action: PayloadAction<CartItemsI>){
            state.items = new Cart(action.payload);
            state.length = state.items.getLength();
        }
    }
});

export const { addItem, removeItem, updateCart } = slice.actions;
export default slice.reducer;