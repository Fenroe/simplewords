import { createSlice } from "@reduxjs/toolkit";

const refreshKeySlice = createSlice({
  name: "refreshKey",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, clearToken } = refreshKeySlice.actions;

export const refreshKeyReducer = refreshKeySlice.reducer;
