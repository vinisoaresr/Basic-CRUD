import styled from "styled-components";

export const Container = styled.section`
  background-color: black;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  a {
    font-size: 12px;
    color: white;
    text-decoration: none;
    :hover {
      color:  red;
      cursor: not-allowed;
    }
  }
`;
export const Title = styled.h1`
  font-size: 20px;
  color: white;
`;
export const WrapperRow = styled.ol`
  padding-bottom: 15px;
  height: 100%;
  overflow-y: scroll;
`;
export const Row = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 6fr 2fr;
  min-height: 32px;
  align-items: center;
  justify-items: start;
  border-bottom: solid 1px blue;
  background-color: gray;
`;
export const TextOrder = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 24px;
  color: white;
`;
export const WrapperName = styled.div`
  flex-direction: column;
  padding: 5px;
  max-width: 100%;
  overflow: hidden;
`;
export const Name = styled.h2`
  text-align: left;
  font-size: 16px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const Score = styled.p`
  width: 100%;
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
`;
