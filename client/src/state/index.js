import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
    mode: JSON.parse(localStorage.getItem("mode")),
    products: [],
    makers: [],
  },
  reducers: {
    login(state, data) {
      state.isLoggedIn = true;
      const user = JSON.stringify(data.payload.user);
      const token = JSON.stringify(data.payload.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);
    },
    setMode(state) {
      state.mode =
        JSON.parse(localStorage.getItem("mode")) === "light" ? "dark" : "light";
      localStorage.setItem(
        JSON.parse(localStorage.getItem("mode")) === "light" ? "dark" : "light"
      );
    },
    updateUser(state, data) {
      state.isLoggedIn = true;
      const user = JSON.stringify(data.payload.user);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", user);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", false);
      localStorage.setItem("user", null);
      localStorage.setItem("token", null);
      localStorage.setItem("warehouseDetails", null);
    },
    fetchUser(state) {
      state.user = JSON.parse(localStorage.getItem("user"));
    },

    fetchToken(state) {
      state.token = JSON.parse(localStorage.getItem("token"));
    },
    fetchProducts(state, data) {
      state.products = data.payload;
    },
    fetchMakers(state, data) {
      state.makers = data.payload;
    },
    likeProduct(state, data) {},
    followMaker(state, data) {},
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
