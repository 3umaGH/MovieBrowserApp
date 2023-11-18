import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGenres } from "../../api/api";

export const fetchGenresThunk = createAsyncThunk("parameters/fetchGenres", () => {
  return fetchGenres().then((response) => response.data.genres)
});