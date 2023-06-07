import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    globalCartList: [],
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartList: (state, action) => {
            state.globalCartList.push(action.payload);
        },
        clearCartList: (state) => {
            state.globalCartList = [];
        },
        updateCartList: (state, action) => {
            state.globalCartList = action.payload
        },
    },
});

export const { setCartList, updateCartList, globalCartList } = CartSlice.actions;

export default CartSlice.reducer;
