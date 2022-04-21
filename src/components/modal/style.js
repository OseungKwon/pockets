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
  position: relative;
  background: rgb(255, 255, 255);
  margin: 50% auto;
  padding: 2rem;
  width: 70vw;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`;

export const H2 = styled.div`
  font-size: 12px;
`;

export const Content = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const ColorBox = styled.div`
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 6px;
  background: ${(props) => props.bgColor};
  transition: 0.3s cubic-bezier(0, 0, 0.2, 1);

  &:hover {
    box-shadow: 1px 4px 4px 0 rgb(117 121 125 / 6%),
      0 1px 3px 0 rgb(113 117 121 / 20%);
    transform: scale(1.3);
  }
`;

export const XBtn = styled.div`
  cursor: pointer;
  position: absolute;
  font-size: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  right: 1px;
  top: 1px;
  align-items: center;
  justify-content: center;
`;
