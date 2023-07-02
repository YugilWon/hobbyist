import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import MainBtnFunc from "./MainBtnFunc";
import google from "../img/google.png";
import { FaSistrix, FaGlobe } from "react-icons/fa";
import SideBar2 from "./SideBar2";


const AllContents = styled.div`
   
`

const Form = styled.form`
  display: flex;
  border: none;
  width: 98%;
  border-radius: 25px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  padding: 3px 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  margin: 0px auto 40px auto;
`;

const Input = styled.input`
  border: none;
  border-radius: 20px;
  width: 100%;
  height: 30px;
  outline: none;
  padding-left: 10px;
`;

const Main = styled.main`

  padding: 20px;
  background: #eee;
  width: 600px;
  margin-top: 150px;
  margin-left: 100px;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

`;
const MainInner = styled.div`
  margin-bottom: 20px;
  border-radius: 14px;
  background: #fff;
`;
const MainUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  cursor: pointer;
`;
const UserImg = styled.img`
  width: 38px;
  border-radius: 25px;
`;
const User = styled.h3`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;
`;
const ContentsBox = styled.div`
  padding : 16px 20px 26px 20px;
  cursor: pointer;
`;
const PostTitle = styled.h2`
  font-size : 22px;
  font-weight : 600;
  margin-bottom : 26px;
`

function Contents() {
  const [, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);

  //db에서 유저 데이터 불러오는 함수
  const fetchUsers = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(fetchedUsers);
      console.log(fetchedUsers);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DB에서 저장된 값 불러오는 부분과 재렌더링
  const fetchComments = async () => {
    try {
      const q = query(collection(db, "Comments"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  // DB에서 저장된 포스트를 불러오는 함수
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    console.log("피드데이터 호출");
    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const navigate = useNavigate();

  // 검색어와 카테고리에 따라 필터링하는 함수
  const filterPosts = () => {
    let filteredPosts = posts;

    if (searchQuery) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.includes(searchQuery)
      );
    }

    if (subcategory) {
      console.log(selectedSubcategory);
      filteredPosts = filteredPosts.filter(
        (post) => post.subcategory === subcategory
      );
    }

    return filteredPosts;
  };

  const handleSearch1 = (e) => {
    console.log("제출이 일어남", searchQuery);
    e.preventDefault();
    // onSearch(searchQuery);
  };

  return (
    <>
    {/* <TopBar onSearch={handleSearch} /> */}
    <AllContents>

    <Form onSubmit={handleSearch1}> 
            <Input
              type="text"
              placeholder="검색 가능합니다."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></Input>
            <FaSistrix size="20" color="gray"></FaSistrix>
          </Form>
      <TopBar onSearch={handleSearch} />
      <div style={{ width: "650px" }}>
        {console.log(subcategory)}
        {filterPosts().map((post) => {
          return (
            <Main key={post.CID}>
              <MainUser
                  onClick={() => {
                    navigate(`/mypage/${post.uid}`);
                  }}
                >
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "70%",
                      overflow: "hidden",
                    }}
                  >
                    <UserImg src={post.img ? post.img : google} alt="" />
                  </div>
                  <User>{post.nickname}</User>
                </MainUser>
              <MainInner>
                <ContentsBox
                  onClick={() => {
                    navigate(`/detail/${post.id}`);
                  }}
                >
                  <PostTitle>{post.title}</PostTitle>
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={post.downloadURL}
                    alt=""
                  />
                  <span>{post.body}</span>
                </ContentsBox>

                <MainBtnFunc id={post.id} />
              </MainInner>
            </Main>
          );
        })}
      </div>
    </AllContents>
    </>
  );
}
export default Contents;
