import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const LOCAL_KEY = "myapp_cart_v1";

function loadState() {
  try {
    if (typeof window === "undefined") return undefined;
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return undefined;
    return { cart: JSON.parse(raw) };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadState(),
});


store.subscribe(() => {
  try {
    if (typeof window === "undefined") return;
    const state = store.getState();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state.cart));
  } catch {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
