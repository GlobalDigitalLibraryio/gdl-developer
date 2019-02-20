import styled from '@emotion/styled';
import { misc } from '../styles';

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${misc.containers.large}px;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  height: 100%;
  flex: 1 0 auto;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.2);
`;

export default Main;
