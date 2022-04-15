import styled from "styled-components";

export const Space = styled.div`
  flex: 2 2 4rem;
  padding: 1rem;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

export const Icon = styled.img`
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  &:hover {
    background-color: #eee;
    transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
  }
`;
