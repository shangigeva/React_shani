import { createSlice } from "@reduxjs/toolkit";

const initialTheme = "light";

const initialState = {
  darkTheme: initialTheme === "dark",
};

const darkTheme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state) {
      console.log(state);
      state.darkTheme = !state.darkTheme;

      localStorage.setItem(`theme`, state.darkTheme ? "dark" : "light");
    },
  },
});

//export the set functions for the components to make use of the actions
export const darkThemeActions = darkTheme.actions;

//in reducer we have all the necessary data to connect with the big pie
export default darkTheme.reducer;
