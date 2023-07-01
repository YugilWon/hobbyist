import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopBar from "./TopBar";
import {
  faBookmark,
  faCommentDots,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import google from "../img/google.png";

const AllContents = styled.div`
  margin-left: 200px;
`;

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

// const CommentForm = styled.form`
//   position: relative;
//   right: 0;
//   top: 0;
// `;
// const CommentInput = styled.input`
//   width: 100%;
//   padding: 9px 8px;
//   border-radius: 5px;
//   border: none;
//   outline: none;
//   box-sizing: border-box;
//   background: #eee;
// `;
// const CommentButton = styled.button`
//   position: absolute;
//   right: 0;
//   top: 0;
//   padding: 8px 14px;
//   border: none;
//   border-radius: 0px 5px 5px 0px;
//   background: #222;
//   color: #fff;
// `;

function Contents() {
  const [comment, setComment] = useState();
  const [user, setUser] = useState({ nickname: "익명", email: "" });
  const [likeCount, setLikeCount] = useState(false);
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 로그아웃 시 호출되는 함수
  const handleLogout = () => {
    setUser(null);
  };

  // DB에서 저장된 값 불러오는 부분과 재렌더링
  const fetchComments = async () => {


  

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
    fetchPosts();
  }, []);


  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  //입력시 DB에 저장하는 함수
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("로그인 한 사용자만 댓글을 남길 수 있습니다!");
      return;
    }

    const { nickname, email } = user;

    const newComment = {
      CID: uuid(),
      comment: comment,
      createdAt: new Date(),
      nickname: nickname,
      email: email,
    };

    try {
      const docRef = await addDoc(collection(db, "Comments"), newComment);
      console.log("Comment added with ID: ", docRef.id);
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  //DB에서 해당하는 CID값을 가진 댓글을 수정하는 함수
  const handleCommentEdit = async (CID) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Comments"), where("CID", "==", CID))
      );

      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          comment: editedComment,
        });
      });

      setEditCommentId("");
      setEditedComment("");
      fetchComments();
    } catch (error) {
      console.error("댓글 수정 오류:", error);
    }
  };

  //DB에서 해당하는 CID값을 가진 댓글을 삭제하는 함수
  const handleCommentDelete = async (CID) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Comments"), where("CID", "==", CID))
      );
      const deletecomment = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

      await Promise.all(deletecomment);
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 오류:", error);

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
    <AllContents>
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

                  >
                    <span style={{ marginLeft: "8px" }}>{item.nickname} </span>
                    <span />
                    <span />
                    {item.comment}

                    <button onClick={() => setEditCommentId(item.CID)}>
                      수정
                    </button>
                    <button
                      onClick={() => {
                        handleCommentDelete(item.CID);
                      }}
                    >
                      삭제
                    </button>
                  </p>
                )}
              </div>
            );
          })}
                    src={post.downloadURL}
                    alt=""
                  />
                  <span>{post.body}</span>
                </ContentsBox>
                <FunctionUl>
                  <li>
                    <IconSpan>
                      {/* <FontAwesomeIcon icon={faHeart} onClick={handleLike} /> */}
                    </IconSpan>
                    {likeCount}
                  </li>
                  <li>
                    <IconSpan>
                      <FontAwesomeIcon icon={faCommentDots} />
                    </IconSpan>
                    댓글작성
                  </li>
                  <li>
                    <IconSpan>
                      <FontAwesomeIcon icon={faBookmark} />
                    </IconSpan>
                    북마크
                  </li>
                  <li>
                    <IconSpan onClick={copyUrl} value={post.id}>
                      <FontAwesomeIcon icon={faShareFromSquare} />
                    </IconSpan>
                    공유하기
                  </li>
                </FunctionUl>
              </MainInner>
            </Main>
          );
        })}
      </div>
    </AllContents>
  );
}
export default Contents;
