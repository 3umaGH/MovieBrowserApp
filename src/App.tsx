import { useEffect } from "react";
import { Main } from "./pages/Main";
import { fetchGenresThunk } from "./features/Parameters/thunks";

import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/Store";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGenresThunk());
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
