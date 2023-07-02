import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { categoryOptions, subcategoryOptions } from "./MyPost";
import { useDispatch } from "react-redux";
import { addCategory } from "../modules/subcategoryReducer";

const AllList = styled.button`
  margin-top: 200px;
  width: 220px;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  `;

const CategoryFont = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;
const List = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  font-size: 18px;
  padding: 15px;
  width: 180px;
  cursor: pointer;
`;
const SmallLists = styled.div`
  display: ${(props) => (props.isopen === "true" ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
`;
const SmallList = styled.div`
  font-size: 15px;
  padding-top: 10px;
  text-align: center;
  border: none;
  cursor: pointer;
`;
const SmallList = styled.button`
  font-size: 15px;
  padding-top: 10px;
  text-align: left;
  border: none;
`;


const initialallLists = [
  {
    id: 1,
    list: "💰 경제",
    sublist: subcategoryOptions["경제"].map((option) => option.value),
    isOpen: false,
  },
  {
    id: 2,
    list: "🐶 애완동.식물",
    sublist: subcategoryOptions["애완동식물"].map((option) => option.value),
    isOpen: false,
  },
  {
    id: 3,
    list: "🚙 여행",
    sublist: subcategoryOptions["여행"].map((option) => option.value),
    isOpen: false,
  },
  {
    id: 4,
    list: "🎧 음악",
    sublist: subcategoryOptions["음악"].map((option) => option.value),
    isOpen: false,
  },
  {
    id: 5,
    list: "🍀 기타",
    sublist: subcategoryOptions["기타"].map((option) => option.value),

    isOpen: false,
  },
];

function SideBar() {
  const dispatch = useDispatch();

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
    console.log(cleanSubcategory);
    dispatch(addCategory(cleanSubcategory));
  };

  return (
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
            <SmallLists
              className="작은목차"
              isopen={allList.isopen ? "true" : "false"}
            >
              {allList.sublist.map((subListItem, i) => {
                return (
                  <SmallList
                    key={i}
                    onClick={() => handleSubcategory(subListItem)}
                  >
                    {subListItem}
                  </SmallList>
                );
              })}
            </SmallLists>
          </List>
        );
      })}
    </AllList>
  );
}

export default SideBar;

