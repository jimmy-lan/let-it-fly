import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "./app/store";

function App() {
  const placeholder = useSelector(
    (state: RootState) => state.placeholder.value
  );

  return (
    <div className="App">
      <h1>App</h1>
      <p>Placeholder value: {placeholder}</p>
    </div>
  );
}

export default App;
