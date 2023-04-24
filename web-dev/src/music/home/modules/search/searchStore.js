import { createSlice } from "@reduxjs/toolkit";

const SearchStore = createSlice({
  name: "searchStore",
  initialState: {
    searchStr: null,
  },
  reducers: {
    setSearchStrAction: (state, { payload }) => {
      state.searchStr = payload;
    },
  },
});

export const { setSearchStrAction } = SearchStore.actions;
export default SearchStore.reducer;
