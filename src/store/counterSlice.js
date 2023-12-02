import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //collection of functions to setState
    add1(state) {
      state.counter = state.counter + 1;
    },
    add(state, action) {
      state.counter += +action.payload;
    },
  },
});
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
