import styled from "styled-components";

export const ModalBase = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.4);
`;

export const ModalArea = styled.div`
  background: rgb(255, 255, 255);
  margin: 50% auto;
  padding: 2rem;
  width: 70vw;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`;

export const H2 = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const ColorBox = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 6px;
  background: ${(props) => props.bgColor};
`;
