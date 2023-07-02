import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { subcategoryOptions } from "./MyPost";
import Weather from "./Weather";
import Post from "./Post";

const SidebarWrap = styled.div`
    position: sticky; left: 0; top: 100px;
`
const AllList = styled.button`
  width: 220px;
  padding: 10px;
  border-radius: 8px;
  background : #fff;
  display: flex;
  flex-direction: column;
  border: none;
`;
const CategoryFont = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;
const List = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  font-size: 15px;
  width: 180px;
  margin-bottom: 6px;
  margin-left : 10px;
  cursor: pointer;

`;
const SmallLists = styled.div`
  display: ${(props) => (props.isopen === "true" ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
`;

const SmallList = styled.button`
  font-size: 13px;
  padding-top: 8px;
  text-align: left;
  margin-left: 14px;
  border: none;
  background : #fff;
  cursor: pointer;
`;

function SideBar2({ setSelectedSubcategory }) {
  const initialallLists = [
    {
      id: 1,
      list: "💰 경제",
      sublist: subcategoryOptions["경제"].map((option) => option.value),
      // sublist: ["📈 주식", "💸 가상화폐"],
      isOpen: false,
    },
    {
      id: 2,
      list: "🐶 애완동.식물",
      sublist: subcategoryOptions["애완동식물"].map((option) => option.value),
      // sublist: ["🍯 꿀팁", "💳 쇼핑"],
      isOpen: false,
    },
    {
      id: 3,
      list: "🚙 여행",
      sublist: subcategoryOptions["여행"].map((option) => option.value),
      // sublist: ["🚅 국내", "🛩️ 해외"],
      isOpen: false,
    },
    {
      id: 4,
      list: "🎧 음악",
      sublist: subcategoryOptions["음악"].map((option) => option.value),
      // sublist: ["🎤 추천", "🎹 정보"],
      isOpen: false,
    },
    {
      id: 5,
      list: "🍀 기타",
      sublist: subcategoryOptions["기타"].map((option) => option.value),
      // sublist: ["🎤 추천", "🎹 정보"],
      isOpen: false,
    },
  ];

  const [allLists, setAllLists] = useState(initialallLists);

  const handleList = (id) => {
    const updatedLists = allLists.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isopen: !item.isopen,
        };
      }

      return {
        ...item,
        isopen: false,
      };
    });
    setAllLists(updatedLists);
  };

  const handleSubcategory = (subcategory) => {
    const cleanSubcategory = subcategory.substring(2).trim();
    setSelectedSubcategory(cleanSubcategory);
    console.log(cleanSubcategory);
  };

  return (
    <>
      <Post />
      <AllList>
        <CategoryFont>♞ Category</CategoryFont>
        {allLists.map((allList) => {
          return (
            <List
              className="큰목차"
              key={allList.id}
              onClick={() => handleList(allList.id)}
            >
              <div>{allList.list}</div>
              <SmallLists className="작은목차" isOpen={allList.isOpen}>
                {allLists.map((subList, i) => {
                  if (allList.sublist[i]) {
                    return (
                      allList.sublist.length > 0 && (
                        <SmallList key={i}>{allList.sublist[i]}</SmallList>
                      )
                    );
                  }
                  return null;
                })}
              </SmallLists>
            </List>
          );
        })}
      </AllList>
      <Weather />
      <button
        style={{
          width: "50px",
          height: "50px",
          position: "fixed",
          bottom: "50px",
          right: "80px",
          borderRadius: "30px",
          border: "none",
          cursor: "pointer",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        Top
      </button>
    </>

  );
}
export default SideBar2;
