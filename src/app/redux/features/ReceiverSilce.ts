import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ReceiverState {
  id: string;
}

const initialState: ReceiverState = {
  id: "",
};

export const ReceiverSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    remove:(state)=>{
        state.id = ""
    }
  },
});

// Action creators are generated for each case reducer function
export const {  set , remove } = ReceiverSlice.actions;

export default ReceiverSlice.reducer;
