import styled from 'styled-components';
import logo from './logo.svg';
import { above } from './dist/index.esm';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ff0011;

  ${above('small')`
    background-color: ${'#ff8811'};
  `};

  ${above('1024')`
    background-color: #ffaa11;
  `};
`;

const Title = styled.h1`
  font-size: 16px;

  ${above(576)`
    font-size: 32px;
  `};

  ${above('780')`
    font-size: 64px;
  `};

  ${above('xlarge')`
    font-size: 128px;
  `};
`;

const LogoWrapper = styled.div`
  width: 500px;

  & img {
    display: none;
    width: 100%;

    ${above(500)`
      display: block;
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
    </Wrapper>
  );
}

export default App;
