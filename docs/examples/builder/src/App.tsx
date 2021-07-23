// @ts-nocheck
import styled from 'styled-components';
import { builder } from 'styled-query-builder';

import logo from './logo.svg';

const { above, below, between, breakpoints } = builder(
  { sm: 36, md: 48, lg: 64, xlg: 80 },
  'rem'
);

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffaa11;

  ${below('64')`
    background-color: ${'#ff8811'};
  `};

  ${below('sm')`
    background-color: #ff0011;
  `};
`;

const Title = styled.h1`
  font-size: 1rem;

  ${above(36)`
    font-size: 2rem;
  `};

  ${above('48.75')`
    font-size: 4rem;
  `};

  ${above('xlg')`
    font-size: 8rem;
  `};
`;

const LogoWrapper = styled.div`
  width: 31.25rem;

  & img {
    width: 100%;

    ${between(['0', 31.25])`
      display: none;
    `};
  }
`;

function App() {
  return (
    <Wrapper>
      <LogoWrapper>
        <img src={logo} alt='React logo' />
      </LogoWrapper>
      <Title>Styled Query Builder</Title>
      <span>{breakpoints('below', 'xlg')}</span>
      <span>{breakpoints('below', 'lg')}</span>
      <span>{breakpoints('below', 'md')}</span>
      <span>{breakpoints('below', 'sm')}</span>
    </Wrapper>
  );
}

export default App;
