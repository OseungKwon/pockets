import styled from "styled-components";

export const Menu = styled.div`
  width: 8rem;
  position: absolute;
  border: 1px solid #ccc;
  box-shadow: 1px 4px 4px 0 rgb(117 121 125 / 6%),
    0 1px 3px 0 rgb(113 117 121 / 20%);
  background: #fff;
  border-radius: 8px;
  font-size: 13px;
  padding: 0.4rem;
  top: ${(props) => props.elementData.top}px;
  left: ${(props) => props.elementData.left}px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0.2rem 0.1rem;
  cursor: pointer;
  border-radius: 6px;
  :hover {
    background: #eee;
  }
`;

export const Icon = styled.div`
  width: 20px;
  margin-right: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Span = styled.span``;
