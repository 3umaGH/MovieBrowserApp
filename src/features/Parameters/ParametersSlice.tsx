import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchGenresThunk } from "./thunks";

type Genre = {
  id: number;
  name: string;
};

type ParametersStateProps = {
  genres: Genre[];

  loading: boolean;
  error: string;
};

const initialState: ParametersStateProps = {
  genres: [],
  loading: false,
  error: "",
};

export const ParametersSlice = createSlice({
  name: "parameters",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchGenresThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchGenresThunk.fulfilled,
      (state, action: PayloadAction<Genre[]>) => {
        state.genres = action.payload;
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(fetchGenresThunk.rejected, (state, action) => {
      //state.genres = OFFLINE_DATA;
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

/*export const {  } = ShipmentSlice.actions;*/
export default ParametersSlice.reducer;
