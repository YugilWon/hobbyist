import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Contents from "../components/Contents";
import Post from "../components/Post";

function App() {
  const [showPost, setShowPost] = useState(false);

  const togglePost = () => {
    setShowPost(!showPost);
    console.log(showPost);
  };

  useEffect(() => {
    <Contents />;
  }, [showPost]);

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
          <SideBar />
          <Contents />
          <Post togglePost={togglePost} />
        </div>
      </div>
    </>
  );
}

export default App;
