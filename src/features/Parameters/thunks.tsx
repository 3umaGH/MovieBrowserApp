import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGenres } from "../../components/common/api/api";

export const fetchGenresThunk = createAsyncThunk(
  "parameters/fetchGenres",
  () => {
    return fetchGenres().then((response) => response.data.genres);
  }
);
