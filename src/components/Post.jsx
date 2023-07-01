import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import FileUpload from "./FileUpload";
import { db } from "../service/firebase";
import uuid from "react-uuid";
import { getAuth } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../service/firebase";

const BcDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const TitleInput = styled.input`
  width: 400px;
  height: 30px;
`;

const BodyInput = styled.input`
  width: 400px;
  height: 200px;
`;

const StDiv = styled.div`
  width: 650px;
  height: 500px;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
`;

const Stbtn = styled.button`
  position: absolute;
  background-color: transparent;
  border-style: none;
  right: 10px;
  top: 10px;
  font-size: 17px;
  cursor: pointer;
`;

const generateRandomNickname = () => {
  const adjectiveList = [
    "행복한 ",
    "용감한 ",
    "사나운 ",
    "최고의 ",
    "똑똑한 ",
    "섹시한 ",
  ];
  const nounList = [
    ,
    "개발자",
    "홍정기",
    "최원장",
    "안동훈",
    "예병수",
    "류명한",
  ];
  const randomAdjective =
    adjectiveList[Math.floor(Math.random() * adjectiveList.length)];
  const randomNoun = nounList[Math.floor(Math.random() * nounList.length)];
  return randomAdjective + randomNoun;
};

export { generateRandomNickname };

function Post() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [downloadURL, setDownloadURL] = useState(null);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 글쓰기 모달창 열기
  const postModalHandler = () => {
    !auth.currentUser ? alert("로그인 후 사용해주세요.") : setOpen(!open);
  };

  //닉네임 가져오는 함수
  const getNickname = async (uid) => {
    console.log(uid);
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.nickname;
      } else {
        const randomNickname = generateRandomNickname();
        return randomNickname;
      }
    } catch (error) {
      console.error("Error getting nickname:", error);
      throw error;
    }
  };

  // db에 값 저장
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const uid = currentUser ? currentUser.uid : null;

    if (!uid) {
      console.error("User UID not found");
      return;
    }

    try {
      const nickname = await getNickname(uid);

      const newPost = {
        CID: uuid(),
        title: title,
        body: body,
        createdAt: new Date(),
        uid: uid,
        nickname: nickname, // Include the nickname in the new post object
        likesByUser: { [uid]: false },
        downloadURL,
        likeCount: 0,
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Post added with ID: ", docRef.id);
      setTitle("");
      setBody("");
      fetchData();
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <>
      <BcDiv open={open} onClick={postModalHandler}>
        <StDiv onClick={(e) => e.stopPropagation()}>
          <h1>글 작성하기</h1>
          <form>
            <p>
              <TitleInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요."
              />
            </p>
            <p>
              <BodyInput
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="내용을 입력해주세요."
              />
            </p>
            <p>
              <FileUpload setDownloadURL={setDownloadURL} />
            </p>
            <button onClick={handlePostSubmit}>등록</button>
          </form>
          <Stbtn onClick={postModalHandler}>x</Stbtn>
        </StDiv>
      </BcDiv>
      <button
        style={{
          width: "200px",
          height: "50px",
          marginTop: "100px",
          position: "fixed",
        }}
        onClick={postModalHandler}
      >
        글쓰기버튼
      </button>
    </>
  );
}

export default Post;
