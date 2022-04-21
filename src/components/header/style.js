import styled from "styled-components";

export const TitleIcon = styled.span`
  margin-right: 0.6rem;
`;

export const Title = styled.div`
  margin: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  font-family: "Chewy", cursive;
`;

export const SettingIcon = styled.div`
  cursor: pointer;
  position: fixed;
  font-size: 1.1rem;
  width: 1.7rem;
  height: 1.7rem;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 1px 4px 4px 0 rgb(117 121 125 / 6%),
    0 1px 3px 0 rgb(113 117 121 / 6%);
  border: 1px solid #e1e1e1;
  &:hover {
    box-shadow: 1px 4px 4px 0 rgb(117 121 125 / 27%),
      0 1px 3px 0 rgb(113 117 121 / 27%);
  }
`;
