import styled from 'styled-components';
import logo from './logo.svg';
import { above, below, between, breakpoints } from './dist/index.esm';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${above('large')`
    background-color: #ffaa11;
  `};

  ${below('1024', 1)`
    background-color: ${'#ff8811'};
  `};

  ${below('small')`
    background-color: #ff0011;
  `};
`;

const Title = styled.h1`
  ${above('780', 1)`
    font-size: 64px;
  `};

  ${between(['780', 0])`
    font-size: 32px;
  `};
`;

const LogoWrapper = styled.div`
  width: 500px;

  & img {
    width: 100%;

    ${below(500)`
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
      <Title>{breakpoints('below', 'large', 1)}</Title>
    </Wrapper>
  );
}

export default App;
