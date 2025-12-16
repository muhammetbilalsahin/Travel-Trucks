import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./campersThunks";

const initialState = {
  items: [],
  total: 0,
  page: 1,
  limit: 4,
  isLoading: false,
  error: null,
  hasMore: true,

  // Detay sayfası için:
  camperDetails: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetCamperDetails(state) {
      state.camperDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        const { items, total } = action.payload;
        const append = action.meta.arg.append;

        if (append) {
          state.items = [...state.items, ...items];
        } else {
          state.items = items;
        }

        state.total = total;
        state.hasMore = state.items.length < total;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // DETAILS
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.camperDetails = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.camperDetails = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCampers, setPage, resetCamperDetails } =
  campersSlice.actions;
export default campersSlice.reducer;
