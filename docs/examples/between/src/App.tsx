import styled from 'styled-components';
import logo from './logo.svg';
import { between } from './dist/index.esm';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffaa11;

  ${between(['small', '1024'])`
    background-color: ${'#ff8811'};
  `};

  ${between([0, '575'])`
    background-color: #ff0011;
  `};
`;

const Title = styled.h1`
  font-size: 128px;

  ${between(['780', 'xlarge'])`
    font-size: 64px;
  `};

  ${between(['small', '779'])`
    font-size: 32px;
  `};

  ${between(['0', 575])`
    font-size: 16px;
  `};
`;

const LogoWrapper = styled.div`
  width: 500px;

  & img {
    width: 100%;

    ${between(['0', 500])`
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
