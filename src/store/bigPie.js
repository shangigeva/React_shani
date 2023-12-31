import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counterSlice";
import authSlice from "./authSlice";
import darkThemeSlice from "./darkThemeSlice";

const store = configureStore({
  reducer: {
    counterSlice,
    auth: authSlice,
    darkThemeSlice,
  },
});

export default store;
