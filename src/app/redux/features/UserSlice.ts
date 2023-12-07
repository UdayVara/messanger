import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
}

const initialState: UserState = {
  id: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    logout: (state) => {
      state.id = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = UserSlice.actions;

export default UserSlice.reducer;
