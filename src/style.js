import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.bgColor};
  width: 100%;
  height: 100vh;
`;
