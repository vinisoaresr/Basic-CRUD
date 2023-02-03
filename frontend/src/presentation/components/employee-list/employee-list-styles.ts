import styled from "styled-components";

export const Container = styled.section`
  background-color:   ${(props) => props.theme.colors["bg-color"][10]};
  height: 100%;
  width: 100%;
  max-width: 720px;
  overflow: scroll;
  padding: 15px;
  border-radius: 14px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const WrapperRow = styled.ol`
  padding-bottom: 15px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;
export const Row = styled.li`
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  display: grid;
  grid-template-columns: 2fr 4fr 5fr 2fr 1fr;
  min-height: 32px;
  align-items: flex-end;
  background-color:   ${(props) => props.theme.colors["bg-color"][20]};
  `;
export const Header = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 4fr 6fr 2fr 1fr 1fr;
  min-height: 32px;
  align-items: center;
  background-color:   ${(props) => props.theme.colors["bg-color"][20]};
`;
export const WrapperIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  > svg {
    font-size: 18px;
    color: ${(props) => props.theme.colors.red[20]};
    text-decoration: none;
    :hover {
      color: ${(props) => props.theme.colors.red[10]};
      cursor: pointer;
    }
  }
`;
export const AddEmployeeButton = styled.button`
  width: 50%;
  border-radius: 8px;
  padding: 16px;
  min-height: 32px;
  display:flex;
  align-items: center;
  justify-content: center;
  align-items: center;
	border: none;
	cursor: pointer;
  background-color:${(props) => props.theme.colors.green};
`;
export const Text = styled.h2`
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const Title = styled.h2`
  display: flex;
  justify-content: center;
  text-align: left;
  font-size: 16px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const Divider = styled.div`
  margin-bottom: 2px;
`;
