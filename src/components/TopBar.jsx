import React, { useState } from "react";
import { FaSistrix, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import logo from "../img/logo.png";

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  font-weight: bold;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
  z-index: 1;
`;
const HeaderInner = styled.div`
  width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px 0px;
`;
const LogoInput = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  color: #5e5ee8;
  margin-right: 30px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  width :250px;
  border: none;
  align-items : center;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0px 10px;
`;

const Input = styled.input`
width :100%;
  border: none;
  outline : none;
  border-radius: 20px;
  height: 30px;
  padding-left: 10px;
`;

const BtnContainer = styled.div`
  margin-left: 50%;
  display: flex;
  align-items : center;
  @media screen and (max-width: 1500px) {
    flex-direction: row;
    align-items: flex-start;
    margin-left: 30%;
    margin-right: auto;
    margin-top: 10px;
  }
`;
const TopButton = styled.button`
  font-size: 16px;
  width: 90px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  @media screen and (max-width: 1500px) {
    margin-top: 5px;
    width: 100%;
    max-width: 200px;
  }
  height: 30px;
`;

function TopBar({ onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    console.log("제출이 일어남", searchQuery);
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <>
      <Header>
        <HeaderInner>
        <LogoInput>
          <Logo
            onClick={() => {
              navigate(`/`);
            }}
          >
            <img src={logo} alt="" style={{ width: "150px" }} />
          </Logo>
          {/* <Form onSubmit={handleSearch}> 
            <Input
              type="text"
              placeholder="검색 가능합니다."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></Input>
            <FaSistrix size="20" color="gray"></FaSistrix>
          </Form> */}
        </LogoInput>
        <BtnContainer>
          <TopButton>
            <FaGlobe/> KR
          </TopButton>
          <SignIn />
          <SignUp />
        </BtnContainer>
        </HeaderInner>
      </Header>
    </>
  );
}

export default TopBar;
