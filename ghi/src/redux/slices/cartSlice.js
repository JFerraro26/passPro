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
    updateCartQuantity: (state, action) => {
      const { eventId, quantity } = action.payload;
      const eventIndex = state.globalCartList.findIndex(
        (event) => event.id === eventId
      );
      if (eventIndex >= 0) {
        state.globalCartList[eventIndex].quantity = quantity;
      }
    },
    deleteCartItem: (state, action) => {
      const { eventId } = action.payload;
      const eventIndex = state.globalCartList.findIndex(
        (event) => event.id === eventId
      );
      if (eventIndex >= 0) {
        state.globalCartList.splice(eventIndex, 1);
      }
    },
  },
});

export const {
  setCartList,
  updateCartQuantity,
  deleteCartItem,
  clearCartList,
} = CartSlice.actions;

export default CartSlice.reducer;
