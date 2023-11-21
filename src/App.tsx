import { useEffect } from "react";
import { MainPage } from "./pages/MainPage";
import { fetchGenresThunk } from "./features/Parameters/thunks";

import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/Store";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGenresThunk());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
