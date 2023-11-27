import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    id: null,
    email: "",
  },
  reducers: {
    setAccount: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    clearAccount: (state) => {
      state.id = null;
      state.email = "";
    },
  },
});

export const { setAccount, clearAccount } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
