import { useEffect } from "react";
import { MainPage } from "./pages/MainPage";
import { fetchGenresThunk } from "./features/Parameters/thunks";

import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/Store";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoviePage } from "./pages/MoviePage";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGenresThunk());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
