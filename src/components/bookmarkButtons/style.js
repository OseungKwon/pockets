import styled from "styled-components";

export const Button = styled.div`
  margin: 0.5rem 0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  &:hover {
    transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
    color: #fff;
    background-color: #000;
  }
`;

export const Menu = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
