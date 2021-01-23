import React from "react";

function App(props) {
  return (
    <div className="App" style={{ height: "100%" }}>
      {props.children}
    </div>
  );
}

export default App;
