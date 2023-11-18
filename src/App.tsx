import { useEffect } from "react";
import { Main } from "./pages/Main";
import { fetchGenresThunk } from "./features/Parameters/thunks";

import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/Store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGenresThunk());
  })

  return <Main />;
}

export default App;
