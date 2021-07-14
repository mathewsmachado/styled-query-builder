import styled from 'styled-components';
import logo from './logo.svg';
import { below } from './dist/index.esm';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffaa11;

  ${below('1024')`
    background-color: ${'#ff8811'};
  `};

  ${below('small')`
    background-color: #ff0011;
  `};
`;

const Title = styled.h1`
  font-size: 128px;

  ${below('xlarge')`
    font-size: 64px;
  `};

  ${below('780')`
    font-size: 32px;
  `};

  ${below(576)`
    font-size: 16px;
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
    </Wrapper>
  );
}

export default App;
