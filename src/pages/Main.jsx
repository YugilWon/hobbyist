import React from "react";
import TopBar from "../components/TopBar";
import Contents from "../components/Contents";

function App() {
  return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex" }}>
          <TopBar />
          <Contents />
        </div>
      </div>
    </>
  );
}

export default App;
