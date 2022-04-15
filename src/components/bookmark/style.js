import styled from "styled-components";

export const Favicon = styled.img`
  margin-right: 0.2rem;
`;

export const Bookmark = styled.a`
  font-size: 13px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 6px;
  &:hover {
    background-color: #eee;
  }
  transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
  background: ${(props) => props.focus && "#eee"};
`;

export const Topbar = styled.div`
  font-size: 13px;
  margin: 1rem 1rem 0.5rem 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  overflow-x: scroll;
`;

export const Stack = styled.div`
  white-space: nowrap;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 6px;
  &:hover {
    background-color: #eee;
  }
  transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
`;

export const Space = styled.div`
  flex: 5 5 20rem;
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const Folder = styled.div`
  font-size: 13px;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 6px;
  &:hover {
    background-color: #eee;
  }
  transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
  background: ${(props) => props.focus && "#eee"};
`;
