import styled from "styled-components";

export const Container = styled.section`
  background-color: ${(props) => props.theme.colors["bg-color"][20]};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  display: flex;
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  > svg {
    font-size: 24px;
    color: ${(props) => props.theme.colors.green};
    text-decoration: none;
    :hover {
      color:   ${(props) => props.theme.colors.green};
      cursor: pointer;
    }
  }
`;
export const Title = styled.h1`
  font-size: 20px;
  padding: 16px;
  color:  ${(props) => props.theme.colors.title};
`;
export const Text = styled.h2`
  text-align: left;
  font-size: 16px;
  color:  ${(props) => props.theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
