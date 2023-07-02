import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { subcategoryOptions } from "./MyPost";
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
const List = styled.button`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  font-size: 15px;
  width: 180px;
  margin-bottom: 6px;
  margin-left : 10px;
`;
const SmallLists = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
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
`;

function SideBar2() {
  console.log(subcategoryOptions);
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

  // const [isOpen, setIsOpen] = useState(false);
  // const handleList = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleList = (id) => {
    const updatedLists = allLists.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isOpen: !item.isOpen,
        };
      }
      return item;
    });
    setAllLists(updatedLists);
  };

  const [allLists, setAllLists] = useState(initialallLists);

  return (
    <SidebarWrap>
      <Post/>
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
    </SidebarWrap>
  );
}
export default SideBar2;
