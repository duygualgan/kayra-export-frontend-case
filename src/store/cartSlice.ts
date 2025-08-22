import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const p = action.payload;
      const existing = state.items.find((i) => i.id === p.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQty(state, action: PayloadAction<number>) {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) it.quantity += 1;
    },
    decreaseQty(state, action: PayloadAction<number>) {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) {
        it.quantity -= 1;
        if (it.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    setQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const it = state.items.find((i) => i.id === action.payload.id);
      if (it) {
        it.quantity = Math.max(0, action.payload.quantity);
        if (it.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
