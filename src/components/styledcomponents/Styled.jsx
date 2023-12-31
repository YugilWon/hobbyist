import styled from "styled-components";

export const StH2 = styled.h2`
  color: #5e5ee8;
  margin-top: 20px;
  font-size: 28px;
  padding-top: 20px;
`;

export const Label = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 120px;
  text-align: right;
  margin-right: 10px;
`;

export const Input = styled.input`
  width: 250px;
  height: 40px;
  margin-top: 20px;
  background-color: #f5f3f3;
  border-style: none;
  border-radius: 8px;
  padding-left: 15px;
`;

export const Button = styled.button`
  top: 0;
  right: 0;
`;

export const TopButton = styled.button`
  font-size: 15px;
  width: 130px;
  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #5e5ee8;
    background-color: #e3e3f0;
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const signUp = styled.form`
  text-align: center;
`;

export const ModalContainerModal2 = styled.div`
  width: 550px;
  height: 400px;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
`;

export const CancelBtn = styled(Button)`
  position: absolute;
  background-color: transparent;
  border-style: none;
  right: 10px;
  top: 10px;
  font-size: 17px;
  cursor: pointer;
`;

export const SubmitBtn = styled(Button)`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border-style: none;
  background-color: #6969ed;
  cursor: pointer;
  color: white;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const VerifyMessage = styled.span`
  font-size: 12px;
  color: ${(props) => (props.invalid ? "red" : "blue")};
`;

export const StSelect = styled.select`
  width: 420px;
  height: 30px;
  border: none;
  margin-top: 20px;
  background-color: #f5f5f5;
`;

export const CheckId = styled.button`
  background-color: transparent;
  border-radius: 6px;
  width: 70px;
  height: 40px;
  border: none;
  color: #343434;
  cursor: pointer;
  position: absolute;
  right: 60px;
  margin-top: 20px;
  &:hover {
    color: #5e5ee8;
    background-color: #dfdff7;
  }
`;
