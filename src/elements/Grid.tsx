import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import styled from '@emotion/styled';

import { mq } from '../styles';

const Grid = withWidth()(styled.div`
  display: grid;
  align-content: center;
  min-height: 380px;
  background-color: #fafafa;
  background-image: radial-gradient(#ffffff 50%, rgba(209, 209, 209, 0.3));
  ${p =>
    isWidthUp('md', p.width)
      ? 'grid-template-columns: 1fr 1fr'
      : 'grid-template-rows: 1fr 1fr'};

  p {
    ${mq({ margin: ['10px 0', 15] })}
  }
`);

export default Grid;
