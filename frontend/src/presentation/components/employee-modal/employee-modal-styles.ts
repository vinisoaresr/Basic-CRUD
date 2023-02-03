
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  > svg {
    font-size: 24px;
    color: ${(props) => props.theme.colors.red[20]};
    text-decoration: none;
    :hover {
      color: ${(props) => props.theme.colors.red[10]};
      cursor: pointer;
    }
  }
  `;
export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  width: 50%;
  border-radius: 8px;
  padding: 32px;
  `;
export const Title = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: black;
  `;
export const Text = styled.h2`
  text-align: left;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const LabelSignup = styled.label`
  font-size: 16px;
  color: #676767;
`;

export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;
