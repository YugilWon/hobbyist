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

function Contents() {
  const [, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [, setUsers] = useState();
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
    console.log(posts);
  };
  // 포스트 저장 부분 불러옴
  useEffect(() => {
    fetchPosts();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div style={{ width: "650px" }}>
        {posts.map((post) => {
          return (
            <Main key={post.CID}>
              <MainInner>
                <MainUser
                  onClick={() => {
                    navigate(`/mypage/${post.uid}`);
                  }}
                >
                  <UserImg src="images/user_img.png" alt="" />
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
