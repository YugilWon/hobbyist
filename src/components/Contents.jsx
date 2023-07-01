import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import {
  Firestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import MainBtnFunc from "./MainBtnFunc";
import TopBar from "./TopBar";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import google from "../img/google.png";


const Main = styled.main`
  padding: 20px;
  background: #eee;
  width: 600px;
  margin-top: 150px;
  margin-left: 100px;
`;
const MainInner = styled.div`
  margin-bottom: 20px;
`;
const MainUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0px;
  cursor: pointer;
`;
const UserImg = styled.img`
  width: 48px;
`;
const User = styled.h3`
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -1px;
`;
const ContentsBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
`;
const FunctionUl = styled.ul`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin: 20px 15px;
  list-style: none;
`;
const IconSpan = styled.span`
  margin-right: 6px;
  font-size: 17px;
  cursor: pointer;
`;

function Contents() {
  const [likeCount] = useState(false);
  const [, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");

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

  // url 복사
  const copyUrlRef = useRef(null);

  const copyUrl = (e) => {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사 기능이 지원되지 않는 브라우저입니다.");
    }

    const currentUrl = window.location.href; // 현재 페이지 URL 가져오기
    const additionalPath = `detail/${e.target.value}`; // 추가할 경로

    const newUrl = currentUrl + additionalPath; // 현재 URL에 추가 경로를 붙임
    copyUrlRef.current.value = newUrl; // 복사할 URL을 참조하는 input 요소에 새로운 URL 설정

    copyUrlRef.current.select();
    document.execCommand("copy");

    alert("링크가 복사되었습니다.");
  };
  const navigate = useNavigate();

  const filterPosts = () => {
    if (searchQuery) {
      return posts.filter((post) => post.title.includes(searchQuery));
    } else {
      return posts;
    }
  };

  return (
    <>
      <TopBar onSearch={handleSearch} />
      <div style={{ width: "650px" }}>
        {filterPosts().map((post) => {
          return (
            <Main key={post.CID}>
              <MainInner>
                <MainUser
                  onClick={() => {
                    navigate(`/mypage/${post.uid}`);
                  }}
                >
                  <UserImg src={post.img ? post.img : google} alt="" />
                  <User>{post.nickname}</User>
                </MainUser>
                <ContentsBox
                  onClick={() => {
                    navigate(`/detail/${post.id}`);
                  }}
                >
                  <h2>{post.title}</h2>
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
    </>
  );
}
export default Contents;
