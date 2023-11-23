import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGenres } from "../../modules/common/api/api";

export const fetchGenresThunk = createAsyncThunk(
  "parameters/fetchGenres",
  () => {
    return fetchGenres().then((response) => response.data.genres);
  }
);
