import { createSlice } from "@reduxjs/toolkit";

interface INITIALSTATE {
  recentData: [];
}

const initialState: INITIALSTATE = {
  recentData: [],
};

const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    addToRecentHistory: (state: any, action: any) => {
      const checkDataLength = state.recentData?.length;
      const data = action.payload;
      const recentId = state.recentData?.find(
        (check: any) => check.id == data.id
      );

      if (checkDataLength > 10) {
        state.recentData?.pop();
      } else {
        if (!recentId) state.recentData.push(data);
      }
    },
  },
});

export const { addToRecentHistory } = recentSlice.actions;
export default recentSlice.reducer;
