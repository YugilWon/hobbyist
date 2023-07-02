import React from "react";
import TopBar from "../components/TopBar";
import SideBar2 from "../components/SideBar2";
import Contents from "../components/Contents";
import Post from "../components/Post";

function App() {
  return (
    <>
          <div>
    <TopBar />

        <div style={{
          display :"flex",
          justifyContent :"center",
          gap : "60px",
          marginTop : "50px"
        }}>
          <div style={{
            position : "relative",
            left : "0px",
            top : "0px"
          }}>
          <SideBar2 /> 
          </div>
          <Contents /> 
          {/* <Post /> */}
        </div>
      </div>
    </>
  );
}

export default App;
