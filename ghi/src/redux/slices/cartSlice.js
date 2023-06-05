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
    },
});

export const { setCartList, globalCartList } = CartSlice.actions;

export default CartSlice.reducer;
